import React, { useState, useEffect } from 'react';
import { apiService } from '../../lib/api';
import { Trophy, Medal, Award, TrendingUp, Users } from 'lucide-react';
import { LoadingSpinner } from '../UI/LoadingSpinner';

interface Profile {
  id: string;
  full_name: string;
  total_points: number;
  tasks_completed: number;
  team?: { name: string; color: string };
}

interface TeamLeaderboard {
  id: string;
  name: string;
  color: string;
  totalPoints: number;
  totalTasks: number;
  memberCount: number;
  avgPoints: number;
}

export function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<Profile[]>([]);
  const [teamLeaderboard, setTeamLeaderboard] = useState<TeamLeaderboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'individual' | 'team'>('individual');

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      // Fetch individual leaderboard
      const leaderboardResponse = await apiService.getLeaderboard();
      if (leaderboardResponse.success) {
        setLeaderboard(leaderboardResponse.data || []);
      }

      // Fetch team leaderboard
      const teamLeaderboardResponse = await apiService.getTeamLeaderboard();
      if (teamLeaderboardResponse.success) {
        setTeamLeaderboard(teamLeaderboardResponse.data || []);
      }
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Award className="w-6 h-6 text-amber-600" />;
    return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-500">#{rank}</span>;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
        <p className="text-gray-600 mt-2">
          Track top performers and team standings
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8 w-fit">
        <button
          onClick={() => setActiveTab('individual')}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            activeTab === 'individual'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Individual
        </button>
        <button
          onClick={() => setActiveTab('team')}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            activeTab === 'team'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Teams
        </button>
      </div>

      {activeTab === 'individual' ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Top Performers</h2>
          </div>
          
          <div className="divide-y divide-gray-100">
            {leaderboard.map((profile, index) => (
              <div key={profile.id} className="px-6 py-4 flex items-center space-x-4 hover:bg-gray-50 transition-colors">
                <div className="flex-shrink-0">
                  {getRankIcon(index + 1)}
                </div>
                
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {profile.full_name?.charAt(0) || 'U'}
                    </span>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {profile.full_name}
                  </p>
                  <div className="flex items-center space-x-2">
                    {profile.team && (
                      <>
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: profile.team.color }}
                        />
                        <p className="text-sm text-gray-500">{profile.team.name}</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">{profile.total_points}</p>
                    <p className="text-gray-500">Points</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">{profile.tasks_completed}</p>
                    <p className="text-gray-500">Tasks</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {teamLeaderboard.map((team, index) => (
            <div key={team.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getRankIcon(index + 1)}
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: team.color }}
                  />
                  <h3 className="text-lg font-semibold text-gray-900">{team.name}</h3>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{team.totalPoints}</p>
                  <p className="text-sm text-gray-500">Total Points</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="bg-blue-100 p-2 rounded-lg inline-flex items-center justify-center mb-2">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="font-semibold text-gray-900">{team.memberCount}</p>
                  <p className="text-xs text-gray-500">Members</p>
                </div>
                <div>
                  <div className="bg-green-100 p-2 rounded-lg inline-flex items-center justify-center mb-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="font-semibold text-gray-900">{team.avgPoints}</p>
                  <p className="text-xs text-gray-500">Avg Points</p>
                </div>
                <div>
                  <div className="bg-purple-100 p-2 rounded-lg inline-flex items-center justify-center mb-2">
                    <Award className="w-4 h-4 text-purple-600" />
                  </div>
                  <p className="font-semibold text-gray-900">{team.totalTasks}</p>
                  <p className="text-xs text-gray-500">Tasks Done</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}