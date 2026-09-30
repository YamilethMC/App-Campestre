import { useAuthStore } from '../../../auth/store/useAuthStore';
import { handleAuthError } from '../../../../shared/utils/authErrorHandler';
import {
  Availability,
  CancellationPreview,
  ClassBooking,
  CreateBookingPayload,
  Discipline,
  Professional,
  ProfessionalDetail,
  ServiceResult,
} from '../interfaces';

const BASE_URL = `${process.env.EXPO_PUBLIC_API_URL}/classes`;

/** Mensajes por código, para no enseñarle al socio un número de error. */
const errorFor = (status: number, fallback: string): string => {
  switch (status) {
    case 400:
      return 'Los datos de la reserva no son válidos';
    case 404:
      return 'No encontramos lo que buscabas';
    case 409:
      return 'Ese horario acaba de ser reservado por otro socio';
    case 500:
      return 'Error del servidor. Por favor intenta más tarde';
    default:
      return fallback;
  }
};

/**
 * Una sola puerta para hablar con el backend de Clases.
 *
 * Centraliza el token, el manejo de la sesión expirada y la forma de la
 * respuesta, en vez de repetir el mismo bloque de fetch en cada llamada.
 */
async function request<T>(path: string, init?: RequestInit): Promise<ServiceResult<T>> {
  const token = useAuthStore.getState().token;

  if (!token) {
    return { success: false, error: 'No hay sesión activa', status: 401 };
  }

  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...(init?.headers ?? {}),
      },
    });

    const text = await response.text();
    const body = text ? JSON.parse(text) : null;

    if (!response.ok) {
      // La sesión expirada se maneja aparte: saca al socio al login.
      if (response.status === 401) {
        handleAuthError();
        return { success: false, error: 'Tu sesión expiró', status: 401 };
      }

      const message = Array.isArray(body?.message) ? body.message[0] : body?.message;
      return {
        success: false,
        error: message || errorFor(response.status, 'No se pudo completar la operación'),
        status: response.status,
      };
    }

    // El backend envuelve todo en { success, data, timestamp, ... }
    return { success: true, data: body?.data as T, status: response.status };
  } catch {
    return { success: false, error: 'No se pudo conectar con el servidor' };
  }
}

export const classesService = {
  getDisciplines: () => request<Discipline[]>('/disciplines'),

  getProfessionals: (disciplineId: number) =>
    request<Professional[]>(`/disciplines/${disciplineId}/professionals`),

  getProfessional: (professionalId: number) =>
    request<ProfessionalDetail>(`/professionals/${professionalId}`),

  getAvailability: (professionalId: number, date: string) =>
    request<Availability>(`/professionals/${professionalId}/availability?date=${date}`),

  createBooking: (payload: CreateBookingPayload) =>
    request<ClassBooking>('/bookings', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getMyBookings: () => request<ClassBooking[]>('/bookings/me'),

  /** Qué costaría cancelar. Se pregunta antes de enseñarle el aviso al socio. */
  getCancellationPreview: (bookingId: number) =>
    request<CancellationPreview>(`/bookings/${bookingId}/cancellation-preview`),

  acceptReschedule: (bookingId: number) =>
    request<ClassBooking>(`/bookings/${bookingId}/reschedule/accept`, { method: 'PATCH' }),

  declineReschedule: (bookingId: number) =>
    request<{ bookingId: number }>(`/bookings/${bookingId}/reschedule/decline`, {
      method: 'PATCH',
    }),

  registerSubstitute: (bookingId: number, name: string, phone: string) =>
    request<ClassBooking>(`/bookings/${bookingId}/substitute`, {
      method: 'POST',
      body: JSON.stringify({ name, phone }),
    }),

  removeSubstitute: (bookingId: number) =>
    request<{ bookingId: number }>(`/bookings/${bookingId}/substitute`, { method: 'DELETE' }),

  cancelBooking: (bookingId: number, reason?: string) =>
    request<ClassBooking>(`/bookings/${bookingId}/cancel`, {
      method: 'PATCH',
      body: JSON.stringify({ reason }),
    }),
};
