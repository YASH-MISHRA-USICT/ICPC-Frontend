import React, { useEffect } from 'react';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { Code2, Users, Trophy, BookOpen, Sparkles } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from "react-router-dom";

// Google Sign-In Button Component
function GoogleSignInButton() {
  const { signInWithGoogle, loading } = useAuth();

  const googleLogin = useGoogleLogin({
    flow: 'auth-code', // This gives us the authorization code
    onSuccess: async (codeResponse) => {
      console.log('Authorization code received:', codeResponse.code);
      // Send the authorization code to our middleware
      await signInWithGoogle(codeResponse.code);
    },
    onError: (error) => {
      console.error('Google OAuth Error:', error);
    },
  });

  return (
    <button
      onClick={() => googleLogin()}
      disabled={loading}
      className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-gray-300 rounded-xl px-6 py-4 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      ) : (
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
      )}
      <span>{loading ? 'Signing in...' : 'Continue with Google'}</span>
    </button>
  );
}

export function LoginPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/devcamp", { replace: true });
    }
  }, [user, navigate]);

  const features = [
    {
      icon: Code2,
      title: 'Fundamental AI Learning',
      description: 'From basics to advanced your AI Journey starts here'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Connect with peers in your coding track and grow together'
    },
    {
      icon: Trophy,
      title: 'Weekly Challenges',
      description: 'Complete tasks, earn badges, and climb the leaderboard'
    },
    {
      icon: BookOpen,
      title: 'Learning Resources',
      description: 'Access curated resources tailored to your skill level'
    }
  ];

  return (
    <GoogleOAuthProvider clientId="807933972774-hlrmlpk5v7aac3tn9ppror2i3irigr7q.apps.googleusercontent.com">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left Panel - Hero Section */}
          <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
            <div className="max-w-md w-full">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <img
                    src="/logo.png"   // place logo.png inside public/
                    alt="ICPC Logo"
                    width={64}
                    height={64}
                    className="rounded-2xl"
                  />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Welcome to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ICPC</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Join ACM ICPC community and accelerate your AI journey
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                  Sign in to get started
                </h2>

                <div className="space-y-4">
                  {/* Google Sign In Button */}
                  <GoogleSignInButton />
                </div>

                <p className="text-sm text-gray-500 text-center mt-6">
                  Sign in with your college email if available, or continue with any account.
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel - Features */}
          <div className="lg:w-1/2 bg-white/50 backdrop-blur-sm p-8 lg:p-12 flex items-center">
            <div className="max-w-lg w-full">
              <div className="mb-8">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-4 py-2 mb-6">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Join 500+ Coders</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Everything you need to grow as a developer
                </h2>
                <p className="text-gray-600">
                  Connect, learn, and showcase your skills in a supportive community environment.
                </p>
              </div>

              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                <h3 className="font-semibold text-gray-900 mb-2">Ready to start coding?</h3>
                <p className="text-sm text-gray-600">
                  Join weekly challenges, earn badges, and build amazing projects with your peers.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Links */}
        <div className="py-6 bg-white/70 backdrop-blur-sm border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-gray-500">
            <a 
              href="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-700 transition-colors underline"
            >
              Privacy Policy
            </a>
            <span className="hidden sm:inline">•</span>
            <a 
              href="/terms-of-service"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-700 transition-colors underline"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}