// Interface for notification data
export interface Notification {
  id: number;
  notifyId?: number;        // Present for personal (member) notifications
  clubMemberId?: number;    // Present for personal (member) notifications
  title: string;
  message: string;
  type: string;
  sentDate?: string;
  active?: boolean;
  visibleUntil?: string;
  link?: string;            // Action link for personal notifications
  metadata?: Record<string, any>;
  read?: boolean;           // Only for personal notifications
  readAt?: string;          // Only for personal notifications
  createdAt: string;
  updatedAt?: string;
  image?: string;
}

// Interface for pagination metadata
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Interface for the API response
export interface NotificationResponse {
  success: boolean;
  data: {
    notifications: Notification[];
    meta: PaginationMeta;
  };
  timestamp: string;
  messageId: string;
  traceId: string;
}

// Interface for service response
export interface ServiceResponse {
  success: boolean;
  data?: {
    notifications: Notification[];
    meta: PaginationMeta;
  };
  message?: string;
  error?: string;
  status: number;
}

// Interface for notification card props
export interface NotificationCardProps {
  notification: Notification;
}

// Interface for search bar props
export interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}