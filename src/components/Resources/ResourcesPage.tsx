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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getResourceTypeIcon = (type: string) => {
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
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Learning Resources</h1>
        <p className="text-gray-600 mt-2">
          Curated resources to help you grow your coding skills
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Team Filter */}
          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
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
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{getResourceTypeIcon(resource.resource_type)}</span>
                    <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                      {resource.resource_type}
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty_level)}`}>
                    {resource.difficulty_level}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {resource.title}
                </h3>

                {resource.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
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
                      <span className="text-sm text-gray-600">{resource.team.name}</span>
                    </div>
                  )}
                  <span className="text-xs text-gray-500">
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
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Resources Found</h3>
          <p className="text-gray-600">
            {searchTerm || selectedTeam !== 'all' || selectedDifficulty !== 'all'
              ? 'Try adjusting your filters to see more resources.'
              : 'Resources will appear here as they are added.'}
          </p>
        </div>
      )}

      {/* Featured Resources Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended for Beginners</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'HTML & CSS Basics', type: 'Course', track: 'Web Dev', difficulty: 'Beginner' },
            { title: 'Python Fundamentals', type: 'Tutorial', track: 'AI/ML', difficulty: 'Beginner' },
            { title: 'Game Dev with Unity', type: 'Video', track: 'Game Dev', difficulty: 'Beginner' },
            { title: 'React Native Intro', type: 'Article', track: 'Mobile', difficulty: 'Beginner' },
          ].map((item, index) => (
            <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-xs text-blue-600 font-medium">{item.type}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{item.track}</span>
                <span className="text-green-600">{item.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}