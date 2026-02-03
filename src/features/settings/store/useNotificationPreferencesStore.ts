import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface NotificationPreferences {
  // General toggle
  enabled: boolean;
  
  // Reminder timing (minutes before event)
  reservationReminder: number; // 15, 30, 60, 120 minutes
  eventReminder: number; // 15, 30, 60, 120, 1440 (1 day)
  
  // Notification types
  reservationNotifications: boolean;
  eventNotifications: boolean;
  surveyNotifications: boolean;
  promotionNotifications: boolean;
  
  // Frequency
  dailyDigest: boolean; // Receive a daily summary instead of individual notifications
  quietHoursEnabled: boolean;
  quietHoursStart: string; // "22:00"
  quietHoursEnd: string; // "08:00"
}

interface NotificationPreferencesState extends NotificationPreferences {
  // Actions
  setEnabled: (enabled: boolean) => void;
  setReservationReminder: (minutes: number) => void;
  setEventReminder: (minutes: number) => void;
  setReservationNotifications: (enabled: boolean) => void;
  setEventNotifications: (enabled: boolean) => void;
  setSurveyNotifications: (enabled: boolean) => void;
  setPromotionNotifications: (enabled: boolean) => void;
  setDailyDigest: (enabled: boolean) => void;
  setQuietHoursEnabled: (enabled: boolean) => void;
  setQuietHoursStart: (time: string) => void;
  setQuietHoursEnd: (time: string) => void;
  resetToDefaults: () => void;
}

const defaultPreferences: NotificationPreferences = {
  enabled: true,
  reservationReminder: 30,
  eventReminder: 60,
  reservationNotifications: true,
  eventNotifications: true,
  surveyNotifications: true,
  promotionNotifications: true,
  dailyDigest: false,
  quietHoursEnabled: false,
  quietHoursStart: '22:00',
  quietHoursEnd: '08:00',
};

export const useNotificationPreferencesStore = create<NotificationPreferencesState>()(
  persist(
    (set) => ({
      ...defaultPreferences,

      setEnabled: (enabled) => set({ enabled }),
      setReservationReminder: (reservationReminder) => set({ reservationReminder }),
      setEventReminder: (eventReminder) => set({ eventReminder }),
      setReservationNotifications: (reservationNotifications) => set({ reservationNotifications }),
      setEventNotifications: (eventNotifications) => set({ eventNotifications }),
      setSurveyNotifications: (surveyNotifications) => set({ surveyNotifications }),
      setPromotionNotifications: (promotionNotifications) => set({ promotionNotifications }),
      setDailyDigest: (dailyDigest) => set({ dailyDigest }),
      setQuietHoursEnabled: (quietHoursEnabled) => set({ quietHoursEnabled }),
      setQuietHoursStart: (quietHoursStart) => set({ quietHoursStart }),
      setQuietHoursEnd: (quietHoursEnd) => set({ quietHoursEnd }),
      resetToDefaults: () => set(defaultPreferences),
    }),
    {
      name: 'notification-preferences',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Reminder options for dropdowns
export const reminderOptions = [
  { label: '15 minutos antes', value: 15 },
  { label: '30 minutos antes', value: 30 },
  { label: '1 hora antes', value: 60 },
  { label: '2 horas antes', value: 120 },
  { label: '1 día antes', value: 1440 },
];

export const reservationReminderOptions = reminderOptions.slice(0, 4); // Exclude 1 day for reservations
export const eventReminderOptions = reminderOptions;
