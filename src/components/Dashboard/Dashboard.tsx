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
    badges: 0,
  });
  const [recentTasks, setRecentTasks] = useState<Task[]>([]);
  const [recentSubmissions, setRecentSubmissions] = useState<Submission[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Profile in Dashboard:', profile);
  }, [profile]);

  useEffect(() => {
    console.log('DEBUG AUTH STATE:', { authLoading, user });
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

      // Fetch tasks
      let realTasks: Task[] = [];
      let totalTasks = 0;
      try {
        const tasksResponse = await apiService.getTasks(user.profile?.coding_track);
        if (tasksResponse.success && tasksResponse.data) {
          realTasks = tasksResponse.data;
          totalTasks = realTasks.length;
        }
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }

      // Fetch submissions
      let realSubmissions: Submission[] = [];
      let completedTasks = 0;
      let pendingTasks = 0;
      try {
        const submissionsResponse = await apiService.getSubmissions(user.id);
        if (submissionsResponse.success && submissionsResponse.data) {
          realSubmissions = submissionsResponse.data;
          completedTasks = realSubmissions.filter((s) => s.status === 'approved').length;
          pendingTasks = realSubmissions.filter((s) => s.status === 'pending').length;
        }
      } catch (err) {
        console.error('Error fetching submissions:', err);
      }

      // Fetch total points
      let totalPoints = 0;
      try {
        const pointsResponse = await apiService.calculateTotalPoints(user.id);
        if (pointsResponse.success && pointsResponse.data) {
          totalPoints = pointsResponse.data.total_points;
        }
      } catch (err) {
        console.error('Error fetching points:', err);
      }

      // Fetch badges
      let badges = 0;
      try {
        const badgesResponse = await apiService.getBadges(user.id);
        if (badgesResponse.success && badgesResponse.data) {
          badges = badgesResponse.data.length;
        }
      } catch (err) {
        console.error('Error fetching badges:', err);
      }

      // Fetch team rank
      let teamRank = 0;
      try {
        const leaderboardResponse = await apiService.getTeamLeaderboard();
        if (leaderboardResponse.success && leaderboardResponse.data && user.profile?.team_id) {
          const teamData = leaderboardResponse.data.find(
            (team: { id: string; rank?: number }) => team.id === user.profile?.team_id,
          );
          teamRank = teamData?.rank || 0;
        }
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
      }

      setRecentTasks(realTasks);
      setRecentSubmissions(realSubmissions);
      setStats({
        totalTasks,
        completedTasks,
        pendingTasks,
        totalPoints,
        teamRank,
        badges,
      });
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
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

  // Show loading spinner
  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!user) return null;

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
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

  const progressPercentage =
    stats.totalTasks > 0 ? (stats.completedTasks / stats.totalTasks) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        {/* Welcome */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">
            {user.email} • {stats.completedTasks} tasks completed
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          {/* Each Card */}
          {[
            { label: 'Total Points', value: stats.totalPoints, icon: <Trophy />, color: 'blue' },
            { label: 'Completed Tasks', value: stats.completedTasks, icon: <CheckCircle />, color: 'green' },
            { label: 'Pending Tasks', value: stats.pendingTasks, icon: <Clock />, color: 'yellow' },
            { label: 'Badges Earned', value: stats.badges, icon: <Trophy />, color: 'purple' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-white/10 p-4 sm:p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/40`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-white/10 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-1">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">
              Weekly Progress
            </h2>
            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3 mb-3 sm:mb-4">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 sm:h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <span>{stats.completedTasks} completed</span>
            <span>{stats.totalTasks} total tasks</span>
          </div>
        </div>

        {/* Recent Tasks + Submissions */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Tasks */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-white/10 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">
                Available Tasks
              </h2>
              <BookOpen className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            </div>
            <div className="space-y-3 sm:space-y-4">
              {recentTasks.length > 0 ? (
                recentTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border border-gray-200 dark:border-white/10 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors gap-1 sm:gap-0"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                        {task.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        Due: {new Date(task.due_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                      <span className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400">
                        {task.points} pts
                      </span>
                      <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-6 sm:py-8 text-sm">
                  No tasks available
                </p>
              )}
            </div>
          </div>

          {/* Submissions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-white/10 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">
                Recent Submissions
              </h2>
              <Target className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            </div>
            <div className="space-y-3 sm:space-y-4">
              {recentSubmissions.length > 0 ? (
                recentSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border border-gray-200 dark:border-white/10 rounded-lg gap-1 sm:gap-0"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                        {submission.task_title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        Submitted: {new Date(submission.submitted_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          submission.status === 'approved'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                            : submission.status === 'rejected'
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                            : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                        }`}
                      >
                        {submission.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-6 sm:py-8 text-sm">
                  No submissions yet
                </p>
              )}
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-white/10 p-4 sm:p-6 mt-6 sm:mt-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">
              Account Information
            </h2>
            <User className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="text-center p-3 sm:p-4 border border-gray-200 dark:border-white/10 rounded-lg">
              <img
                src={user.picture}
                alt={user.name}
                className="w-12 h-12 rounded-full mx-auto mb-2"
              />
              <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm">{user.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{user.email}</p>
            </div>
            <div className="text-center p-3 sm:p-4 border border-gray-200 dark:border-white/10 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center mx-auto mb-2">
                <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm">Joined</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="text-center p-3 sm:p-4 border border-gray-200 dark:border-white/10 rounded-lg">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm">Status</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {user.verified_email ? 'Verified' : 'Unverified'}
              </p>
            </div>
            <div className="text-center p-3 sm:p-4 border border-gray-200 dark:border-white/10 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/40 rounded-full flex items-center justify-center mx-auto mb-2">
                <Trophy className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm">Last Login</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {new Date(user.last_login).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
