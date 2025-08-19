// hooks/useAuth.tsx
import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { apiService } from '../lib/api';

// Types
interface User {
  id: string;
  google_id: string;
  email: string;
  name: string;
  picture: string;
  verified_email: boolean;
  created_at: string;
  last_login: string;
  login_count: number;
  profile?: {
    bio?: string;
    college?: string;
    course?: string;
    year?: string;
    interests?: string[];
    coding_track?: string;
    team_id?: string;
  };
  preferences?: {
    notifications?: boolean;
    privacy?: string;
  };
  role?: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  profile: User | null;
  loading: boolean;
  authLoading: boolean;
  signInWithGoogle: (authCode: string) => Promise<{ success: boolean; user: User; isNewUser: boolean }>;
  signOut: () => void;
  updateProfile: (profileData: Partial<User>) => Promise<{ success: boolean }>;
  getAuthHeader: () => string | null;
  isAuthenticated: boolean;
  refreshProfile: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthResponse {
  success: boolean;
  user: User;
  token: string;
  message: string;
  is_new_user: boolean;
}

// Create Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Cookie utility functions
const setCookie = (name: string, value: string, days: number = 7): void => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
};

const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const deleteCookie = (name: string): void => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

// Auth Provider Component
export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  // Check for existing auth on component mount
  useEffect(() => {
    checkExistingAuth();
  }, []);

  const checkExistingAuth = async (): Promise<void> => {
    try {
      const token = getCookie('auth_token');
      
      if (token) {
        // Verify token and get fresh user data from backend
        const isValid = await verifyTokenAndGetProfile();
        if (!isValid) {
          signOut();
        }
      }
    } catch (error) {
      console.error('Error checking existing auth:', error);
      signOut();
    } finally {
      setLoading(false);
    }
  };

  const verifyTokenAndGetProfile = async (): Promise<boolean> => {
    try {
      const response = await apiService.getProfile();
      
      if (response.success && response.data) {
        setUser(response.data);
        setProfile(response.data);
        // Update cookie with fresh data
        setCookie('user_data', encodeURIComponent(JSON.stringify(response.data)), 7);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Token verification failed:', error);
      return false;
    }
  };

  const refreshProfile = async (): Promise<void> => {
    try {
      const token = getCookie('auth_token');
      if (!token) throw new Error('No auth token found');

      const response = await apiService.getProfile();

      if (response.success && response.data) {
        setUser(response.data);
        setProfile(response.data);
        setCookie('user_data', encodeURIComponent(JSON.stringify(response.data)), 7);
      } else {
        throw new Error(response.error || 'Failed to refresh profile');
      }
    } catch (error) {
      console.error('Error refreshing profile:', error);
      // If refresh fails due to auth issues, sign out
      if (error.message?.includes('401') || error.message?.includes('unauthorized')) {
        signOut();
      }
    }
  };

  const signInWithGoogle = async (authCode: string): Promise<{ success: boolean; user: User; isNewUser: boolean }> => {
    setAuthLoading(true);
    try {
      console.log('Sending auth code to backend:', authCode);
      
      const response = await apiService.signInWithGoogle(authCode);
      console.log('Backend response:', response);

      if (response.success && response.data) {
        const authData = response.data as AuthResponse;
        
        // Store auth data in cookies
        setCookie('auth_token', authData.token, 7);
        setCookie('user_data', encodeURIComponent(JSON.stringify(authData.user)), 7);
        
        // Update state
        setUser(authData.user);
        setProfile(authData.user);
        
        console.log('Authentication successful:', authData.user);
        
        return { 
          success: true, 
          user: authData.user, 
          isNewUser: authData.is_new_user 
        };
      } else {
        console.error('Authentication failed:', response);
        throw new Error(response.error || 'Authentication failed');
      }
    } catch (error) {
      console.error('Error during Google sign-in:', error);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const signOut = (): void => {
    deleteCookie('auth_token');
    deleteCookie('user_data');
    setUser(null);
    setProfile(null);
    console.log('User signed out successfully');
  };

  const updateProfile = async (profileData: Partial<User>): Promise<{ success: boolean }> => {
    try {
      const token = getCookie('auth_token');
      if (!token) throw new Error('No auth token found');

      const response = await apiService.updateProfile(profileData);

      if (response.success) {
        // Refresh profile data from server
        await refreshProfile();
        return { success: true };
      } else {
        throw new Error(response.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const getAuthHeader = (): string | null => {
    const token = getCookie('auth_token');
    return token ? `Bearer ${token}` : null;
  };

  const value: AuthContextType = {
    user,
    profile,
    loading,
    authLoading,
    signInWithGoogle,
    signOut,
    updateProfile,
    getAuthHeader,
    isAuthenticated: !!user,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// useAuth hook
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}