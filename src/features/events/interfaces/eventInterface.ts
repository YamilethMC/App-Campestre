export interface Event {
  id: string;
  name: string;
  description: string;
  date: string; // ISO string format
  time: string; // HH:MM format
  location: string;
  eventType: 'Deportivo' | 'Social' | 'Familiar' | 'Fitness' | 'Todos';
  availableSpots: number;
  totalSpots: number;
  registeredUsers: string[]; // Array of user IDs who registered
  image?: string;
}

export interface EventState {
  events: Event[];
  registeredEvents: string[];
  fetchEvents: () => void;
  registerForEvent: (eventId: string) => void;
  unregisterFromEvent: (eventId: string) => void;
  toggleReminder: (eventId: string) => void;
}

export interface EventCardProps {
  event: Event;
  isRegistered: boolean;
  onRegister: (eventId: string) => void;
  onUnregister: (eventId: string) => void;
  onToggleReminder: (eventId: string) => void;
}

export interface FilterSectionProps {
  selectedEventType: 'Todos' | 'Deportivo' | 'Social' | 'Familiar' | 'Fitness';
  onEventTypeChange: (type: 'Todos' | 'Deportivo' | 'Social' | 'Familiar' | 'Fitness') => void;
}