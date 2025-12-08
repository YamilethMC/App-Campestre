// Interface for notification data
export interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  sentDate: string;
  active: boolean;
  visibleUntil: string;
  createdAt: string;
  updatedAt: string;
  image?: string; // Nueva propiedad para la imagen
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