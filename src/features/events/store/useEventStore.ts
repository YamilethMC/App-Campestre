// store/useEventStore.ts
import { create } from 'zustand';
import { Event } from '../interfaces/eventInterface';

interface EventState {
  events: Event[];
  loading: boolean;
  error: string | null;
  selectedEvent: Event | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  searchQuery: string;
  selectedEventType: 'Todos' | 'SPORT' | 'SOCIAL' | 'FAMILY' | 'OTHER';
  selectedDate: string; // format: 'yyyy-mm'

  // Actions
  setEvents: (events: Event[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedEvent: (event: Event | null) => void;
  setPagination: (pagination: any) => void;
  setSearchQuery: (search: string) => void;
  setSelectedEventType: (type: 'Todos' | 'SPORT' | 'SOCIAL' | 'FAMILY' | 'OTHER') => void;
  setSelectedDate: (date: string) => void;
  updateEvent: (eventId: string, updates: Partial<Event>) => void;
  addEvents: (newEvents: Event[]) => void;
  resetEvents: () => void;
}

export const useEventStore = create<EventState>(set => ({
  events: [],
  loading: false,
  error: null,
  selectedEvent: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  },
  searchQuery: '',
  selectedEventType: 'Todos',
  selectedDate: new Date().toISOString().slice(0, 7), // yyyy-mm format

  setEvents: events => set({ events }),
  setLoading: loading => set({ loading }),
  setError: error => set({ error }),
  setSelectedEvent: selectedEvent => set({ selectedEvent }),
  setPagination: pagination => set({ pagination }),
  setSearchQuery: searchQuery => set({ searchQuery }),
  setSelectedEventType: selectedEventType => set({ selectedEventType }),
  setSelectedDate: selectedDate => set({ selectedDate }),
  resetEvents: () =>
    set({ events: [], pagination: { page: 1, limit: 10, total: 0, totalPages: 1 } }),

  updateEvent: (eventId, updates) =>
    set(state => ({
      events: state.events.map(event => (event.id === eventId ? { ...event, ...updates } : event)),
    })),

  addEvents: newEvents =>
    set(state => {
      const existingIds = new Set(state.events.map(e => e.id));
      const uniqueNewEvents = newEvents.filter(e => !existingIds.has(e.id));
      return { events: [...state.events, ...uniqueNewEvents] };
    }),
}));
