import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Code2, 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Home,
  Users,
  BookOpen,
  Trophy,
  MessageSquare,
  Shield,
  Moon,
  Sun,
  Play as PlayIcon
} from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { apiService } from '../../lib/api';

interface Notification {
  id: string;
  message: string;
  created_at: string;
  read: boolean;
}

export function Navbar() {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  useEffect(() => {
    if (user) loadNotifications();
  }, [user]);

  const loadNotifications = async () => {
    try {
      const response = await apiService.getNotifications();
      if (response.success) {
        setNotifications(response.data || []);
        const unread = (response.data || []).filter((n: Notification) => !n.read).length;
        setUnreadCount(unread);
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const handleMarkNotificationRead = async (id: string) => {
    try {
      const res = await apiService.markNotificationRead(id);
      if (res.success) {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (e) {
      console.error('Error marking notification as read:', e);
    }
  };

  const navItems = [
    { name: 'Tasks', href: '/tasks', icon: BookOpen },
    { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
    { name: 'Forum', href: '/forum', icon: MessageSquare },
    { name: 'Resources', href: '/resources', icon: BookOpen },
    { name: 'Videos', href: '/videos', icon: PlayIcon },
  ];

  if (user?.role === 'admin') {
    navItems.push({ name: 'Admin', href: '/admin', icon: Shield });
  }

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/devcamp" className="flex items-center space-x-2">
              <img src="/logo.png" alt="Innovateai Logo" className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl" />
              <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 hidden xs:block">Innovate AI</span>
            </Link>
          </div>

          {user && (
            <>
              {/* Desktop nav - hidden on smaller screens */}
              <div className="hidden xl:flex items-center space-x-4 2xl:space-x-6">
                {navItems.map(item => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-2 py-2 text-sm font-medium rounded-lg transition-colors"
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="hidden 2xl:block">{item.name}</span>
                  </Link>
                ))}
              </div>

              {/* Tablet nav - shown on medium to large screens */}
              <div className="hidden md:flex xl:hidden items-center space-x-2">
                {navItems.slice(0, 4).map(item => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center justify-center p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors"
                    title={item.name}
                  >
                    <item.icon className="h-5 w-5" />
                  </Link>
                ))}
                {navItems.length > 4 && (
                  <div className="relative">
                    <button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="flex items-center justify-center p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors"
                    >
                      <Menu className="h-5 w-5" />
                    </button>
                    {isMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-lg shadow-lg py-1 z-50">
                        {navItems.slice(4).map(item => (
                          <Link
                            key={item.name}
                            to={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                          >
                            <item.icon className="h-4 w-4" />
                            <span>{item.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 sm:space-x-3">
                {/* Theme toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg transition-colors text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {theme === 'dark' ? <Sun className="h-4 w-4 sm:h-5 sm:w-5" /> : <Moon className="h-4 w-4 sm:h-5 sm:w-5" />}
                </button>

                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                    className="relative p-2 rounded-lg transition-colors text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-[10px] sm:text-xs">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </button>

                  {isNotificationOpen && (
                    <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-lg shadow-lg py-1 z-50 max-h-80 sm:max-h-96 overflow-y-auto">
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-white/10">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
                      </div>
                      {notifications.length === 0 ? (
                        <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                          No notifications
                        </div>
                      ) : (
                        notifications.slice(0, 10).map(n => (
                          <div
                            key={n.id}
                            onClick={() => handleMarkNotificationRead(n.id)}
                            className={`px-4 py-3 cursor-pointer transition-colors border-l-4 ${
                              n.read
                                ? 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-700'
                                : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            }`}
                          >
                            <p className="text-sm text-gray-900 dark:text-gray-100">{n.message}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {new Date(n.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        ))
                      )}
                      {notifications.length > 10 && (
                        <div className="px-4 py-2 border-t border-gray-200 dark:border-white/10">
                          <Link
                            to="/notifications"
                            onClick={() => setIsNotificationOpen(false)}
                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            View all notifications
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Profile */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 p-1 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center overflow-hidden">
                      {user.picture ? (
                        <img src={user.picture} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-white text-xs sm:text-sm font-medium">{user.name?.charAt(0) || 'U'}</span>
                      )}
                    </div>
                    <span className="hidden lg:block text-sm font-medium text-gray-700 dark:text-gray-300 max-w-24 truncate">
                      {user.name}
                    </span>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-44 sm:w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-lg shadow-lg py-1 z-50">
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-white/10">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Mobile menu button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                >
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile nav */}
      {isMenuOpen && user && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map(item => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-3 px-3 py-3 rounded-xl text-base font-semibold transition-colors text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Click outside */}
      {(isProfileOpen || isNotificationOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsProfileOpen(false);
            setIsNotificationOpen(false);
          }}
        />
      )}
    </nav>
  );
}
