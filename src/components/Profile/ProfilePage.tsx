import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { apiService } from '../../lib/api';
import { User, Mail, Calendar, Award, Users, Edit2, Save, X, Image } from 'lucide-react';
import { LoadingSpinner } from '../UI/LoadingSpinner';

// Available coding tracks/teams (you can move this to a config file)
const AVAILABLE_TRACKS = [
  { id: 'webdev', name: 'Web Development' },
  { id: 'app', name: 'App Development' },
  { id: 'ai', name: 'Data Science & AI' },
  { id: 'dsa', name: 'Data Structures & Algorithms' }
];

interface ProfileData {
  bio: string;
  college: string;
  course: string;
  year: string;
  interests: string[];
  coding_track: string;
}

export function ProfilePage() {
  const { user } = useAuth(); // Removed profile, getAuthHeader, updateProfile since we'll use apiService
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<ProfileData>({
    bio: '',
    college: '',
    course: '',
    year: '',
    interests: [],
    coding_track: '',
  });

  // Load profile data on component mount
  useEffect(() => {
    loadProfile();
  }, []);

  // Update form data when profile changes
  useEffect(() => {
    if (profile?.profile) {
      setFormData({
        bio: profile.profile.bio || '',
        college: profile.profile.college || '',
        course: profile.profile.course || '',
        year: profile.profile.year || '',
        interests: profile.profile.interests || [],
        coding_track: profile.profile.coding_track || '',
      });
    }
  }, [profile]);

  const loadProfile = async () => {
    try {
      setInitialLoading(true);
      const response = await apiService.getProfile();
      
      if (response.success) {
        setProfile(response.data);
      } else {
        setError(response.error || 'Failed to load profile');
      }
    } catch (error: any) {
      console.error('Error loading profile:', error);
      setError(error.message || 'Failed to load profile');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleInputChange = (field: keyof ProfileData, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInterestAdd = (interest: string) => {
    if (interest.trim() && !formData.interests.includes(interest.trim())) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, interest.trim()]
      }));
    }
  };

  const handleInterestRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    if (!profile) return;

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      // Check if coding track has changed
      const originalTrack = profile.profile?.coding_track || '';
      const newTrack = formData.coding_track || '';
      const trackChanged = originalTrack !== newTrack;

      // Prepare the updated profile data
      const updatedProfile = {
        ...profile,
        profile: {
          ...profile.profile,
          ...formData
        }
      };

      const response = await apiService.updateProfile(updatedProfile);

      if (response.success) {
        setProfile(response.data);
        
        // If coding track changed, show different message and refresh
        if (trackChanged) {
          setSuccess('Coding track updated! Refreshing page...');
          setEditing(false);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          setSuccess('Profile updated successfully!');
          setEditing(false);
          // Clear success message after 3 seconds for other changes
          setTimeout(() => setSuccess(null), 3000);
        }
      } else {
        setError(response.error || 'Failed to update profile');
      }
    } catch (error: unknown) {
      console.error('Error updating profile:', error);
      setError(error instanceof Error ? error.message : 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form data to original values
    if (profile?.profile) {
      setFormData({
        bio: profile.profile.bio || '',
        college: profile.profile.college || '',
        course: profile.profile.course || '',
        year: profile.profile.year || '',
        interests: profile.profile.interests || [],
        coding_track: profile.profile.coding_track || '',
      });
    }
    setEditing(false);
    setError(null);
  };

  if (initialLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">{error}</div>
          <button 
            onClick={loadProfile}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
                {user.picture ? (
                  <img 
                    src={user.picture} 
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-white">
                    {user.name?.charAt(0) || 'U'}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                <p className="text-blue-100">{user.email}</p>
                <div className="flex items-center space-x-2 mt-2">
                  {formData.coding_track && (
                    <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                      {AVAILABLE_TRACKS.find(t => t.id === formData.coding_track)?.name || formData.coding_track}
                    </span>
                  )}
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                    {user.verified_email ? 'Verified' : 'Unverified'}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => editing ? handleCancel() : setEditing(true)}
              disabled={loading}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors disabled:opacity-50"
            >
              {editing ? <X className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
              <span>{editing ? 'Cancel' : 'Edit Profile'}</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Success/Error Messages */}
          {success && (
            <div className="mb-6 p-4 bg-green-100 border border-green-300 text-green-700 rounded-lg">
              {success}
            </div>
          )}
          
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Information */}
            <div className="lg:col-span-2">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name
                  </label>
                  <p className="text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500 mt-1">Name is managed by Google account</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email
                  </label>
                  <p className="text-gray-900">{user.email}</p>
                  <p className="text-xs text-gray-500 mt-1">Email is managed by Google account</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4 inline mr-2" />
                    Coding Track
                  </label>
                  {editing ? (
                    <select
                      value={formData.coding_track}
                      onChange={(e) => handleInputChange('coding_track', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a coding track</option>
                      {AVAILABLE_TRACKS.map((track) => (
                        <option key={track.id} value={track.id}>
                          {track.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-gray-900">
                      {formData.coding_track 
                        ? AVAILABLE_TRACKS.find(t => t.id === formData.coding_track)?.name || formData.coding_track
                        : 'Not selected'
                      }
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  {editing ? (
                    <textarea
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="text-gray-900">{formData.bio || 'No bio added yet'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    College/University
                  </label>
                  {editing ? (
                    <input
                      type="text"
                      value={formData.college}
                      onChange={(e) => handleInputChange('college', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your college or university name"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.college || 'Not specified'}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course/Major
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        value={formData.course}
                        onChange={(e) => handleInputChange('course', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Computer Science"
                      />
                    ) : (
                      <p className="text-gray-900">{formData.course || 'Not specified'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Year
                    </label>
                    {editing ? (
                      <select
                        value={formData.year}
                        onChange={(e) => handleInputChange('year', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select year</option>
                        <option value="1st">1st Year</option>
                        <option value="2nd">2nd Year</option>
                        <option value="3rd">3rd Year</option>
                        <option value="4th">4th Year</option>
                        <option value="graduate">Graduate</option>
                        <option value="working">Working Professional</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{formData.year || 'Not specified'}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interests
                  </label>
                  {editing ? (
                    <div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {formData.interests.map((interest, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                          >
                            <span>{interest}</span>
                            <button
                              type="button"
                              onClick={() => handleInterestRemove(index)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <input
                        type="text"
                        placeholder="Add an interest and press Enter"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleInterestAdd(e.currentTarget.value);
                            e.currentTarget.value = '';
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {formData.interests.length > 0 ? (
                        formData.interests.map((interest, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                          >
                            {interest}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-500">No interests added yet</p>
                      )}
                    </div>
                  )}
                </div>

                {editing && (
                  <div className="flex space-x-4 pt-4">
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save className="w-4 h-4" />
                      <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={loading}
                      className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Stats Sidebar */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Account Statistics</h2>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Google ID</span>
                    <span className="font-mono text-xs text-gray-900">{user.google_id.slice(-8)}</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Login Count</span>
                    <span className="font-semibold text-gray-900">{user.login_count}</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Account Created</span>
                    <span className="font-semibold text-gray-900">
                      {new Date(user.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Last Login</span>
                    <span className="font-semibold text-gray-900">
                      {new Date(user.last_login).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Email Status</span>
                    <span className={`font-semibold ${
                      user.verified_email ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {user.verified_email ? 'Verified' : 'Unverified'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Profile Picture Section */}
              <div className="mt-8">
                <h3 className="text-md font-semibold text-gray-900 mb-4">Profile Picture</h3>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3 overflow-hidden">
                    {user.picture ? (
                      <img 
                        src={user.picture} 
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    Profile picture is managed by your Google account
                  </p>
                </div>
              </div>

              {/* Badges Section */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-md font-semibold text-gray-900 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-yellow-500" />
                    Badges & Achievements
                  </h3>
                  <button 
                    onClick={() => window.location.href = '/badges'}
                    className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    View All
                  </button>
                </div>
                <div className="w-full overflow-hidden">
                  <BadgesSection userId={user.id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Badges Component
interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earned_at: string;
}

function BadgesSection({ userId }: { userId: string }) {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const response = await apiService.getBadges(userId);
        if (response.success) {
          setBadges(response.data || []);
        }
      } catch (error) {
        console.error('Error fetching badges:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBadges();
  }, [userId]);

  if (loading) {
    return <div className="text-center py-4"><LoadingSpinner size="small" /></div>;
  }

  if (badges.length === 0) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg text-center">
        <Award className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">No badges earned yet</p>
        <p className="text-sm text-gray-400 mt-1">Complete tasks to earn your first badge!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 w-full">
      {badges.map((badge) => (
        <div key={badge.id} className="bg-white p-3 rounded-lg border border-gray-200 hover:shadow-md transition-shadow min-h-0 w-full">
          <div className="flex items-start space-x-3">
            <div 
              className="text-xl flex-shrink-0"
              style={{ color: badge.color }}
            >
              {badge.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-xs text-gray-900 mb-1 truncate">{badge.name}</h4>
              <p className="text-xs text-gray-500 mb-1 line-clamp-2">{badge.description}</p>
              <p className="text-xs text-gray-400">
                {new Date(badge.earned_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}