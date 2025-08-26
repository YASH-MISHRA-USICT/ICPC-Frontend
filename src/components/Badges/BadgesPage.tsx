import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { apiService } from '../../lib/api';
import { Award, Trophy, Star, Calendar } from 'lucide-react';
import { LoadingSpinner } from '../UI/LoadingSpinner';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earned_at?: string;
  criteria?: {
    type: string;
    target: number;
  };
}

export function BadgesPage() {
  const { user } = useAuth();
  const [userBadges, setUserBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBadgesData = async () => {
      try {
        // Fetch ONLY user's earned badges
        const userBadgesResponse = await apiService.getBadges(user!.id);
        if (userBadgesResponse.success) {
          const earnedBadges = userBadgesResponse.data || [];
          setUserBadges(earnedBadges);
        }
      } catch (error) {
        console.error('Error fetching badges:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBadgesData();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 mr-2 sm:mr-3" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">Badges & Achievements</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base px-4">
            Earn badges by completing tasks, reaching milestones, and participating in the community.
          </p>
        </div>

        {/* Stats Overview - Only show earned badges */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-3 sm:p-6 text-center">
            <Award className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 mx-auto mb-2" />
            <h3 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-gray-100">{userBadges.length}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-base">Badges Earned</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-3 sm:p-6 text-center">
            <Star className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500 mx-auto mb-2" />
            <h3 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
              {userBadges.length > 0 ? '🏆' : '🎯'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-base">
              {userBadges.length > 0 ? 'Achiever' : 'Start Journey'}
            </p>
          </div>
        </div>

        {/* Badge Grid - Only earned badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-3 sm:gap-4">
          {userBadges.length > 0 ? (
            userBadges.map((badge) => (
              <BadgeCard key={badge.id} badge={badge} earned={true} />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <Award className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No badges earned yet</h3>
              <p className="text-gray-500 dark:text-gray-400">Start completing tasks to earn your first badge!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BadgeCard({ badge, earned }: { badge: Badge; earned: boolean }) {
  return (
    <div className={`group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-3 sm:p-4 text-center transition-all hover:shadow-lg hover:scale-105 cursor-pointer ${
      !earned ? 'opacity-60' : ''
    }`}>
      {/* Tooltip - Hidden on mobile, visible on hover for larger screens */}
      <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gray-900 dark:bg-gray-800 text-white dark:text-gray-100 text-xs rounded-lg p-3 -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full z-20 w-56 shadow-xl border border-gray-700 dark:border-gray-600 hidden sm:block">
        <div className="font-semibold mb-1 text-yellow-300">{badge.name}</div>
        <div className="text-gray-200 dark:text-gray-300 mb-2 leading-relaxed">{badge.description}</div>
        {earned && badge.earned_at && (
          <div className="text-green-300 text-xs border-t border-gray-700 dark:border-gray-600 pt-2">
            ✅ Earned: {new Date(badge.earned_at).toLocaleDateString()}
          </div>
        )}
        {!earned && badge.criteria && (
          <div className="text-blue-300 text-xs border-t border-gray-700 dark:border-gray-600 pt-2">
            🎯 How to earn: {' '}
            {badge.criteria.type === 'task_completion' && `Complete ${badge.criteria.target} task${badge.criteria.target > 1 ? 's' : ''}`}
            {badge.criteria.type === 'points' && `Earn ${badge.criteria.target} points`}
            {badge.criteria.type === 'team_tasks' && `Complete ${badge.criteria.target} team tasks`}
          </div>
        )}
        {/* Tooltip Arrow */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-800"></div>
      </div>

      {/* Badge Icon */}
      <div 
        className={`text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 ${!earned ? 'grayscale' : ''}`}
        style={{ color: earned ? badge.color : '#9CA3AF' }}
      >
        {badge.icon}
      </div>
      
      {/* Badge Name */}
      <h3 className="font-bold text-xs sm:text-sm text-gray-900 dark:text-gray-100 mb-1 leading-tight">{badge.name}</h3>
      
      {/* Description - Only on larger screens */}
      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2 hidden xl:block leading-tight">{badge.description}</p>
      
      {/* Date for earned badges */}
      {earned && badge.earned_at && (
        <div className="flex items-center justify-center text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-full px-2 py-1 mx-auto w-fit">
          <Calendar className="w-3 h-3 mr-1" />
          <span className="hidden sm:inline">{new Date(badge.earned_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' })}</span>
          <span className="sm:hidden text-xs">✓</span>
        </div>
      )}
      
      {/* Status for unearned badges */}
      {!earned && (
        <div className="text-xs text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 rounded-full px-2 py-1 mx-auto w-fit">
          <span className="hidden sm:inline">Locked</span>
          <span className="sm:hidden">🔒</span>
        </div>
      )}
    </div>
  );
}
