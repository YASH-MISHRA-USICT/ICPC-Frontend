import React, { useState, useEffect } from 'react';
import { apiService } from '../../lib/api';
import { Users, Trophy, Target, TrendingUp, Info, Clock, Code } from 'lucide-react';
import { LoadingSpinner } from '../UI/LoadingSpinner';

interface Team {
  id: string;
  name: string;
  description?: string;
  color: string;
}

interface TeamStats {
  memberCount: number;
  totalPoints: number;
  activeTasks: number;
}

export function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamStats, setTeamStats] = useState<Record<string, TeamStats>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamsData();
  }, []);

  const fetchTeamsData = async () => {
    try {
      // Fetch teams
      const teamsResponse = await apiService.getTeams();
      if (!teamsResponse.success) {
        throw new Error(teamsResponse.error);
      }

      const teamsData = teamsResponse.data || [];
      setTeams(teamsData);

      // Fetch team statistics
      const statsPromises = teamsData.map(async (team: Team) => {
        const statsResponse = await apiService.getTeamStats(team.id);
        return {
          teamId: team.id,
          stats: statsResponse.success ? statsResponse.data : {
            memberCount: 0,
            totalPoints: 0,
            activeTasks: 0,
          },
        };
      });

      const statsResults = await Promise.all(statsPromises);
      const statsMap = statsResults.reduce((acc, { teamId, stats }) => {
        acc[teamId] = stats;
        return acc;
      }, {} as Record<string, TeamStats>);

      setTeamStats(statsMap);
    } catch (error) {
      console.error('Error fetching teams data:', error);
    } finally {
      setLoading(false);
    }
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Coding Tracks</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Explore different coding tracks and join a community of learners
          </p>
        </div>

        {/* Future Team Formation Notice */}
        <div className="mb-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-lg flex-shrink-0">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">Future Team Formation</h3>
              <div className="text-blue-800 dark:text-blue-200 space-y-2">
                <p>
                  <strong>Coming Soon:</strong> After completion of the C programming course, we will be forming official coding teams!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-start space-x-2">
                    <Clock className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Team Formation Methods:</p>
                      <ul className="text-sm mt-1 space-y-1">
                        <li>• Merit-based selection</li>
                        <li>• Self-proposed groups (4-6 members)</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Code className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Team Activities:</p>
                      <ul className="text-sm mt-1 space-y-1">
                        <li>• Additional team-specific tasks</li>
                        <li>• Full-stack project development</li>
                        <li>• Collaborative coding challenges</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => {
            const stats = teamStats[team.id] || { memberCount: 0, totalPoints: 0, activeTasks: 0 };
            
            return (
              <div
                key={team.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-200"
              >
                {/* Team Header */}
                <div
                  className="h-24 relative"
                  style={{
                    background: `linear-gradient(135deg, ${team.color}, ${team.color}cc)`,
                  }}
                >
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="relative p-6 h-full flex items-center">
                    <h2 className="text-xl font-bold text-white">{team.name}</h2>
                  </div>
                </div>

                {/* Team Content */}
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2">
                    {team.description || 'Learn and grow in this exciting coding track'}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                          <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.memberCount}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Members</p>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
                          <Trophy className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.totalPoints}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Points</p>
                    </div>
                  </div>

                  {/* Additional Stats */}
                  <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">Active Tasks</span>
                      </div>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{stats.activeTasks}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-6">
                    <button
                      className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded-lg transition-colors"
                      onClick={() => {
                        // TODO: Implement team join/view functionality
                        console.log('View team details:', team.id);
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Team Comparison */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Team Comparison</h2>
          
          <div className="space-y-4">
            {teams
              .sort((a, b) => (teamStats[b.id]?.totalPoints || 0) - (teamStats[a.id]?.totalPoints || 0))
              .map((team, index) => {
                const stats = teamStats[team.id] || { totalPoints: 0 };
                const maxPoints = Math.max(...Object.values(teamStats).map(s => s.totalPoints || 0));
                const percentage = maxPoints > 0 ? (stats.totalPoints / maxPoints) * 100 : 0;

                return (
                  <div key={team.id} className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3 w-48">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-6">#{index + 1}</span>
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: team.color }}
                      />
                      <span className="font-medium text-gray-900 dark:text-gray-100 truncate">{team.name}</span>
                    </div>
                    
                    <div className="flex-1 flex items-center space-x-4">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: team.color,
                          }}
                        />
                      </div>
                      <div className="text-right w-24">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">{stats.totalPoints}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">pts</span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Team Formation Timeline */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-purple-100 dark:bg-purple-800 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">What's Next?</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-purple-800 dark:text-purple-200">
            <div className="text-center">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold mb-2">1. Complete C Course</h4>
                <p className="text-sm">Finish your C programming fundamentals and assessments</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold mb-2">2. Team Formation</h4>
                <p className="text-sm">Join teams based on merit ranking or form your own group of 4-6 members</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold mb-2">3. Advanced Projects</h4>
                <p className="text-sm">Work on full-stack projects and additional team challenges</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}