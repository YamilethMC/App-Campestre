import { create } from 'zustand';
import { Event, EventState } from '../interfaces/event.interface';

// Mock data for events across multiple months
const mockEvents: Event[] = [
  // October 2025
  {
    id: '1',
    name: 'Torneo de Tenis Dobles',
    description: 'Disfruta de un emocionante torneo de tenis en las canchas del club. ¡Trae a tu pareja y diviértanse juntos!',
    date: '2025-10-14',
    time: '09:00',
    location: 'Canchas de Tenis',
    eventType: 'Deportivo',
    availableSpots: 24,
    totalSpots: 32,
    registeredUsers: Array.from({ length: 8 }, (_, i) => `user${i + 1}`),
  },
  {
    id: '2',
    name: 'Cena de Gala Primavera',
    description: 'Evento exclusivo para socios con cena gourmet y música en vivo.',
    date: '2025-10-18',
    time: '19:30',
    location: 'Salón Principal',
    eventType: 'Social',
    availableSpots: 15,
    totalSpots: 40,
    registeredUsers: Array.from({ length: 25 }, (_, i) => `user${i + 10}`),
  },
  {
    id: '3',
    name: 'Día de Campo Familiar',
    description: 'Diversión para toda la familia con actividades recreativas, juegos y comida.',
    date: '2025-10-25',
    time: '10:00',
    location: 'Área de Pícnic',
    eventType: 'Familiar',
    availableSpots: 35,
    totalSpots: 50,
    registeredUsers: Array.from({ length: 15 }, (_, i) => `user${i + 20}`),
  },
  {
    id: '4',
    name: 'Maratón de Yoga',
    description: 'Sesión intensiva de yoga al aire libre para todos los niveles.',
    date: '2025-10-08',
    time: '07:00',
    location: 'Patio Central',
    eventType: 'Fitness',
    availableSpots: 42,
    totalSpots: 50,
    registeredUsers: Array.from({ length: 8 }, (_, i) => `user${i + 30}`),
  },
  
  // November 2025
  {
    id: '5',
    name: 'Campeonato de Golf',
    description: 'Participa en el campeonato anual de golf en nuestro hermoso campo de 18 hoyos.',
    date: '2025-11-05',
    time: '08:00',
    location: 'Campo de Golf',
    eventType: 'Deportivo',
    availableSpots: 28,
    totalSpots: 36,
    registeredUsers: Array.from({ length: 8 }, (_, i) => `user${i + 40}`),
  },
  {
    id: '6',
    name: 'Fiesta de Disfraces',
    description: 'Viste tu mejor disfraz y únete a la divertida fiesta de disfraces del club.',
    date: '2025-11-30',
    time: '20:00',
    location: 'Salón Principal',
    eventType: 'Social',
    availableSpots: 45,
    totalSpots: 60,
    registeredUsers: Array.from({ length: 15 }, (_, i) => `user${i + 50}`),
  },
  {
    id: '7',
    name: 'Torneo de Fútbol Infantil',
    description: 'Participa con tus hijos en este divertido torneo para niños de 6 a 12 años.',
    date: '2025-11-15',
    time: '09:30',
    location: 'Cancha de Fútbol',
    eventType: 'Familiar',
    availableSpots: 30,
    totalSpots: 30,
    registeredUsers: Array.from({ length: 0 }, (_, i) => `user${i + 60}`), // Empty initially
  },
  {
    id: '8',
    name: 'Clase de CrossFit',
    description: 'Clase intensiva de CrossFit para mejorar tu condición física.',
    date: '2025-11-10',
    time: '06:00',
    location: 'Gimnasio',
    eventType: 'Fitness',
    availableSpots: 18,
    totalSpots: 25,
    registeredUsers: Array.from({ length: 7 }, (_, i) => `user${i + 70}`),
  },
  
  // December 2025
  {
    id: '9',
    name: 'Copa de Pádel Navideña',
    description: 'Torneo amistoso de pádel para celebrar la navidad.',
    date: '2025-12-20',
    time: '10:00',
    location: 'Canchas de Pádel',
    eventType: 'Deportivo',
    availableSpots: 16,
    totalSpots: 20,
    registeredUsers: Array.from({ length: 4 }, (_, i) => `user${i + 80}`),
  },
  {
    id: '10',
    name: 'Fiesta de Fin de Año',
    description: 'Cena de gala para celebrar el fin de año con música, cena y baile.',
    date: '2025-12-31',
    time: '21:00',
    location: 'Salón de Eventos',
    eventType: 'Social',
    availableSpots: 65,
    totalSpots: 80,
    registeredUsers: Array.from({ length: 15 }, (_, i) => `user${i + 90}`),
  },
  {
    id: '11',
    name: 'Día de la Familia en el Club',
    description: 'Actividades recreativas y deportivas para disfrutar en familia.',
    date: '2025-12-06',
    time: '11:00',
    location: 'Área recreativa',
    eventType: 'Familiar',
    availableSpots: 50,
    totalSpots: 60,
    registeredUsers: Array.from({ length: 10 }, (_, i) => `user${i + 100}`),
  },
  {
    id: '12',
    name: 'Retiro de Meditación',
    description: 'Encuentro para practicar meditación y mindfulness en un ambiente relajante.',
    date: '2025-12-12',
    time: '08:00',
    location: 'Jardín Zen',
    eventType: 'Fitness',
    availableSpots: 22,
    totalSpots: 25,
    registeredUsers: Array.from({ length: 3 }, (_, i) => `user${i + 110}`),
  },
  
  // January 2026
  {
    id: '13',
    name: 'Torneo de Natación',
    description: 'Competencia de natación en las piscinas del club.',
    date: '2026-01-17',
    time: '07:30',
    location: 'Piscina Principal',
    eventType: 'Deportivo',
    availableSpots: 32,
    totalSpots: 40,
    registeredUsers: Array.from({ length: 8 }, (_, i) => `user${i + 120}`),
  },
  {
    id: '14',
    name: 'Noche de Juegos de Mesa',
    description: 'Reunión para disfrutar de juegos de mesa con otras familias del club.',
    date: '2026-01-24',
    time: '18:00',
    location: 'Sala de Juegos',
    eventType: 'Social',
    availableSpots: 12,
    totalSpots: 20,
    registeredUsers: Array.from({ length: 8 }, (_, i) => `user${i + 130}`),
  },
  {
    id: '15',
    name: 'Campamento Infantil de Invierno',
    description: 'Campamento recreativo para niños durante las vacaciones escolares.',
    date: '2026-01-05',
    time: '08:00',
    location: 'Área recreativa',
    eventType: 'Familiar',
    availableSpots: 25,
    totalSpots: 30,
    registeredUsers: Array.from({ length: 5 }, (_, i) => `user${i + 140}`),
  },
  {
    id: '16',
    name: 'Clase de Pilates',
    description: 'Sesión de Pilates para mejorar la postura y fortalecer el core.',
    date: '2026-01-14',
    time: '17:00',
    location: 'Sala de Yoga',
    eventType: 'Fitness',
    availableSpots: 15,
    totalSpots: 20,
    registeredUsers: Array.from({ length: 5 }, (_, i) => `user${i + 150}`),
  },
  
  // February 2026
  {
    id: '17',
    name: 'Maratón de Running',
    description: 'Carrera de 10K por las instalaciones del club y alrededores.',
    date: '2026-02-08',
    time: '06:30',
    location: 'Club y alrededores',
    eventType: 'Deportivo',
    availableSpots: 60,
    totalSpots: 100,
    registeredUsers: Array.from({ length: 40 }, (_, i) => `user${i + 160}`),
  },
  {
    id: '18',
    name: 'Fiesta de Carnaval',
    description: 'Celebra el carnaval con disfraces, música y comida típica.',
    date: '2026-02-15',
    time: '19:00',
    location: 'Salón Principal',
    eventType: 'Social',
    availableSpots: 48,
    totalSpots: 70,
    registeredUsers: Array.from({ length: 22 }, (_, i) => `user${i + 170}`),
  },
  {
    id: '19',
    name: 'Día de la Mascota',
    description: 'Trae a tu mascota y disfruta de actividades especiales para mascotas.',
    date: '2026-02-22',
    time: '10:00',
    location: 'Área de Pícnic',
    eventType: 'Familiar',
    availableSpots: 30,
    totalSpots: 40,
    registeredUsers: Array.from({ length: 10 }, (_, i) => `user${i + 180}`),
  },
  {
    id: '20',
    name: 'Taller de Zumba',
    description: 'Clase especial de Zumba para quemar calorías y divertirse.',
    date: '2026-02-28',
    time: '16:00',
    location: 'Gimnasio',
    eventType: 'Fitness',
    availableSpots: 28,
    totalSpots: 35,
    registeredUsers: Array.from({ length: 7 }, (_, i) => `user${i + 190}`),
  },
];

