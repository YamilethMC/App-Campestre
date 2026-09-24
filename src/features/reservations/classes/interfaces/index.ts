/**
 * Tipos del módulo de Clases.
 *
 * Siguen el "Modelo mínimo de datos sugerido" (§6 de la Especificación de Datos
 * y Reglas Funcionales v1.0): Discipline, Professional, RecurringSchedule,
 * PriceRule y Booking. En esta etapa viven en el cliente con datos simulados;
 * al conectar el backend (Fase 2) se sustituye el origen, no la forma.
 */

/** Día de la semana tal como lo devuelve Date.getDay(): 0 = domingo. */
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/** Horas reservables ("Particulares") por día de la semana, en formato HH:MM. */
export type WeeklySchedule = Record<Weekday, string[]>;

export interface Discipline {
  id: string;
  name: string;
  /** Nombre de ícono de @expo/vector-icons (Ionicons). */
  icon: string;
  /** Inactiva = el Club aún no entrega profesionales ni horarios para ella. */
  active: boolean;
}

export interface Professional {
  id: string;
  disciplineId: string;
  displayName: string;
  /** Credencial o especialidad; opcional según §3 de la infografía. */
  credential?: string;
  /** Foto oficial: pendiente de entrega del Club (§10). Sin ella se muestran iniciales. */
  photoUrl?: string;
  active: boolean;
  weeklySchedule: WeeklySchedule;
}

export interface PriceRule {
  partySize: number;
  price: number;
}

export interface ClassBooking {
  id: string;
  disciplineId: string;
  disciplineName: string;
  professionalId: string;
  professionalName: string;
  /** Fecha local en formato YYYY-MM-DD. */
  date: string;
  /** Hora de inicio en formato HH:MM. */
  startTime: string;
  partySize: number;
  /**
   * Precio congelado al momento de reservar (§9: "guardar price_snapshot"),
   * para que un cambio de tarifa no altere reservas ya creadas.
   */
  priceSnapshot: number;
  createdAt: string;
}
