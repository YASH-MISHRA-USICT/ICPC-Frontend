import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { apiService } from '../../lib/api';
import { 
  Calendar, 
  Clock, 
  Trophy, 
  CheckCircle, 
  Upload, 
  ExternalLink,
  FileText,
  Users,
  User,
  RefreshCw,
  Edit
} from 'lucide-react';
import { LoadingSpinner } from '../UI/LoadingSpinner';

interface Task {
  id: string;
  title: string;
  description: string;
  due_date: string;
  points: number;
  is_active: boolean;
  team_id?: string;
  type: 'individual' | 'team';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  track?: string;
  requirements?: string[];
  category?: string;
}

interface Submission {
  id: string;
  task_id: string;
  user_id: string;
  submission_url?: string;
  submission_text?: string;
  status: 'pending' | 'approved' | 'rejected' | 'needs_revision';
  submitted_at: string;
  feedback?: string;
  points_awarded?: number;
}

export function TasksPage() {
  const { user } = useAuth();
  const [teamTasks, setTeamTasks] = useState<Task[]>([]);
  const [individualTasks, setIndividualTasks] = useState<Task[]>([]);
  const [submissions, setSubmissions] = useState<Record<string, Submission>>({});
  const [loading, setLoading] = useState(true);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'individual' | 'team'>('individual');
  const [submissionForm, setSubmissionForm] = useState({
    taskId: '',
    submissionUrl: '',
    submissionText: '',
  });
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [editingSubmission, setEditingSubmission] = useState<Submission | null>(null);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const userTrack = user?.profile?.coding_track;

      // Load tasks for user's track
      const tasksResponse = await apiService.getTasks(userTrack);
      if (tasksResponse.success) {
        const allTasks = (tasksResponse.data || []).map((t: any) => ({
          ...t,
          id: t.id || t._id,   // 🔑 ensure we always have an "id"
        }));

        setIndividualTasks(allTasks.filter((task: Task) => task.type === 'individual'));
        setTeamTasks(allTasks.filter((task: Task) => task.type === 'team'));
      }

      // Load submissions
      if (user?.id) {
        const submissionsResponse = await apiService.getSubmissions(user.id);
        if (submissionsResponse.success) {
          const submissionsMap = (submissionsResponse.data || []).reduce(
            (acc: Record<string, Submission>, sub: Submission) => {
              acc[sub.task_id] = sub;
              return acc;
            },
            {}
          );
          setSubmissions(submissionsMap);
        }
      }
    } catch (err: any) {
      console.error('Error loading data:', err);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!submissionForm.taskId) {
      setError('Task ID is missing. Please close and reopen the submission form.');
      return;
    }

    const trimmedUrl = submissionForm.submissionUrl.trim();
    const trimmedText = submissionForm.submissionText.trim();

    if (!trimmedUrl && !trimmedText) {
      setError('Please provide either a submission URL or notes.');
      return;
    }

    try {
      setSubmissionLoading(true);
      setError(null);

      const submissionData = {
        task_id: submissionForm.taskId,
        submission_url: trimmedUrl || undefined,
        submission_text: trimmedText || undefined,
      };

      // 🔄 Backend auto-handles create vs update
      const response = await apiService.createSubmission(submissionData);

      if (!response.success) {
        throw new Error(response.error || 'Failed to submit task');
      }

      // Reset & close modal
      setShowSubmissionModal(false);
      setSubmissionForm({ taskId: '', submissionUrl: '', submissionText: '' });
      setEditingSubmission(null);
      setSuccess('Submission saved successfully!');

      // Update local state
      if (response.data) {
        setSubmissions(prev => ({
          ...prev,
          [submissionData.task_id]: response.data,
        }));
      }
    } catch (err: any) {
      console.error('Error submitting task:', err);
      setError(err.message || 'Failed to submit task');
    } finally {
      setSubmissionLoading(false);
    }
  };

  const openSubmissionModal = (taskId: string, existingSubmission?: Submission) => {
    if (!taskId) {
      setError('Task ID is missing. Cannot open submission form.');
      return;
    }

    setError(null);
    setSuccess(null);
    setEditingSubmission(existingSubmission || null);

    setSubmissionForm({
      taskId,
      submissionUrl: existingSubmission?.submission_url || '',
      submissionText: existingSubmission?.submission_text || '',
    });

    setShowSubmissionModal(true);
  };

  const closeSubmissionModal = () => {
    setShowSubmissionModal(false);
    setEditingSubmission(null);
    setSubmissionForm({ taskId: '', submissionUrl: '', submissionText: '' });
    setError(null);
  };

  const getTaskStatus = (task: Task) => {
    const submission = submissions[task.id];
    const isOverdue = task.due_date && new Date(task.due_date) < new Date();

    if (submission) {
      return {
        status: submission.status,
        color:
          submission.status === 'approved'
            ? 'green'
            : submission.status === 'rejected'
            ? 'red'
            : submission.status === 'needs_revision'
            ? 'orange'
            : 'yellow',
        text:
          submission.status === 'approved'
            ? 'Approved'
            : submission.status === 'rejected'
            ? 'Rejected'
            : submission.status === 'needs_revision'
            ? 'Needs Revision'
            : 'Pending Review',
      };
    }

    if (isOverdue) {
      return { status: 'overdue', color: 'red', text: 'Overdue' };
    }

    return { status: 'pending', color: 'gray', text: 'Not Submitted' };
  };

  const getCurrentTasks = () => {
    return activeTab === 'individual' ? individualTasks : teamTasks;
  };

  const TaskList = ({ taskList, emptyMessage }: { taskList: Task[], emptyMessage: string }) => {
    if (taskList.length === 0) {
      return (
        <div className="text-center py-16">
          <FileText className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No Tasks Available</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{emptyMessage}</p>
          <button
            onClick={loadData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 mx-auto transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {taskList.map((task) => {
          const taskStatus = getTaskStatus(task);
          const submission = submissions[task.id];
          const isOverdue = task.due_date && new Date(task.due_date) < new Date();
          const daysUntilDue = task.due_date ? 
            Math.ceil((new Date(task.due_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : null;

          return (
            <div key={task.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{task.title}</h2>
                    
                    {/* Status Badge */}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      taskStatus.color === 'green' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' :
                      taskStatus.color === 'yellow' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300' :
                      taskStatus.color === 'orange' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300' :
                      taskStatus.color === 'red' ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300' :
                      'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {taskStatus.text}
                    </span>
                    
                    {/* Task Type Badge */}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.type === 'team' 
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' 
                        : 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300'
                    }`}>
                      {task.type === 'team' ? 'Team' : 'Individual'}
                    </span>
                    
                    {/* Difficulty Badge */}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.difficulty === 'beginner' ? 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-300' :
                      task.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-300' :
                      'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300'
                    }`}>
                      {task.difficulty}
                    </span>

                    {/* Active/Inactive Badge */}
                    {!task.is_active && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                        Inactive
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{task.description}</p>
                  
                  {/* Requirements */}
                  {task.requirements && task.requirements.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Requirements:</p>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        {task.requirements.map((req, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                    {task.due_date && (
                      <>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>
                            {isOverdue ? 'Overdue' : 
                             daysUntilDue === 0 ? 'Due today' :
                             daysUntilDue === 1 ? 'Due tomorrow' :
                             daysUntilDue && daysUntilDue > 0 ? `${daysUntilDue} days left` : ''}
                          </span>
                        </div>
                      </>
                    )}
                    <div className="flex items-center space-x-1">
                      <Trophy className="w-4 h-4" />
                      <span>{task.points} points</span>
                    </div>
                    {task.category && (
                      <div className="flex items-center space-x-1">
                        <span className="text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 px-2 py-1 rounded">
                          {task.category}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  {!submission && !isOverdue && task.is_active && (
                    <button
                      onClick={() => openSubmissionModal(task.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors"
                      disabled={!task.id} // Add safety check
                    >
                      <Upload className="w-4 h-4" />
                      <span>Submit</span>
                    </button>
                  )}
                  
                  {submission && (
                    <div className="text-right">
                      <p className="text-sm text-gray-500 mb-2">
                        Submitted: {new Date(submission.submitted_at).toLocaleDateString()}
                      </p>
                      
                      {/* Edit Button - Only for pending submissions */}
                      {submission.status === 'pending' && task.is_active && !isOverdue && (
                        <button
                          onClick={() => openSubmissionModal(task.id, submission)}
                          className="bg-yellow-600 text-white px-3 py-1 rounded-lg hover:bg-yellow-700 flex items-center space-x-1 text-sm mb-2 ml-auto transition-colors"
                          disabled={!task.id} // Add safety check
                        >
                          <Edit className="w-3 h-3" />
                          <span>Edit Submission</span>
                        </button>
                      )}
                      
                      {submission.submission_url && (
                        <a
                          href={`https://${submission.submission_url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 flex items-center justify-end space-x-1 text-sm mb-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>View Submission</span>
                        </a>
                      )}
                      
                      {submission.points_awarded !== undefined && submission.points_awarded !== null && (
                        <p className="text-sm font-medium text-green-600">
                          Points: {submission.points_awarded}
                        </p>
                      )}
                      
                      {submission.feedback && (
                        <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded text-sm max-w-xs">
                          <p className="font-medium text-gray-700 dark:text-gray-100">Feedback:</p>
                          <p className="text-gray-600 dark:text-gray-300">{submission.feedback}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Tasks</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Complete individual tasks and team assignments to earn points
              </p>
            </div>
            <button
              onClick={loadData}
              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center space-x-2 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('individual')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'individual'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                } transition-colors flex items-center space-x-2`}
              >
                <User className="w-4 h-4" />
                <span>Individual Tasks ({individualTasks.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('team')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'team'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                } transition-colors flex items-center space-x-2`}
              >
                <Users className="w-4 h-4" />
                <span>Team Tasks ({teamTasks.length})</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-800 text-green-700 dark:text-green-300 rounded-lg flex items-center justify-between">
            <span>{success}</span>
            <button
              onClick={() => setSuccess(null)}
              className="text-green-500 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
            >
              ×
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
            >
              ×
            </button>
          </div>
        )}

        {/* Tasks Content */}
        <TaskList 
          taskList={getCurrentTasks()} 
          emptyMessage={
            activeTab === 'individual' 
              ? 'No individual tasks available. Check back later for new assignments.'
              : 'No team tasks available. Check back later for new assignments.'
          }
        />

        {/* Submission Modal */}
        {showSubmissionModal && (
          <div className="fixed inset-0 bg-black/40 dark:bg-black/80 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full mx-4">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {editingSubmission ? 'Edit Submission' : 'Submit Task'}
                </h3>
                
                {/* Debug info - shows current form state */}
                <div className="mb-4 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-xs text-blue-600 dark:text-blue-400">
                  Current Task ID: {submissionForm.taskId || 'NOT SET'}
                </div>
                
                {error && (
                  <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-300 rounded text-sm">
                    {error}
                  </div>
                )}
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Submission URL (GitHub, etc.)
                    </label>
                    <input
                      type="url"
                      value={submissionForm.submissionUrl}
                      onChange={(e) => setSubmissionForm({ ...submissionForm, submissionUrl: e.target.value })}
                      placeholder="https://github.com/username/project"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={submissionLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      value={submissionForm.submissionText}
                      onChange={(e) => setSubmissionForm({ ...submissionForm, submissionText: e.target.value })}
                      placeholder="Describe your solution, challenges faced, or any additional notes..."
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={submissionLoading}
                    />
                  </div>
                </div>

                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={handleSubmit}
                    type="button"
                    disabled={
                      (!submissionForm.submissionUrl.trim() && !submissionForm.submissionText.trim()) || 
                      submissionLoading
                    }
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                  >
                    {submissionLoading ? (
                      <>
                        <LoadingSpinner size="small" />
                        <span>{editingSubmission ? 'Updating...' : 'Submitting...'}</span>
                      </>
                    ) : (
                      <span>{editingSubmission ? 'Update Submission' : 'Submit Task'}</span>
                    )}
                  </button>
                  <button
                    onClick={closeSubmissionModal}
                    disabled={submissionLoading}
                    className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}