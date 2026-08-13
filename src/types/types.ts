export type UserRole = 'user' | 'manager' | 'admin';

export type BookingStatus = 'pending' | 'approved' | 'rejected' | 'cancelled' | 'completed';

export type BookingType = 'single' | 'multi_day';

export type NotificationType = 'booking_created' | 'booking_approved' | 'booking_rejected' | 'booking_cancelled';

export interface User {
  id: string;
  email: string | null;
  name: string | null;
  role: UserRole;
  language_preference?: string;
  created_at: string;
}

export interface Resource {
  id: string;
  name: string;
  description: string | null;
  location: string;
  capacity: number;
  availability_hours: Record<string, { start: string; end: string }>;
  booking_rules: Record<string, unknown>;
  created_by: string;
  created_at: string;
}

export interface Booking {
  id: string;
  resource_id: string;
  user_id: string;
  start_time: string;
  end_time: string;
  purpose: string;
  attendees: string[];
  status: BookingStatus;
  booking_type: BookingType;
  booking_group_id: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  resource?: Resource;
  user?: User;
  reviewer?: User;
}

export interface Notification {
  id: string;
  user_id: string;
  booking_id: string | null;
  type: NotificationType;
  message: string;
  read: boolean;
  created_at: string;
  booking?: Booking;
}

export interface BookingStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}
