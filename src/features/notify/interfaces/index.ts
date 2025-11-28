import { Notification } from '../services';

export interface NotificationCardProps {
  notification: Notification;
}

export interface NotificationHeaderProps {
  title: string;
  subtitle?: string;
}

export interface NotificationFilterSectionProps {
  search: string;
  onSearchChange: (search: string) => void;
}