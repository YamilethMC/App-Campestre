// store/useEventStore.ts
import { create } from 'zustand';
import { Event } from '../interfaces/eventInterface';

interface EventState {
  events: Event[];
  loading: boolean;
  error: string | null;
  setEvents: (events: Event[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateEvent: (eventId: string, updates: Partial<Event>) => void;
  addEvents: (newEvents: Event[]) => void;
}

export const useEventStore = create<EventState>((set) => ({
  events: [],
  loading: false,
  error: null,

  setEvents: (events) => set({ events }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  updateEvent: (eventId, updates) => 
    set(state => ({
      events: state.events.map(event => 
        event.id === eventId ? { ...event, ...updates } : event
      )
    })),

  addEvents: (newEvents) => 
    set(state => {
      const existingIds = new Set(state.events.map(e => e.id));
      const uniqueNewEvents = newEvents.filter(e => !existingIds.has(e.id));
      return { events: [...state.events, ...uniqueNewEvents] };
    })
}));