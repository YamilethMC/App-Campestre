import { create } from 'zustand';
import { ReservationState, Reservation } from '../interfaces/reservation.interface';

export const useReservationStore = create<ReservationState>((set, get) => ({
  reservations: [],
  
  addReservation: (reservation: Reservation) => {
    set((state) => ({
      reservations: [...state.reservations, reservation]
    }));
  },
  
  updateReservation: (id: string, updatedReservation: Partial<Reservation>) => {
    set((state) => ({
      reservations: state.reservations.map(res => 
        res.id === id ? { ...res, ...updatedReservation } : res
      )
    }));
  },
  
  deleteReservation: (id: string) => {
    set((state) => ({
      reservations: state.reservations.filter(res => res.id !== id)
    }));
  },
  
  getReservationById: (id: string) => {
    return get().reservations.find(res => res.id === id);
  },
  
  getUserReservations: (userId: string) => {
    return get().reservations.filter(res => res.userId === userId);
  }
}));