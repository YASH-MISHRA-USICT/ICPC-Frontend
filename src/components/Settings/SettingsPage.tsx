import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { 
  Settings, 
  Moon, 
  Sun, 
  Bell, 
  Shield, 
  User, 
  Save,
  Monitor
} from 'lucide-react';
import { LoadingSpinner } from '../UI/LoadingSpinner';

export function SettingsPage() {
  const { profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [notifications, setNotifications] = useState({
    taskReminders: true,
    teamUpdates: true,
    mentorshipRequests: true,
    weeklyDigest: true,
  });
  const [privacy, setPrivacy] = useState({
    showProfile: true,
    showProgress: true,
    showBadges: true,
  });

  useEffect(() => {
    loadSettings();
    // Apply saved theme on component mount
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' || 'system';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const loadSettings = async () => {
    try {
      // Load theme from localStorage
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' || 'system';
      setTheme(savedTheme);

      // Load other settings from localStorage or database
      const savedNotifications = localStorage.getItem('notifications');
      if (savedNotifications) {
        setNotifications(JSON.parse(savedNotifications));
      }

      const savedPrivacy = localStorage.getItem('privacy');
      if (savedPrivacy) {
        setPrivacy(JSON.parse(savedPrivacy));
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const applyTheme = (newTheme: 'light' | 'dark' | 'system') => {
    const root = document.documentElement;
    
    if (newTheme === 'system') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', systemPrefersDark);
    } else {
      root.classList.toggle('dark', newTheme === 'dark');
    }
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      // Save to localStorage
      localStorage.setItem('notifications', JSON.stringify(notifications));
      localStorage.setItem('privacy', JSON.stringify(privacy));
      
      // You could also save to Supabase if you want server-side storage
      // await supabase.from('user_settings').upsert({
      //   user_id: profile?.id,
      //   notifications,
      //   privacy,
      // });

      // Show success message (you could add a toast notification here)
      console.log('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Customize your Innoverse experience
          </p>
        </div>

        <div className="space-y-8">
          {/* Appearance Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                <Monitor className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Appearance</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Theme
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => handleThemeChange('light')}
                    className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-all ${
                      theme === 'light'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <Sun className="w-4 h-4" />
                    <span className="text-sm font-medium">Light</span>
                  </button>

                  <button
                    onClick={() => handleThemeChange('dark')}
                    className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-all ${
                      theme === 'dark'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <Moon className="w-4 h-4" />
                    <span className="text-sm font-medium">Dark</span>
                  </button>

                  <button
                    onClick={() => handleThemeChange('system')}
                    className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-all ${
                      theme === 'system'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <Monitor className="w-4 h-4" />
                    <span className="text-sm font-medium">System</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
                <Bell className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Notifications</h2>
            </div>

            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {key === 'taskReminders' && 'Task Reminders'}
                      {key === 'teamUpdates' && 'Team Updates'}
                      {key === 'mentorshipRequests' && 'Mentorship Requests'}
                      {key === 'weeklyDigest' && 'Weekly Digest'}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {key === 'taskReminders' && 'Get notified about upcoming task deadlines'}
                      {key === 'teamUpdates' && 'Receive updates about your team activities'}
                      {key === 'mentorshipRequests' && 'Notifications for mentorship requests'}
                      {key === 'weeklyDigest' && 'Weekly summary of your progress'}
                    </p>
                  </div>
                  <button
                    onClick={() => setNotifications(prev => ({ ...prev, [key]: !value }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
                <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Privacy</h2>
            </div>

            <div className="space-y-4">
              {Object.entries(privacy).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {key === 'showProfile' && 'Show Profile'}
                      {key === 'showProgress' && 'Show Progress'}
                      {key === 'showBadges' && 'Show Badges'}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {key === 'showProfile' && 'Make your profile visible to other users'}
                      {key === 'showProgress' && 'Display your progress on leaderboards'}
                      {key === 'showBadges' && 'Show your earned badges publicly'}
                    </p>
                  </div>
                  <button
                    onClick={() => setPrivacy(prev => ({ ...prev, [key]: !value }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-red-100 dark:bg-red-900 p-2 rounded-lg">
                <User className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Account</h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Account Information</h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p><span className="font-medium">Email:</span> {profile?.email}</p>
                  <p><span className="font-medium">Name:</span> {profile?.full_name}</p>
                  <p><span className="font-medium">Role:</span> {profile?.role}</p>
                  <p><span className="font-medium">Team:</span> {profile?.team?.name || 'Not assigned'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSaveSettings}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              {loading ? (
                <LoadingSpinner size="small" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>Save Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}