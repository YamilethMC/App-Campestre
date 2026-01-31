// store/useEventStore.ts
import { create } from 'zustand';
import { Event } from '../interfaces/eventInterface';

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

interface EventState {
  events: Event[];
  loading: boolean;
  refreshing: boolean; // For background refresh indicator
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
  
  // Cache management
  lastFetchedAt: number | null;
  cacheKey: string | null; // To track which filter combination was last fetched
  
  // Advanced filters
  availableOnly: boolean;
  popularitySort: 'none' | 'asc' | 'desc';
  startDateFilter: string | null;
  endDateFilter: string | null;

  // Actions
  setEvents: (events: Event[]) => void;
  setLoading: (loading: boolean) => void;
  setRefreshing: (refreshing: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedEvent: (event: Event | null) => void;
  setPagination: (pagination: { page: number; limit: number; total: number; totalPages: number }) => void;
  setSearchQuery: (search: string) => void;
  setSelectedEventType: (type: 'Todos' | 'SPORT' | 'SOCIAL' | 'FAMILY' | 'OTHER') => void;
  setSelectedDate: (date: string) => void;
  updateEvent: (eventId: string, updates: Partial<Event>) => void;
  addEvents: (newEvents: Event[]) => void;
  resetEvents: () => void;
  
  // Cache actions
  markFetched: () => void;
  isCacheValid: () => boolean;
  getCacheKey: () => string;
  
  // Advanced filter actions
  setAvailableOnly: (value: boolean) => void;
  setPopularitySort: (value: 'none' | 'asc' | 'desc') => void;
  setDateRange: (start: string | null, end: string | null) => void;
  resetFilters: () => void;
}

export const useEventStore = create<EventState>((set, get) => ({
  events: [],
  loading: false,
  refreshing: false,
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
  
  // Cache management
  lastFetchedAt: null,
  cacheKey: null,
  
  // Advanced filters
  availableOnly: false,
  popularitySort: 'none',
  startDateFilter: null,
  endDateFilter: null,

  setEvents: (events) => set({ events }),
  setLoading: (loading) => set({ loading }),
  setRefreshing: (refreshing) => set({ refreshing }),
  setError: (error) => set({ error }),
  setSelectedEvent: (selectedEvent) => set({ selectedEvent }),
  setPagination: (pagination) => set({ pagination }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedEventType: (selectedEventType) => set({ selectedEventType }),
  setSelectedDate: (selectedDate) => set({ selectedDate }),
  resetEvents: () => set({ 
    events: [], 
    pagination: { page: 1, limit: 10, total: 0, totalPages: 1 },
    lastFetchedAt: null,
    cacheKey: null
  }),

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
    }),
    
  // Cache management actions
  markFetched: () => set({ 
    lastFetchedAt: Date.now(),
    cacheKey: get().getCacheKey()
  }),
  
  isCacheValid: () => {
    const state = get();
    if (!state.lastFetchedAt || !state.cacheKey) return false;
    
    const currentCacheKey = state.getCacheKey();
    if (currentCacheKey !== state.cacheKey) return false;
    
    const elapsed = Date.now() - state.lastFetchedAt;
    return elapsed < CACHE_DURATION;
  },
  
  getCacheKey: () => {
    const state = get();
    return `${state.searchQuery}-${state.selectedEventType}-${state.selectedDate}-${state.pagination.page}-${state.availableOnly}-${state.popularitySort}-${state.startDateFilter}-${state.endDateFilter}`;
  },
  
  // Advanced filter actions
  setAvailableOnly: (availableOnly) => set({ availableOnly }),
  setPopularitySort: (popularitySort) => set({ popularitySort }),
  setDateRange: (startDateFilter, endDateFilter) => set({ startDateFilter, endDateFilter }),
  resetFilters: () => set({
    searchQuery: '',
    selectedEventType: 'Todos',
    selectedDate: new Date().toISOString().slice(0, 7),
    availableOnly: false,
    popularitySort: 'none',
    startDateFilter: null,
    endDateFilter: null,
    pagination: { page: 1, limit: 10, total: 0, totalPages: 1 }
  })
}));