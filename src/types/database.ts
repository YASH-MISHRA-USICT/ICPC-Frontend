export type UserRole = 'member' | 'admin' | 'mentor' | 'suspended';
export type TaskStatus = 'pending' | 'submitted' | 'approved' | 'rejected';
export type NotificationType = 'task_assigned' | 'task_reminder' | 'task_deadline' | 'mentorship' | 'general';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  student_id?: string;
  team_id?: string;
  role: UserRole;
  tasks_completed: number;
  tasks_missed_consecutive: number;
  last_team_switch?: string;
  join_date: string;
  total_points: number;
  created_at: string;
  updated_at: string;
  team?: Team;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  color: string;
  created_at: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  team_id: string;
  created_by: string;
  due_date: string;
  points: number;
  is_active: boolean;
  created_at: string;
  team?: Team;
  creator?: Profile;
}

export interface Submission {
  id: string;
  task_id: string;
  user_id: string;
  submission_url?: string;
  submission_text?: string;
  status: TaskStatus;
  feedback?: string;
  reviewed_by?: string;
  submitted_at: string;
  reviewed_at?: string;
  task?: Task;
  user?: Profile;
}

export interface Forum {
  id: string;
  team_id: string;
  title: string;
  description?: string;
  created_by: string;
  created_at: string;
  team?: Team;
  creator?: Profile;
}

export interface ForumPost {
  id: string;
  forum_id: string;
  user_id: string;
  content: string;
  parent_id?: string;
  created_at: string;
  user?: Profile;
}

export interface MentorshipRequest {
  id: string;
  requester_id: string;
  mentor_id?: string;
  topic: string;
  description?: string;
  status: string;
  created_at: string;
  resolved_at?: string;
  requester?: Profile;
  mentor?: Profile;
}

export interface Resource {
  id: string;
  title: string;
  description?: string;
  url: string;
  resource_type: string;
  team_id?: string;
  difficulty_level: string;
  created_by: string;
  created_at: string;
  team?: Team;
  creator?: Profile;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  is_read: boolean;
  created_at: string;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_name: string;
  badge_description?: string;
  earned_at: string;
}

export interface ShowcaseProject {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  project_url?: string;
  image_url?: string;
  tech_stack?: string[];
  is_featured: boolean;
  created_at: string;
  user?: Profile;
}