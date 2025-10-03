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