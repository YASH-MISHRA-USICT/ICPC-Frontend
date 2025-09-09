import React, { useState, useEffect } from 'react';
import { Play, Clock, Eye, BookOpen } from 'lucide-react';
import { apiService, Video } from '../../lib/api';
import { LoadingSpinner } from '../UI/LoadingSpinner';
import { useAuth } from '../../hooks/useAuth';
import { Chatbot } from '../UI/Chatbot';

export function VideosPage(): JSX.Element {
  const { user } = useAuth();
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.getVideos();
      
      if (response.success && response.data) {
        let allVideos = response.data;
        
        // Filter videos based on user's tracks if they have any
        if (user?.profile?.coding_track) {
          // Handle comma-separated tracks
          const userTracks = user.profile.coding_track.split(',').map(track => track.trim());
          
          // Map track codes to category names
          const trackToCategory = {
            'webdev': 'Web Development',
            'app': 'App Development',
            'ai': 'AI/ML', 
            'game': 'Game Development',
            'dsa': 'Programming'
          };
          
          // Get user's category names
          const userCategories = userTracks.map(track => trackToCategory[track]).filter(Boolean);
          
          // Filter videos to only show user's categories
          if (userCategories.length > 0) {
            allVideos = response.data.filter(video => userCategories.includes(video.category));
          }
        }
        
        setVideos(allVideos);
        
        // Extract unique categories from filtered videos
        const uniqueCategories = ['All', ...new Set(allVideos.map(video => video.category))];
        setCategories(uniqueCategories);
        
        // Set first video as selected
        if (allVideos.length > 0) {
          setSelectedVideo(allVideos[0]);
        }
      } else {
        setError(response.error || 'Failed to load videos');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load videos');
    } finally {
      setLoading(false);
    }
  };

  // Simple filtering logic
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredVideos(videos);
    } else {
      setFilteredVideos(videos.filter(video => video.category === selectedCategory));
    }
  }, [videos, selectedCategory]);

  // Optionally increment view count by calling the single video API
  const handleVideoSelect = async (video: Video) => {
    setSelectedVideo(video);
    
    try {
      await apiService.getVideo(video._id);
      setVideos(prev => prev.map(v => 
        v._id === video._id ? { ...v, views: v.views + 1 } : v
      ));
    } catch (error) {
      console.error('Error updating view count:', error);
    }
  };

  // Add helper functions to detect video type and extract IDs
  const getVideoType = (video: Video): 'youtube' | 'drive' | 'unknown' => {
    // Check if video has videoType field first
    if (video.videoType === 'drive' || video.driveId) {
      return 'drive';
    }
    // If it has youtubeId, it's YouTube
    if (video.youtubeId) {
      return 'youtube';
    }
    return 'unknown';
  };

  const getVideoThumbnail = (video: Video): string => {
    const videoType = getVideoType(video);
    
    if (videoType === 'youtube' && video.youtubeId) {
      return `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
    }
    
    if (videoType === 'drive' && video.driveId) {
      // Use Google Drive's thumbnail API with better size parameter
      return `https://lh3.googleusercontent.com/d/${video.driveId}=w320-h240-c`;
    }
    
    return '';
  };

  const getEmbedUrl = (video: Video): string => {
    const videoType = getVideoType(video);
    
    if (videoType === 'youtube' && video.youtubeId) {
      return `https://www.youtube-nocookie.com/embed/${video.youtubeId}?modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&controls=1&origin=${window.location.origin}`;
    }
    
    if (videoType === 'drive' && video.driveId) {
      return `https://drive.google.com/file/d/${video.driveId}/preview`;
    }
    
    return '';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <LoadingSpinner size="large" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Error Loading Videos
            </h2>
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            <button
              onClick={loadVideos}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Video Lectures
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Access our collection of educational video content and tutorials
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredVideos.length === 0 ? (
          <div className="text-center py-12">
            <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No videos available
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {selectedCategory === 'All' 
                ? 'Check back later for new content' 
                : `No videos found in the ${selectedCategory} category`
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Video List */}
            <div className="lg:col-span-1">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Available Videos ({filteredVideos.length})
              </h2>
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {filteredVideos.map((video) => (
                  <div
                    key={video._id}
                    onClick={() => handleVideoSelect(video)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedVideo?._id === video._id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    } bg-white dark:bg-gray-900`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <img
                          src={getVideoThumbnail(video)}
                          alt={video.title || 'Video thumbnail'}
                          className="w-16 h-12 object-cover rounded"
                          onError={(e) => {
                            // Fallback to play icon if thumbnail fails
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                            if (fallback) fallback.classList.remove('hidden');
                          }}
                        />
                        <div className="w-16 h-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center hidden">
                          <Play className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {video.title}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Clock className="w-3 h-3 mr-1" />
                            {video.duration}
                          </span>
                          <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Eye className="w-3 h-3 mr-1" />
                            {video.views}
                          </span>
                        </div>
                        <span className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded mt-2">
                          {video.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Video Player */}
            <div className="lg:col-span-2">
              {selectedVideo ? (
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="aspect-video relative overflow-hidden">
                    {getEmbedUrl(selectedVideo) ? (
                      <>
                        <iframe
                          src={getEmbedUrl(selectedVideo)}
                          title={selectedVideo.title || 'Video Player'}
                          className="w-full h-full rounded-t-lg"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          referrerPolicy="strict-origin-when-cross-origin"
                        />
                        
                        {/* Custom overlay - only for YouTube videos */}
                        {getVideoType(selectedVideo) === 'youtube' && (
                          <div className="absolute inset-0 pointer-events-none">
                            {/* Block top-right corner (YouTube logo area) */}
                            <div 
                              className="absolute top-0 right-0 w-16 h-12 pointer-events-auto bg-transparent"
                              onClick={(e) => e.preventDefault()}
                              onContextMenu={(e) => e.preventDefault()}
                            />
                            
                            {/* Block top area (title/channel info) */}
                            <div 
                              className="absolute top-0 left-0 right-16 h-12 pointer-events-auto bg-transparent"
                              onClick={(e) => e.preventDefault()}
                              onContextMenu={(e) => e.preventDefault()}
                            />
                            
                            {/* Block bottom-left "Watch on YouTube" button */}
                            <div 
                              className="absolute bottom-2 left-2 w-32 h-8 pointer-events-auto bg-transparent"
                              onClick={(e) => e.preventDefault()}
                              onContextMenu={(e) => e.preventDefault()}
                              title="Blocked"
                            />
                            
                            {/* Block bottom-right YouTube logo (next to fullscreen) */}
                            <div 
                              className="absolute bottom-2 right-12 w-8 h-8 pointer-events-auto bg-transparent"
                              onClick={(e) => e.preventDefault()}
                              onContextMenu={(e) => e.preventDefault()}
                              title="Blocked"
                            />
                            
                            {/* Allow bottom area for controls - adjust height as needed */}
                            <div className="absolute bottom-12 left-0 right-0 top-12 pointer-events-none" />
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-t-lg flex items-center justify-center">
                        <div className="text-center">
                          <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500 dark:text-gray-400">Video unavailable</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedVideo.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {selectedVideo.description}
                    </p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {selectedVideo.duration}
                      </span>
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {selectedVideo.views} views
                      </span>
                      <span className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-1" />
                        {selectedVideo.category}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {new Date(selectedVideo.uploadDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
                  <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Select a video to watch
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Choose from our collection of educational videos to start learning
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}