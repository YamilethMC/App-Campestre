export interface CalendarComponentProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export interface ConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
}

interface Court {
  id: string;
  name: string;
  available: boolean;
}

export interface CourtSelectorProps {
  selectedCourt: string;
  onCourtChange: (courtId: string) => void;
  courts: Court[];
  unavailableMessage?: string;
}

export interface ServiceCardProps {
  service: {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
  };
  onPress: () => void;
}

export interface SummaryCardProps {
  serviceName: string;
  date: string;
  time: string;
  details: {
    court?: string;
    table?: string;
    partySize?: number;
    treatment?: string;
    equipment?: string;
  };
}

interface Table {
  id: string;
  name: string;
  capacity: number;
  available: boolean;
}

export interface TableSelectorProps {
  selectedTable: string;
  onTableChange: (tableId: string) => void;
  tables: Table[];
  unavailableMessage?: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

export interface TimeSlotsProps {
  selectedTime: string;
  onTimeChange: (time: string) => void;
  availableTimes: string[];
  selectedDate?: string; // Fecha seleccionada para deshabilitar horarios pasados
  unavailableMessage?: string;
}

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
