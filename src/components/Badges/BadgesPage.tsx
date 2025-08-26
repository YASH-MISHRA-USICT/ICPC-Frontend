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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-full shadow-lg">
              <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Badges & Achievements
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base sm:text-lg px-4 leading-relaxed">
            Earn badges by completing tasks, reaching milestones, and participating in the community.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-full w-fit mx-auto mb-4">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">{userBadges.length}</h3>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Badges Earned</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full w-fit mx-auto mb-4">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
              {userBadges.length > 0 ? Math.round((userBadges.length / 10) * 100) : 0}%
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Progress</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
            <div className="bg-gradient-to-r from-green-500 to-teal-500 p-3 rounded-full w-fit mx-auto mb-4">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
              {userBadges.length > 0 ? userBadges.length * 10 : 0}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Achievement Points</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-full w-fit mx-auto mb-4">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
              {userBadges.length > 0 ? userBadges.filter(b => 
                b.earned_at && new Date(b.earned_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
              ).length : 0}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-medium">This Week</p>
          </div>
        </div>

        {/* Badge Grid */}
        <div className="relative">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">Your Collection</h2>
          {userBadges.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4 sm:gap-6">
              {userBadges.map((badge, index) => (
                <div key={badge.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <BadgeCard badge={badge} earned={true} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-full w-fit mx-auto mb-6">
                <Award className="w-16 h-16 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">No badges earned yet</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                Start completing tasks to earn your first badge and build your collection!
              </p>
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full font-medium inline-flex items-center space-x-2 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 cursor-pointer">
                <Star className="w-4 h-4" />
                <span>Start Your Journey</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BadgeCard({ badge, earned }: { badge: Badge; earned: boolean }) {
  return (
    <div className={`group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-4 sm:p-6 text-center transition-all duration-300 hover:shadow-2xl hover:scale-110 cursor-pointer transform ${
      !earned ? 'opacity-60 grayscale' : 'hover:-translate-y-2'
    }`}>
      {/* Glow effect for earned badges */}
      {earned && (
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
      )}

      {/* Tooltip */}
      <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gray-900 dark:bg-gray-800 text-white dark:text-gray-100 text-sm rounded-xl p-4 -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full z-20 w-64 shadow-2xl border border-gray-700 dark:border-gray-600 hidden lg:block">
        <div className="font-bold mb-2 text-yellow-300 text-base">{badge.name}</div>
        <div className="text-gray-200 dark:text-gray-300 mb-3 leading-relaxed">{badge.description}</div>
        {earned && badge.earned_at && (
          <div className="text-green-300 text-sm border-t border-gray-700 dark:border-gray-600 pt-2 flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            Earned: {new Date(badge.earned_at).toLocaleDateString()}
          </div>
        )}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-900 dark:border-t-gray-800"></div>
      </div>

      {/* Badge Icon with enhanced styling */}
      <div className="relative mb-4">
        <div 
          className={`text-3xl sm:text-4xl lg:text-5xl transition-all duration-300 group-hover:scale-110 ${!earned ? 'grayscale' : ''}`}
          style={{ color: earned ? badge.color : '#9CA3AF' }}
        >
          {badge.icon}
        </div>
        {earned && (
          <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
            ✓
          </div>
        )}
      </div>
      
      {/* Badge Name */}
      <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-gray-100 mb-2 leading-tight">{badge.name}</h3>
      
      {/* Description - Only on larger screens */}
      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 hidden xl:block leading-tight">{badge.description}</p>
      
      {/* Status */}
      {earned && badge.earned_at ? (
        <div className="inline-flex items-center justify-center text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-full px-3 py-1.5 border border-green-200 dark:border-green-800">
          <Calendar className="w-3 h-3 mr-1" />
          <span className="hidden sm:inline">{new Date(badge.earned_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          <span className="sm:hidden">Earned</span>
        </div>
      ) : (
        <div className="inline-flex items-center justify-center text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1.5 border border-gray-200 dark:border-gray-600">
          <span>🔒 Locked</span>
        </div>
      )}
    </div>
  );
}
