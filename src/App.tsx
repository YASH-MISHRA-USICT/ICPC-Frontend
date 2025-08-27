// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth, AuthProvider } from './hooks/useAuth';
import { useTheme } from './hooks/useTheme';
import { Navbar } from './components/Layout/Navbar';
import { LoginPage } from './components/Auth/LoginPage';
import { Dashboard } from './components/Dashboard/Dashboard';
import { ProfilePage } from './components/Profile/ProfilePage';
import { TeamsPage } from './components/Teams/TeamsPage';
import { TasksPage } from './components/Tasks/TasksPage';
import { LeaderboardPage } from './components/Leaderboard/LeaderboardPage';
import { ForumPage } from './components/Forum/ForumPage';
import { ResourcesPage } from './components/Resources/ResourcesPage';
import { AdminPanel } from './components/Admin/AdminPanel';
import { ShowcasePage } from './components/Showcase/ShowcasePage';
import { MentorshipPage } from './components/Mentorship/MentorshipPage';
import { SettingsPage } from './components/Settings/SettingsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import { LoadingSpinner } from './components/UI/LoadingSpinner';
import { Analytics } from "@vercel/analytics/next"

// Main App Routes Component (needs to be inside AuthProvider)
function AppRoutes(): JSX.Element {
  const { user, profile, loading } = useAuth();
  const { theme } = useTheme(); // Initialize theme

  return (
    <Router>
      <Routes>
        {/* Public routes - accessible without authentication */}
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        
        {/* Protected routes */}
        <Route path="/*" element={
          loading ? (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
              <LoadingSpinner size="large" />
            </div>
          ) : !user ? (
            <LoginPage />
          ) : (
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <Analytics />
              <main>
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/teams" element={<TeamsPage />} />
                  <Route path="/tasks" element={<TasksPage />} />
                  <Route path="/leaderboard" element={<LeaderboardPage />} />
                  <Route path="/forum" element={<ForumPage />} />
                  <Route path="/resources" element={<ResourcesPage />} />
                  <Route path="/showcase" element={<ShowcasePage />} />
                  <Route path="/mentorship" element={<MentorshipPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  {profile?.role === 'admin' && (
                    <Route path="/admin" element={<AdminPanel />} />
                  )}
                  {/* Default redirect */}
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </main>
            </div>
          )
        } />
      </Routes>
    </Router>
  );
}

// Main App Component
function App(): JSX.Element {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;