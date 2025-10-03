export interface Reservation {
  id: string;
  userId: string;
  serviceId: string;
  serviceName: string;
  date: string; // Formato: YYYY-MM-DD
  time: string; // Formato: HH:MM
  details?: any; // Detalles específicos del servicio (p. ej. cancha, número de personas, etc.)
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface ReservationState {
  reservations: Reservation[];
  addReservation: (reservation: Reservation) => void;
  updateReservation: (id: string, updatedReservation: Partial<Reservation>) => void;
  deleteReservation: (id: string) => void;
  getReservationById: (id: string) => Reservation | undefined;
  getUserReservations: (userId: string) => Reservation[];
}