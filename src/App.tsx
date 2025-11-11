// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth, AuthProvider } from './hooks/useAuth';
import { LoadingSpinner } from './components/UI/LoadingSpinner';
import { Navbar } from './components/Layout/Navbar';
import { Bootcamp } from './components/Devcamp/Devcamp';
import { Chatbot } from './components/UI/Chatbot';
import { LoginPage } from './components/Auth/LoginPage';
import { Dashboard } from './components/Dashboard/Dashboard';
import { ProfilePage } from './components/Profile/ProfilePage';
import { TasksPage } from './components/Tasks/TasksPage';
import { LeaderboardPage } from './components/Leaderboard/LeaderboardPage';
import { ForumPage } from './components/Forum/ForumPage';
import { ResourcesPage } from './components/Resources/ResourcesPage';
import { VideosPage } from './components/Videos/VideosPage';
import { AdminPanel } from './components/Admin/AdminPanel';
import { ShowcasePage } from './components/Showcase/ShowcasePage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';

// Main App Routes Component (needs to be inside Router AND AuthProvider)
function AppRoutes(): JSX.Element {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  // Pages where chatbot should not appear
  const excludedPaths = ['/login', '/auth', '/register', '/', '/bootcamp', '/devcamp'];
  const shouldShowChatbot = user && !excludedPaths.includes(location.pathname);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Show navbar for authenticated users */}
      {user && <Navbar />}
      
      <main className="flex-1">
        <Routes>
          {/* Public routes */}
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected routes */}
          {user ? (
            <>
              <Route path="/bootcamp" element={<Bootcamp />} />
              <Route path="/devcamp" element={<Bootcamp />} /> {/* Redirect old path */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/videos" element={<VideosPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/forum" element={<ForumPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/showcase" element={<ShowcasePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              {profile?.role === 'admin' && (
                <Route path="/admin" element={<AdminPanel />} />
              )}
              <Route path="*" element={<Navigate to="/bootcamp" replace />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </main>

      {/* Add Chatbot to all authenticated pages except login */}
      {shouldShowChatbot && <Chatbot />}
    </div>
  );
}

// Main App Component
function App(): JSX.Element {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;