import { create } from 'zustand';
import { ClassBooking } from '../interfaces';

/**
 * Reservas de clase confirmadas.
 *
 * Mientras el backend no existe (Fase 2), esta tienda hace las veces de la tabla
 * Booking de §6: guarda las reservas del socio y permite que un horario ya
 * tomado deje de ofrecerse, que es la regla de "sin doble reserva" del §8.
 */
interface ClassBookingState {
  bookings: ClassBooking[];
  addBooking: (booking: ClassBooking) => void;
  cancelBooking: (id: string) => void;
  /** True si ese profesional ya tiene ese día y hora tomados. */
  isSlotTaken: (professionalId: string, date: string, startTime: string) => boolean;
}

export const useClassBookingStore = create<ClassBookingState>((set, get) => ({
  bookings: [],

  addBooking: (booking: ClassBooking) => {
    set((state) => ({ bookings: [...state.bookings, booking] }));
  },

  cancelBooking: (id: string) => {
    set((state) => ({ bookings: state.bookings.filter((b) => b.id !== id) }));
  },

  isSlotTaken: (professionalId: string, date: string, startTime: string) =>
    get().bookings.some(
      (b) =>
        b.professionalId === professionalId &&
        b.date === date &&
        b.startTime === startTime,
    ),
}));
