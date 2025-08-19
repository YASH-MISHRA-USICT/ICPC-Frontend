import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { apiService } from '../../lib/api';
import { UserCheck, MessageCircle, Clock, CheckCircle, Plus } from 'lucide-react';
import { LoadingSpinner } from '../UI/LoadingSpinner';

interface MentorshipRequest {
  id: string;
  requester_id: string;
  mentor_id?: string;
  topic: string;
  description?: string;
  status: string;
  created_at: string;
  requester?: { full_name: string };
  mentor?: { full_name: string };
}

interface Profile {
  id: string;
  full_name: string;
  tasks_completed: number;
  total_points: number;
  team?: { name: string; color: string };
}

export function MentorshipPage() {
  const { profile } = useAuth();
  const [requests, setRequests] = useState<MentorshipRequest[]>([]);
  const [mentors, setMentors] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    mentor_id: '',
    topic: '',
    description: '',
  });

  useEffect(() => {
    fetchMentorshipData();
  }, [profile]);

  const fetchMentorshipData = async () => {
    if (!profile) return;

    try {
      // Fetch mentorship requests
      const requestsResponse = await apiService.getMentorshipRequests(profile.id);
      if (requestsResponse.success) {
        setRequests(requestsResponse.data || []);
      }

      // Fetch available mentors
      const mentorsResponse = await apiService.getMentors();
      if (mentorsResponse.success) {
        setMentors(mentorsResponse.data || []);
      }
    } catch (error) {
      console.error('Error fetching mentorship data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitRequest = async () => {
    if (!profile || !formData.mentor_id || !formData.topic) return;

    try {
      const response = await apiService.createMentorshipRequest({
        mentor_id: formData.mentor_id,
        topic: formData.topic,
        description: formData.description,
      });

      if (!response.success) {
        throw new Error(response.error);
      }

      setFormData({ mentor_id: '', topic: '', description: '' });
      setShowForm(false);
      fetchMentorshipData();
    } catch (error) {
      console.error('Error submitting mentorship request:', error);
    }
  };

  const updateRequestStatus = async (requestId: string, status: string) => {
    try {
      const response = await apiService.updateMentorshipRequest(requestId, status);

      if (!response.success) {
        throw new Error(response.error);
      }
      
      fetchMentorshipData();
    } catch (error) {
      console.error('Error updating request status:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  const myRequests = requests.filter(r => r.requester_id === profile?.id);
  const mentorRequests = requests.filter(r => r.mentor_id === profile?.id);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mentorship</h1>
          <p className="text-gray-600 mt-2">
            Connect with mentors and get help with your coding journey
          </p>
        </div>
        
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Request Mentorship</span>
        </button>
      </div>

      {/* Available Mentors */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Mentors</h2>
        {mentors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map((mentor) => (
              <div
                key={mentor.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">
                      {mentor.full_name?.charAt(0) || 'M'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{mentor.full_name}</h3>
                    {mentor.team && (
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: mentor.team.color }}
                        />
                        <span className="text-sm text-gray-600">{mentor.team.name}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>{mentor.tasks_completed} tasks mentored</span>
                  <span>{mentor.total_points} points</span>
                </div>
                
                <button
                  onClick={() => setFormData({ ...formData, mentor_id: mentor.id })}
                  className="w-full bg-blue-50 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  Request Mentorship
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <UserCheck className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No mentors available at the moment.</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* My Requests */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">My Requests</h2>
          <div className="space-y-4">
            {myRequests.length > 0 ? (
              myRequests.map((request) => (
                <div key={request.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{request.topic}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      request.status === 'resolved' ? 'bg-green-100 text-green-700' :
                      request.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {request.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{request.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Mentor: {request.mentor?.full_name || 'Not assigned'}</span>
                    <span>{new Date(request.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">No mentorship requests yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Mentor Requests (if user is a mentor) */}
        {profile?.role === 'mentor' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Mentorship Requests</h2>
            <div className="space-y-4">
              {mentorRequests.length > 0 ? (
                mentorRequests.map((request) => (
                  <div key={request.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{request.topic}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        request.status === 'resolved' ? 'bg-green-100 text-green-700' :
                        request.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{request.description}</p>
                    
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                      <span>From: {request.requester?.full_name}</span>
                      <span>{new Date(request.created_at).toLocaleDateString()}</span>
                    </div>

                    {request.status === 'pending' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => updateRequestStatus(request.id, 'in_progress')}
                          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => updateRequestStatus(request.id, 'declined')}
                          className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                        >
                          Decline
                        </button>
                      </div>
                    )}

                    {request.status === 'in_progress' && (
                      <button
                        onClick={() => updateRequestStatus(request.id, 'resolved')}
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Mark as Resolved</span>
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">No mentorship requests yet.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Request Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Mentorship</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Mentor
                  </label>
                  <select
                    value={formData.mentor_id}
                    onChange={(e) => setFormData({ ...formData, mentor_id: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Choose a mentor...</option>
                    {mentors.map((mentor) => (
                      <option key={mentor.id} value={mentor.id}>
                        {mentor.full_name} ({mentor.team?.name})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topic
                  </label>
                  <input
                    type="text"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    placeholder="What do you need help with?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your question or what you're struggling with..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={handleSubmitRequest}
                  disabled={!formData.mentor_id || !formData.topic}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Send Request
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}