// lib/api.ts - API service utility
const API_BASE_URL = 'https://innoverse-backend.yashmishra.xyz';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface Video {
  _id: string;
  title: string;
  description: string;
  youtubeId: string;
  duration: string;
  category: string;
  views: number;
  uploadDate: string;
  isPublished: boolean;
}

class ApiService {
  private getAuthHeader(): string | null {
    // Get token from cookie
    const nameEQ = "auth_token=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        const token = c.substring(nameEQ.length, c.length);
        return `Bearer ${token}`;
      }
    }
    return null;
  }

  private async makeRequest<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const authHeader = this.getAuthHeader();
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(authHeader && { 'Authorization': authHeader }),
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || `HTTP ${response.status}`,
        };
      }

      return {
        success: true,
        data: data.data || data,
        message: data.message,
      };
    } catch (error: any) {
      console.error('API request failed:', error);
      return {
        success: false,
        error: error.message || 'Network error',
      };
    }
  }

  // Auth methods
  async signInWithGoogle(authCode: string): Promise<ApiResponse<any>> {
    return this.makeRequest('/google-oauth', {
      method: 'POST',
      body: JSON.stringify({ code: authCode }),
    });
  }

  // Profile methods
  async getProfile(): Promise<ApiResponse<any>> {
    return this.makeRequest('/profile');
  }

  async updateProfile(profileData: any): Promise<ApiResponse<any>> {
    return this.makeRequest('/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async deleteProfile(): Promise<ApiResponse<any>> {
    return this.makeRequest('/profile', {
      method: 'DELETE',
    });
  }

  async calculateTotalPoints(userId: string): Promise<ApiResponse<{ total_points: number }>> {
    return this.makeRequest(`/users/${userId}/calculate-points`);
  }

  // User methods
  async getAllUsers(): Promise<ApiResponse<any[]>> {
    return this.makeRequest('/users');
  }

  async searchUsers(codingTrack?: string): Promise<ApiResponse<any[]>> {
    const query = codingTrack ? `?coding_track=${encodeURIComponent(codingTrack)}` : '';
    return this.makeRequest(`/users/search${query}`);
  }

  // Teams methods
  async getTeams(): Promise<ApiResponse<any[]>> {
    return this.makeRequest('/teams');
  }

  async getTeamStats(teamId: string): Promise<ApiResponse<any>> {
    return this.makeRequest(`/teams/${teamId}/stats`);
  }

  // Tasks methods
  async getTasks(track?: string): Promise<ApiResponse<any[]>> {
  const query = track ? `?track=${encodeURIComponent(track)}` : '';
  return this.makeRequest(`/tasks${query}`);
}

  async createTask(taskData: any): Promise<ApiResponse<any>> {
    return this.makeRequest('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  }

  async updateTask(taskId: string, taskData: any): Promise<ApiResponse<any>> {
    return this.makeRequest(`/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  }

  async deleteTask(taskId: string): Promise<ApiResponse<any>> {
    return this.makeRequest(`/tasks/${taskId}`, {
      method: 'DELETE',
    });
  }

  // Submissions methods
  async getSubmissions(userId?: string): Promise<ApiResponse<any[]>> {
    const query = userId ? `?user_id=${userId}` : '';
    return this.makeRequest(`/submissions${query}`);
  }

  async createSubmission(submissionData: any): Promise<ApiResponse<any>> {
    return this.makeRequest('/submissions', {
      method: 'POST',
      body: JSON.stringify(submissionData),
    });
  }

  async updateSubmission(submissionId: string, submissionData: any): Promise<ApiResponse<any>> {
    return this.makeRequest(`/submissions/${submissionId}`, {
      method: 'PUT',
      body: JSON.stringify(submissionData),
    });
  }

  async reviewSubmission(submissionId: string, status: string, feedback?: string): Promise<ApiResponse<any>> {
    return this.makeRequest(`/submissions/${submissionId}/review`, {
      method: 'PUT',
      body: JSON.stringify({ status, feedback }),
    });
  }

  // Forums methods
  async getForums(teamId: string): Promise<ApiResponse<any[]>> {
    return this.makeRequest(`/forums?team_id=${teamId}`);
  }

  async createForum(forumData: any): Promise<ApiResponse<any>> {
    return this.makeRequest('/forums', {
      method: 'POST',
      body: JSON.stringify(forumData),
    });
  }

  async getForumPosts(forumId: string): Promise<ApiResponse<any[]>> {
    return this.makeRequest(`/forums/${forumId}/posts`);
  }

  // Forum comments
  async getForumComments(forumId: string): Promise<ApiResponse<any[]>> {
    return this.makeRequest(`/forums/${forumId}/comments`);
  }

  async createForumComment(forumId: string, data: { content: string; user?: { full_name?: string } }): Promise<ApiResponse<any>> {
    return this.makeRequest(`/forums/${forumId}/comments`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Mentorship methods
  async getMentorshipRequests(userId?: string): Promise<ApiResponse<any[]>> {
    const query = userId ? `?user_id=${userId}` : '';
    return this.makeRequest(`/mentorship${query}`);
  }

  async createMentorshipRequest(requestData: any): Promise<ApiResponse<any>> {
    return this.makeRequest('/mentorship', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
  }

  async updateMentorshipRequest(requestId: string, status: string): Promise<ApiResponse<any>> {
    return this.makeRequest(`/mentorship/${requestId}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  async getMentors(): Promise<ApiResponse<any[]>> {
    return this.makeRequest('/mentors');
  }

  // Resources methods
  async getResources(teamId?: string): Promise<ApiResponse<any[]>> {
    const query = teamId ? `?team_id=${teamId}` : '';
    return this.makeRequest(`/resources${query}`);
  }

  async createResource(resourceData: any): Promise<ApiResponse<any>> {
    return this.makeRequest('/resources', {
      method: 'POST',
      body: JSON.stringify(resourceData),
    });
  }

  // Showcase methods
  async getShowcaseProjects(): Promise<ApiResponse<any[]>> {
    return this.makeRequest('/showcase');
  }

  async createShowcaseProject(projectData: any): Promise<ApiResponse<any>> {
    return this.makeRequest('/showcase', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  }

  // Leaderboard methods
  async getLeaderboard(): Promise<ApiResponse<any[]>> {
    return this.makeRequest('/leaderboard');
  }

  async getTeamLeaderboard(): Promise<ApiResponse<any[]>> {
    return this.makeRequest('/leaderboard/teams');
  }


  // Badges methods
  async getBadges(userId?: string): Promise<ApiResponse<any[]>> {
    const path = userId ? `/badges/${userId}` : '/badges';
    return this.makeRequest(path);
  }

  async awardBadge(userId: string, badgeId: string): Promise<ApiResponse<any>> {
    return this.makeRequest('/badges/award', {
      method: 'POST',
      body: JSON.stringify({
        user_id: userId,
        badge_id: badgeId
      }),
    });
  }

  async checkAndAwardBadges(userId: string): Promise<ApiResponse<{ awarded_badges: string[] }>> {
    return this.makeRequest(`/badges/check/${userId}`, {
      method: 'POST',
    });
  }

  // Admin methods
  async getAdminStats(): Promise<ApiResponse<any>> {
    return this.makeRequest('/admin/stats');
  }

  async updateUserRole(userId: string, role: string): Promise<ApiResponse<any>> {
    return this.makeRequest(`/admin/users/${userId}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    });
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<any>> {
    return this.makeRequest('/health');
  }

  // Protected route example
  async getProtected(): Promise<ApiResponse<any>> {
    return this.makeRequest('/protected');
  }

  // Videos methods
  async getVideos(): Promise<ApiResponse<Video[]>> {
    return this.makeRequest('/videos');
  }

  async getVideo(videoId: string): Promise<ApiResponse<Video>> {
    return this.makeRequest(`/videos/${videoId}`);
  }

  async getVideoCategories(): Promise<ApiResponse<string[]>> {
    return this.makeRequest('/videos/categories');
  }

  // Chatbot methods - separate method for different base URL
  async chatbot(question: string): Promise<ApiResponse<any>> {
    try {
      const authHeader = this.getAuthHeader();
      
      const response = await fetch('http://127.0.0.1:8000/chat', {
        method: 'POST',
        mode: 'cors', // Explicitly set CORS mode
        headers: {
          'Content-Type': 'application/json',
          ...(authHeader && { 'Authorization': authHeader }),
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || `HTTP ${response.status}`,
        };
      }

      return {
        success: true,
        data: data,
        message: data.message,
      };
    } catch (error: any) {
      console.error('CORS or network error:', error);
      return {
        success: false,
        error: 'Unable to connect to chatbot service. Please try again later.',
      };
    }
  }
}

// Export singleton instance
export const apiService = new ApiService();

// Export types for use in components
export type { ApiResponse };