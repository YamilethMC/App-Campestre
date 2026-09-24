/**
 * Tipos del módulo de Clases.
 *
 * Son el reflejo de lo que devuelve el backend (`/classes/...`), no una
 * estructura propia: si el contrato cambia, se cambia aquí y el compilador
 * señala todo lo que hay que ajustar.
 */

export interface Discipline {
  id: number;
  name: string;
  /** Nombre de ícono de @expo/vector-icons (Ionicons). */
  icon: string;
}

export interface Professional {
  id: number;
  displayName: string;
  /** Pendiente de entrega del Club; sin foto se muestran las iniciales. */
  photoUrl: string | null;
  /** Credencial o especialidad, opcional. */
  shortBio: string | null;
  discipline: { id: number; name: string };
}

/** Por qué un horario no se puede reservar. */
export type SlotUnavailableReason = 'BOOKED' | 'BLOCKED' | 'PAST';

export interface AvailabilitySlot {
  /** "HH:MM" en hora del club. */
  startTime: string;
  available: boolean;
  reason?: SlotUnavailableReason;
}

/** Ficha del profesional con su tarifa, sin depender de una fecha. */
export interface ProfessionalDetail extends Professional {
  prices: PriceRule[];
}

export interface PriceRule {
  partySize: number;
  price: number;
}

export interface Availability {
  /** "YYYY-MM-DD". */
  date: string;
  professional: {
    id: number;
    displayName: string;
    discipline: { id: number; name: string };
  };
  slots: AvailabilitySlot[];
  prices: PriceRule[];
}

export interface ClassBooking {
  id: number;
  /** Instante en el marco del club, tal como lo guarda el backend. */
  startsAt: string;
  partySize: number;
  /** Precio congelado al momento de reservar. */
  priceSnapshot: string | number;
  status: string;
  professional: { id: number; displayName: string; photoUrl: string | null };
  discipline: { id: number; name: string; icon: string };
}

export interface CreateBookingPayload {
  professionalId: number;
  /** "YYYY-MM-DD". */
  date: string;
  /** "HH:MM". */
  startTime: string;
  partySize: number;
}

/** Lo que devuelve cada llamada del servicio. */
export interface ServiceResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  status?: number;
}