export const useEventStore = create<EventState>((set, get) => ({
  events: mockEvents,
  registeredEvents: [],

  fetchEvents: () => {
    // In a real app, this would fetch from an API
    // For now, we'll just return the mock data
    return;
  },

  registerForEvent: (eventId: string) => {
    set((state) => {
      const eventIndex = state.events.findIndex(event => event.id === eventId);
      if (eventIndex !== -1 && state.events[eventIndex].availableSpots > 0) {
        const updatedEvents = [...state.events];
        updatedEvents[eventIndex] = {
          ...updatedEvents[eventIndex],
          availableSpots: updatedEvents[eventIndex].availableSpots - 1,
          registeredUsers: [...updatedEvents[eventIndex].registeredUsers, 'current_user'],
        };
        
        return {
          events: updatedEvents,
          registeredEvents: [...state.registeredEvents, eventId]
        };
      }
      return state;
    });
  },

  unregisterFromEvent: (eventId: string) => {
    set((state) => {
      const eventIndex = state.events.findIndex(event => event.id === eventId);
      if (eventIndex !== -1) {
        const updatedEvents = [...state.events];
        updatedEvents[eventIndex] = {
          ...updatedEvents[eventIndex],
          availableSpots: updatedEvents[eventIndex].availableSpots + 1,
          registeredUsers: updatedEvents[eventIndex].registeredUsers.filter(id => id !== 'current_user'),
        };
        
        return {
          events: updatedEvents,
          registeredEvents: state.registeredEvents.filter(id => id !== eventId)
        };
      }
      return state;
    });
  },

  toggleReminder: (eventId: string) => {
    // In a real app, this would set a reminder for the event
    // For now, we'll just log the action
    console.log(`Reminder toggled for event ${eventId}`);
  }
}));