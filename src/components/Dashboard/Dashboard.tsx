import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Trophy, BookOpen, Target, Calendar, CheckCircle, Clock, User } from 'lucide-react';
import { LoadingSpinner } from '../UI/LoadingSpinner';
import { apiService } from '../../lib/api';

interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  totalPoints: number;
  teamRank: number;
  badges: number;
}

interface Task {
  id: string;
  title: string;
  description?: string;
  points: number;
  due_date: string;
  status: string;
  created_at: string;
}

interface Submission {
  id: string;
  task_title: string;
  status: 'pending' | 'approved' | 'rejected';
  submitted_at: string;
  points?: number;
}

export function Dashboard() {
  const { user, profile, loading: authLoading, getAuthHeader } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    totalPoints: 0,
    teamRank: 0,
    badges: 0
  });
  const [recentTasks, setRecentTasks] = useState<Task[]>([]);
  const [recentSubmissions, setRecentSubmissions] = useState<Submission[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Profile in Dashboard:", profile);
  }, [profile]);

  useEffect(() => {
    console.log("DEBUG AUTH STATE:", { authLoading, user });
  }, [authLoading, user]);

  // Redirect to login only if not authenticated
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate('/login');
      }
    }
  }, [authLoading, user, navigate]);

  // Fetch dashboard data when user is available
  const fetchDashboardData = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      
      const authHeader = getAuthHeader();
      if (!authHeader) {
        throw new Error('No authentication token found');
      }

      // Fetch real tasks data from backend (filtered by user's coding track)
      let realTasks: Task[] = [];
      let totalTasks = 0;
      
      try {
        const tasksResponse = await apiService.getTasks(user.profile?.coding_track);
        if (tasksResponse.success && tasksResponse.data) {
          realTasks = tasksResponse.data;
          totalTasks = realTasks.length;
        }
      } catch (tasksError) {
        console.error('Error fetching tasks:', tasksError);
        realTasks = [];
        totalTasks = 0;
      }

      // Fetch real submissions data from backend
      let realSubmissions: Submission[] = [];
      let completedTasks = 0;
      let pendingTasks = 0;
      
      try {
        const submissionsResponse = await apiService.getSubmissions(user.id);
        if (submissionsResponse.success && submissionsResponse.data) {
          realSubmissions = submissionsResponse.data;
          completedTasks = realSubmissions.filter(s => s.status === 'approved').length;
          pendingTasks = realSubmissions.filter(s => s.status === 'pending').length;
        }
      } catch (submissionsError) {
        console.error('Error fetching submissions:', submissionsError);
        // Use empty arrays as fallback
        realSubmissions = [];
        completedTasks = 0;
        pendingTasks = 0;
      }

      // Fetch total points from backend
      let totalPoints = 0;
      try {
        const pointsResponse = await apiService.calculateTotalPoints(user.id);
        if (pointsResponse.success && pointsResponse.data) {
          totalPoints = pointsResponse.data.total_points;
        }
      } catch (pointsError) {
        console.error('Error fetching total points:', pointsError);
        // Fallback to 0 if API call fails
        totalPoints = 0;
      }

      // Fetch badges from backend
      let badges = 0;
      try {
        const badgesResponse = await apiService.getBadges(user.id);
        if (badgesResponse.success && badgesResponse.data) {
          badges = badgesResponse.data.length;
        }
      } catch (badgesError) {
        console.error('Error fetching badges:', badgesError);
        badges = 0;
      }

      // Fetch team rank from leaderboard
      let teamRank = 0;
      try {
        const leaderboardResponse = await apiService.getTeamLeaderboard();
        if (leaderboardResponse.success && leaderboardResponse.data && user.profile?.team_id) {
          const teamData = leaderboardResponse.data.find((team: { id: string; rank?: number }) => team.id === user.profile?.team_id);
          teamRank = teamData?.rank || 0;
        }
      } catch (rankError) {
        console.error('Error fetching team rank:', rankError);
        teamRank = 0;
      }

      setRecentTasks(realTasks);
      setRecentSubmissions(realSubmissions);
      setStats({
        totalTasks,
        completedTasks,
        pendingTasks,
        totalPoints,
        teamRank,
        badges
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, [user, getAuthHeader]);

  useEffect(() => {
    if (user && !authLoading) {
      fetchDashboardData();
    }
  }, [user, authLoading, fetchDashboardData]);

  // Show loading spinner while checking auth or fetching data
  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  // If not logged in, don't render anything
  if (!user) return null;

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">⚠️ {error}</div>
          <button
            onClick={fetchDashboardData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const progressPercentage = stats.totalTasks > 0 ? (stats.completedTasks / stats.totalTasks) * 100 : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user.name}!
        </h1>
        <p className="text-gray-600 mt-2">
          {user.email} • {stats.completedTasks} tasks completed
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Points</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalPoints}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Trophy className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completedTasks}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingTasks}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Badges Earned</p>
              <p className="text-2xl font-bold text-gray-900">{stats.badges}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Trophy className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Weekly Progress</h2>
          <span className="text-sm text-gray-500">{Math.round(progressPercentage)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>{stats.completedTasks} completed</span>
          <span>{stats.totalTasks} total tasks</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Tasks */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Available Tasks</h2>
            <BookOpen className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentTasks.length > 0 ? (
              recentTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <h3 className="font-medium text-gray-900">{task.title}</h3>
                    <p className="text-sm text-gray-500">
                      Due: {new Date(task.due_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-blue-600">{task.points} pts</span>
                    <Calendar className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No tasks available</p>
            )}
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Submissions</h2>
            <Target className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentSubmissions.length > 0 ? (
              recentSubmissions.map((submission) => (
                <div key={submission.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{submission.task_title}</h3>
                    <p className="text-sm text-gray-500">
                      Submitted: {new Date(submission.submitted_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      submission.status === 'approved' ? 'bg-green-100 text-green-700' :
                      submission.status === 'rejected' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {submission.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No submissions yet</p>
            )}
          </div>
        </div>
      </div>

      {/* User Info Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Account Information</h2>
          <User className="w-5 h-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 border border-gray-100 rounded-lg">
            <img 
              src={user.picture} 
              alt={user.name}
              className="w-12 h-12 rounded-full mx-auto mb-2"
            />
            <h3 className="font-medium text-gray-900 text-sm">{user.name}</h3>
            <p className="text-xs text-gray-500 mt-1">{user.email}</p>
          </div>
          <div className="text-center p-4 border border-gray-100 rounded-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-900 text-sm">Joined</h3>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>
          <div className="text-center p-4 border border-gray-100 rounded-lg">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-900 text-sm">Status</h3>
            <p className="text-xs text-gray-500 mt-1">
              {user.verified_email ? 'Verified' : 'Unverified'}
            </p>
          </div>
          <div className="text-center p-4 border border-gray-100 rounded-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Trophy className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-medium text-gray-900 text-sm">Last Login</h3>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(user.last_login).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}