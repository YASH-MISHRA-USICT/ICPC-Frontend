import React, { useState, useEffect } from 'react';
import { apiService } from '../../lib/api';
import { useAuth } from '../../hooks/useAuth';
import { 
  Users, 
  BookOpen, 
  CheckCircle, 
  AlertCircle, 
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar
} from 'lucide-react';
import { LoadingSpinner } from '../UI/LoadingSpinner';

interface Task {
  id: string;
  title: string;
  description: string;
  team_id: string;
  due_date: string;
  points: number;
  is_active: boolean;
  team?: { name: string; color: string };
  creator?: { full_name: string };
}

interface Submission {
  id: string;
  task_id: string;
  user_id: string;
  submission_url?: string;
  submission_text?: string;
  status: string;
  submitted_at: string;
  task?: { title: string; points: number };
  user?: { full_name: string; email: string };
}

interface Profile {
  id: string;
  full_name: string;
  email: string;
  role: string;
  total_points: number;
  tasks_completed: number;
  team?: { name: string; color: string };
}

interface Team {
  id: string;
  name: string;
  description?: string;
  color: string;
}

export function AdminPanel() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'submissions' | 'users'>('overview');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeTasks: 0,
    pendingSubmissions: 0,
    suspendedUsers: 0,
  });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [users, setUsers] = useState<Profile[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    team_id: '',
    due_date: '',
    points: 10,
  });

  useEffect(() => {
    if (profile?.role === 'admin') {
      fetchAdminData();
    }
  }, []);

  const fetchAdminData = async () => {
    try {
      // Fetch admin stats
      const statsResponse = await apiService.getAdminStats();
      if (statsResponse.success) {
        setStats(statsResponse.data);
      }

      // Fetch tasks
      const tasksResponse = await apiService.getTasks();
      if (tasksResponse.success) {
        setTasks(tasksResponse.data || []);
      }

      // Fetch submissions
      const submissionsResponse = await apiService.getSubmissions();
      if (submissionsResponse.success) {
        const pendingSubmissions = (submissionsResponse.data || []).filter(
          (s: Submission) => s.status === 'pending'
        );
        setSubmissions(pendingSubmissions);
      }

      // Fetch users
      const usersResponse = await apiService.getAllUsers();
      if (usersResponse.success) {
        setUsers(usersResponse.data || []);
      }

      // Fetch teams
      const teamsResponse = await apiService.getTeams();
      if (teamsResponse.success) {
        setTeams(teamsResponse.data || []);
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async () => {
    if (!taskForm.title || !taskForm.description || !taskForm.team_id || !taskForm.due_date) return;

    try {
      const response = await apiService.createTask({
        title: taskForm.title,
        description: taskForm.description,
        team_id: taskForm.team_id,
        due_date: taskForm.due_date,
        points: taskForm.points,
      });

      if (!response.success) {
        throw new Error(response.error);
      }

      setTaskForm({
        title: '',
        description: '',
        team_id: '',
        due_date: '',
        points: 10,
      });
      setShowTaskForm(false);
      fetchAdminData();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleSubmissionReview = async (submissionId: string, status: string, feedback?: string) => {
    try {
      const response = await apiService.reviewSubmission(submissionId, status, feedback);

      if (!response.success) {
        throw new Error(response.error);
      }
      
      fetchAdminData();
    } catch (error) {
      console.error('Error reviewing submission:', error);
    }
  };

  const toggleUserSuspension = async (userId: string, currentRole: string) => {
    const newRole = currentRole === 'suspended' ? 'member' : 'suspended';
    
    try {
      const response = await apiService.updateUserRole(userId, newRole);

      if (!response.success) {
        throw new Error(response.error);
      }
      
      fetchAdminData();
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (profile?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
        <p className="text-gray-600 mt-2">Manage tasks, users, and submissions</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8 w-fit">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'tasks', label: 'Tasks' },
          { id: 'submissions', label: 'Submissions' },
          { id: 'users', label: 'Users' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Tasks</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeTasks}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Reviews</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pendingSubmissions}</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Suspended Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.suspendedUsers}</p>
                </div>
                <div className="bg-red-100 p-3 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Submissions</h2>
            <div className="space-y-3">
              {submissions.slice(0, 5).map((submission) => (
                <div key={submission.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{submission.task?.title}</p>
                    <p className="text-sm text-gray-600">by {submission.user?.full_name}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSubmissionReview(submission.id, 'approved')}
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleSubmissionReview(submission.id, 'rejected')}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tasks' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Tasks Management</h2>
            <button
              onClick={() => setShowTaskForm(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create Task</span>
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Task</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Team</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Points</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {tasks.map((task) => (
                    <tr key={task.id}>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{task.title}</p>
                          <p className="text-sm text-gray-500 line-clamp-2">{task.description}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: task.team?.color }}
                          />
                          <span className="text-sm text-gray-900">{task.team?.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {new Date(task.due_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{task.points}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-700">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-700">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'submissions' && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Pending Submissions</h2>
          <div className="space-y-4">
            {submissions.map((submission) => (
              <div key={submission.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{submission.task?.title}</h3>
                    <p className="text-gray-600 mb-2">
                      Submitted by: {submission.user?.full_name} ({submission.user?.email})
                    </p>
                    {submission.submission_url && (
                      <a
                        href={submission.submission_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-1 mb-2"
                      >
                        <span>View Submission</span>
                        <Eye className="w-3 h-3" />
                      </a>
                    )}
                    {submission.submission_text && (
                      <p className="text-gray-700 mb-2">{submission.submission_text}</p>
                    )}
                    <p className="text-sm text-gray-500">
                      Submitted: {new Date(submission.submitted_at).toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleSubmissionReview(submission.id, 'approved')}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => {
                        const feedback = prompt('Provide feedback (optional):');
                        handleSubmissionReview(submission.id, 'rejected', feedback || undefined);
                      }}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-2"
                    >
                      <AlertCircle className="w-4 h-4" />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Users Management</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Team</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Points</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tasks</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{user.full_name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {user.team ? (
                          <div className="flex items-center space-x-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: user.team.color }}
                            />
                            <span className="text-sm text-gray-900">{user.team.name}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">No team</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                          user.role === 'suspended' ? 'bg-red-100 text-red-700' :
                          user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                          user.role === 'mentor' ? 'bg-blue-100 text-blue-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{user.total_points}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{user.tasks_completed}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleUserSuspension(user.id, user.role)}
                          className={`px-3 py-1 rounded text-sm font-medium ${
                            user.role === 'suspended'
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-red-100 text-red-700 hover:bg-red-200'
                          }`}
                        >
                          {user.role === 'suspended' ? 'Unsuspend' : 'Suspend'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Create Task Modal */}
      {showTaskForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Task</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={taskForm.title}
                    onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={taskForm.description}
                    onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Team</label>
                  <select
                    value={taskForm.team_id}
                    onChange={(e) => setTaskForm({ ...taskForm, team_id: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a team...</option>
                    {teams.map((team) => (
                      <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                    <input
                      type="date"
                      value={taskForm.due_date}
                      onChange={(e) => setTaskForm({ ...taskForm, due_date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Points</label>
                    <input
                      type="number"
                      value={taskForm.points}
                      onChange={(e) => setTaskForm({ ...taskForm, points: parseInt(e.target.value) })}
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={handleCreateTask}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                  Create Task
                </button>
                <button
                  onClick={() => setShowTaskForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}