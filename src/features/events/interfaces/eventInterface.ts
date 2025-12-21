export interface Event {
  id: string;
  name: string;
  description: string;
  date: string; // Formatted string for display
  time: string; // HH:MM format
  location: string;
  eventType:
    | 'SOCIAL'
    | 'SPORT'
    | 'FAMILY'
    | 'OTHER'
    | 'Deportivo'
    | 'Social'
    | 'Familiar'
    | 'Fitness'
    | 'Todos'; // Keeping both for compatibility
  availableSpots: number;
  totalSpots: number;
  ocupedSpots: number; // Number of occupied spots
  isRegistered: boolean; // Array of user IDs who registered
  image?: string;
  inscritedShow?: boolean; // Whether to show registration count
  progressShow?: boolean; // Whether to show progress bar
}

export interface EventState {
  // State
  events: Event[];
  loading: boolean;
  error: string | null;
  selectedEvent: Event | null;
  reminders: string[];

  // Actions
  fetchEvents: () => Promise<void>;
  getEventById: (id: string) => Promise<Event | undefined>;
  registerForEvent: (eventId: string, userId: string) => Promise<void>;
  unregisterFromEvent: (eventId: string, userId: string) => Promise<void>;
  toggleReminder: (eventId: string) => void;
  isUserRegistered: (eventId: string, userId: string) => Promise<boolean>;
}

export interface EventCardProps {
  event: Event;
  isRegistered: boolean;
  onRegister?: (eventId: string) => void;
  onUnregister?: (eventId: string) => void;
  onToggleReminder?: (eventId: string) => void;
  onOpenRegisterScreen?: (eventId: string) => void;
}

export interface FilterSectionProps {
  selectedEventType:
    | 'Todos'
    | 'Deportivo'
    | 'Social'
    | 'Familiar'
    | 'Fitness'
    | 'SPORT'
    | 'SOCIAL'
    | 'FAMILY'
    | 'OTHER';
  onEventTypeChange: (type: 'Todos' | 'SPORT' | 'SOCIAL' | 'FAMILY' | 'OTHER') => void;
}

export interface Guest {
  id: number;
  name: string;
  lastName: string;
}

export interface Member {
  id: number;
  memberCode: number | null;
  name: string;
  lastName: string;
  guests: Guest[];
}
