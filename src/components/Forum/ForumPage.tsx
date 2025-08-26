import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { apiService } from '../../lib/api';
import { MessageSquare, Send } from 'lucide-react';
import { LoadingSpinner } from '../UI/LoadingSpinner';

interface Forum {
  id: string;
  title: string;
  description?: string;
  team_id?: string;
  creator?: { full_name: string };
}

interface ForumComment {
  id: string;
  forum_id: string;
  user_id: string;
  content: string;
  created_at: string;
  user?: { full_name: string };
}

export function ForumPage() {
  const { user } = useAuth();
  const [forums, setForums] = useState<Forum[]>([]);
  const [selectedForum, setSelectedForum] = useState<Forum | null>(null);
  const [comments, setComments] = useState<ForumComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [sending, setSending] = useState(false);

  // Fetch forums
  useEffect(() => {
    fetchForums();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedForum) {
      fetchComments(selectedForum.id);
    }
  }, [selectedForum]);

  const fetchForums = async () => {
    try {
      const res = await apiService.getForums(user?.team_id);
      if (!res.success) throw new Error(res.error);
      const items = (res.data || []).map((f: any) => ({ ...f, id: f.id || f._id }));
      setForums(items);
      if (items.length && !selectedForum) setSelectedForum(items[0]);
    } catch (e) {
      console.error('Error fetching forums:', e);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async (forumId: string) => {
    try {
      const res = await apiService.getForumComments(forumId);
      if (!res.success) throw new Error(res.error);
      const items = (res.data || []).map((c: any) => ({ ...c, id: c.id || c._id }));
      setComments(items);
    } catch (e) {
      console.error('Error fetching comments:', e);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || !selectedForum || !user) return;

    // optimistic comment
    const temp: ForumComment = {
      id: `temp-${Date.now()}`,
      forum_id: selectedForum.id,
      user_id: user.id,
      content: newComment.trim(),
      created_at: new Date().toISOString(),
      user: { full_name: user.name || user.full_name || 'User' },
    };
    setComments((prev) => [...prev, temp]);
    setNewComment('');
    setSending(true);

    try {
      const res = await apiService.createForumComment(selectedForum.id, {
        content: temp.content,
        user_id: user.id,
        full_name: user.name || user.full_name,
      });
      if (res.success && res.data) {
        const saved = { ...res.data, id: res.data.id || res.data._id };
        setComments((prev) => prev.map((c) => (c.id === temp.id ? saved : c)));
      } else {
        throw new Error(res.error);
      }
    } catch (e) {
      console.error('Error adding comment:', e);
      // rollback
      setComments((prev) => prev.filter((c) => c.id !== temp.id));
      setNewComment(temp.content);
    } finally {
      setSending(false);
    }
  };

  // Auto scroll comments
  useEffect(() => {
    const container = document.getElementById('comments-container');
    if (container) container.scrollTop = container.scrollHeight;
  }, [comments]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Forums</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Discuss with your peers</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-white/10 p-4">
              <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Forums</h2>
              <div className="space-y-2">
                {forums.length ? (
                  forums.map((forum) => (
                    <button
                      key={forum.id}
                      onClick={() => setSelectedForum(forum)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedForum?.id === forum.id
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <h3 className="font-medium truncate">{forum.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {forum.description}
                      </p>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">No forums yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main */}
          <div className="lg:col-span-3">
            {selectedForum ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-white/10">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 dark:border-white/10">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {selectedForum.title}
                  </h2>
                  {selectedForum.description && (
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {selectedForum.description}
                    </p>
                  )}
                </div>

                {/* Comments */}
                <div id="comments-container" className="max-h-96 overflow-y-auto p-6 space-y-4">
                  {comments.length ? (
                    comments.map((c) => (
                      <div
                        key={c.id}
                        className="border border-gray-200 dark:border-white/10 rounded-lg p-4"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm font-medium">
                              {c.user?.full_name?.charAt(0) || 'U'}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-gray-900 dark:text-gray-100">
                                {c.user?.full_name || 'Anonymous'}
                              </span>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {new Date(c.created_at).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                              {c.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <MessageSquare className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                      <p className="text-gray-500 dark:text-gray-400">
                        No comments yet. Be the first to comment!
                      </p>
                    </div>
                  )}
                </div>

                {/* New comment composer */}
                <div className="px-6 py-4 border-t border-gray-200 dark:border-white/10">
                  <div className="flex space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-medium">
                        {user?.name?.charAt(0) || user?.full_name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                      <div className="flex justify-end mt-2">
                        <button
                          onClick={handleAddComment}
                          disabled={!newComment.trim() || sending}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
                        >
                          {sending ? (
                            <LoadingSpinner size="small" />
                          ) : (
                            <Send className="w-4 h-4" />
                          )}
                          <span>Post</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-white/10 p-12 text-center">
                <MessageSquare className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Select a Forum
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose a forum from the sidebar to start discussing.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
