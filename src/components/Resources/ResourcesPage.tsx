import React, { useState, useEffect } from 'react';
import { apiService } from '../../lib/api';
import { BookOpen, ExternalLink, Filter, Search, Star } from 'lucide-react';
import { LoadingSpinner } from '../UI/LoadingSpinner';

interface Resource {
  id: string;
  title: string;
  description?: string;
  url: string;
  resource_type: string;
  team_id?: string;
  difficulty_level: string;
  created_at: string;
  team?: { name: string; color: string };
  creator?: { full_name: string };
}

interface Team {
  id: string;
  name: string;
  color: string;
}

export function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  useEffect(() => {
    fetchResourcesData();
  }, []);

  const fetchResourcesData = async () => {
    try {
      // Fetch resources
      const resourcesResponse = await apiService.getResources();
      if (resourcesResponse.success) {
        setResources(resourcesResponse.data || []);
      }

      // Fetch teams
      const teamsResponse = await apiService.getTeams();
      if (teamsResponse.success) {
        setTeams(teamsResponse.data || []);
      }
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeam = selectedTeam === 'all' || resource.team_id === selectedTeam;
    const matchesDifficulty = selectedDifficulty === 'all' || resource.difficulty_level === selectedDifficulty;
    
    return matchesSearch && matchesTeam && matchesDifficulty;
  });

  const getResourceTypeIcon = (type: string | undefined) => {
    if (!type) return '📄';
    
    switch (type.toLowerCase()) {
      case 'video': return '🎥';
      case 'article': return '📖';
      case 'tutorial': return '📚';
      case 'documentation': return '📋';
      case 'course': return '🎓';
      default: return '📄';
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Learning Resources</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Curated resources to help you grow your coding skills
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Team Filter */}
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Tracks</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>

            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedTeam('all');
                setSelectedDifficulty('all');
              }}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Resources Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-200"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{getResourceTypeIcon(resource.resource_type)}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">
                        {resource.resource_type}
                      </span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      resource.difficulty_level === 'beginner' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
                        : resource.difficulty_level === 'intermediate'
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
                    }`}>
                      {resource.difficulty_level}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                    {resource.title}
                  </h3>

                  {resource.description && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                      {resource.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    {resource.team && (
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: resource.team.color }}
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{resource.team.name}</span>
                      </div>
                    )}
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      {new Date(resource.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full justify-center"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Resource</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No Resources Found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm || selectedTeam !== 'all' || selectedDifficulty !== 'all'
                ? 'Try adjusting your filters to see more resources.'
                : 'Resources will appear here as they are added.'}
            </p>
          </div>
        )}
            </div>
    </div>
  );
}