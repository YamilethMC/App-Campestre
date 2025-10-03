// Mock data for services
export const mockServices = [
  {
    id: 'tenis',
    name: 'Tenis',
    description: 'Canchas y equipos para disfrutar del tenis',
    icon: 'tennisball-outline',
    color: '#10B981' // Verde
  },
  {
    id: 'golf',
    name: 'Golf',
    description: 'Campo de golf y equipamiento',
    icon: 'golf-outline',
    color: '#3B82F6' // Azul
  },
  {
    id: 'restaurante',
    name: 'Restaurante',
    description: 'Reserva de mesas y menú gourmet',
    icon: 'restaurant-outline',
    color: '#EF4444' // Rojo
  },
  {
    id: 'spa',
    name: 'Spa',
    description: 'Tratamientos y relajación',
    icon: 'water-outline',
    color: '#8B5CF6' // Púrpura
  },
  {
    id: 'gimnasio',
    name: 'Gimnasio',
    description: 'Equipos y clases de fitness',
    icon: 'barbell-outline',
    color: '#F59E0B' // Naranja
  },
  {
    id: 'lockers',
    name: 'Lockers',
    description: 'Almacenamiento seguro para pertenencias',
    icon: 'briefcase-outline',
    color: '#6B7280' // Gris
  }
];

// Mock data for tennis courts
export const mockTennisCourts = [
  { id: 'tc1', name: 'Cancha 1', available: true },
  { id: 'tc2', name: 'Cancha 2', available: true },
  { id: 'tc3', name: 'Cancha 3', available: false },
  { id: 'tc4', name: 'Cancha 4', available: true },
  { id: 'tc5', name: 'Cancha 5', available: false },
  { id: 'tc6', name: 'Cancha 6', available: true }
];

// Mock data for restaurant tables
export const mockRestaurantTables = [
  { id: 't1', name: 'Mesa 1', capacity: 2, available: true },
  { id: 't2', name: 'Mesa 2', capacity: 4, available: true },
  { id: 't3', name: 'Mesa 3', capacity: 6, available: false },
  { id: 't4', name: 'Mesa 4', capacity: 2, available: true },
  { id: 't5', name: 'Mesa 5', capacity: 8, available: true },
  { id: 't6', name: 'Mesa 6', capacity: 4, available: false },
  { id: 't7', name: 'Mesa 7', capacity: 6, available: true },
  { id: 't8', name: 'Mesa 8', capacity: 10, available: true }
];

// Mock data for time slots
export const mockTimeSlots = [
  '08:00', '08:30', '09:00', '09:30', 
  '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00'
];