import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

import { useAuthStore } from '../../../auth/store/useAuthStore';
import {
  Availability,
  ClassBooking,
  CreateBookingPayload,
  Discipline,
  Professional,
  ProfessionalDetail,
} from '../interfaces';
import { classesService } from '../services';

/**
 * Hooks del módulo de Clases.
 *
 * Usan React Query, que ya está montado en la app (ver app/_layout.tsx y
 * features/banner/hooks/useBanners.ts). Eso nos da caché, reintentos y refresco
 * al volver a la app sin escribirlo a mano.
 *
 * La disponibilidad es el caso delicado: un horario que estaba libre hace un
 * minuto puede estar tomado ahora, así que no se cachea.
 */

/** Claves de caché del módulo, en un solo lugar para poder invalidarlas. */
export const classesKeys = {
  disciplines: ['classes', 'disciplines'] as const,
  professionals: (disciplineId: number) => ['classes', 'professionals', disciplineId] as const,
  professional: (professionalId: number) => ['classes', 'professional', professionalId] as const,
  availability: (professionalId: number, date: string) =>
    ['classes', 'availability', professionalId, date] as const,
  myBookings: ['classes', 'my-bookings'] as const,
};

/** Desempaca la respuesta del servicio y avisa al socio si algo salió mal. */
async function unwrap<T>(
  call: Promise<{ success: boolean; data?: T; error?: string; status?: number }>,
  fallback: T,
): Promise<T> {
  const response = await call;

  if (!response.success) {
    // El 401 ya lo maneja el servicio: manda al socio al login.
    if (response.status !== 401 && response.error) {
      Alert.alert('Error', response.error);
    }
    return fallback;
  }

  return response.data ?? fallback;
}

export const useDisciplines = () => {
  const { token, isAuthenticated } = useAuthStore();

  const query = useQuery({
    queryKey: classesKeys.disciplines,
    queryFn: () => unwrap<Discipline[]>(classesService.getDisciplines(), []),
    enabled: !!token && !!isAuthenticated,
  });

  return {
    disciplines: query.data ?? [],
    loading: query.isLoading,
    refetch: query.refetch,
  };
};

export const useProfessionals = (disciplineId: number) => {
  const { token, isAuthenticated } = useAuthStore();

  const query = useQuery({
    queryKey: classesKeys.professionals(disciplineId),
    queryFn: () => unwrap<Professional[]>(classesService.getProfessionals(disciplineId), []),
    enabled: !!token && !!isAuthenticated && !!disciplineId,
  });

  return {
    professionals: query.data ?? [],
    loading: query.isLoading,
    refetch: query.refetch,
  };
};

/**
 * Ficha del profesional y su tarifa.
 *
 * Va aparte de la disponibilidad a propósito: la pantalla necesita mostrar al
 * profesional y los precios apenas entra, sin esperar a que el socio elija fecha.
 */
export const useProfessional = (professionalId: number) => {
  const { token, isAuthenticated } = useAuthStore();

  const query = useQuery({
    queryKey: classesKeys.professional(professionalId),
    queryFn: () =>
      unwrap<ProfessionalDetail | null>(classesService.getProfessional(professionalId), null),
    enabled: !!token && !!isAuthenticated && !!professionalId,
    // La ficha ya no es sólo el nombre y la foto: trae las reglas de operación,
    // que el Club cambia desde el panel. Se pide siempre al servidor, igual que
    // la disponibilidad, para que un cambio de regla llegue al abrir la
    // pantalla y no cuando venza una caché.
    staleTime: 0,
    gcTime: 0,
  });

  return {
    professional: query.data ?? null,
    prices: query.data?.prices ?? [],
    policy: query.data?.policy ?? null,
    loading: query.isLoading,
  };
};

export const useAvailability = (professionalId: number, date: string) => {
  const { token, isAuthenticated } = useAuthStore();

  const query = useQuery({
    queryKey: classesKeys.availability(professionalId, date),
    queryFn: () => unwrap<Availability | null>(classesService.getAvailability(professionalId, date), null),
    enabled: !!token && !!isAuthenticated && !!professionalId && !!date,
    // Un horario libre puede dejar de estarlo en cualquier momento: siempre se
    // pregunta al servidor, nunca se sirve de caché.
    staleTime: 0,
    gcTime: 0,
  });

  return {
    availability: query.data ?? null,
    slots: query.data?.slots ?? [],
    prices: query.data?.prices ?? [],
    loading: query.isLoading || query.isFetching,
    refetch: query.refetch,
  };
};

export const useMyClassBookings = () => {
  const { token, isAuthenticated } = useAuthStore();

  const query = useQuery({
    queryKey: classesKeys.myBookings,
    queryFn: () => unwrap<ClassBooking[]>(classesService.getMyBookings(), []),
    enabled: !!token && !!isAuthenticated,
  });

  return {
    bookings: query.data ?? [],
    loading: query.isLoading,
    refetch: query.refetch,
  };
};

/**
 * Cancela una clase del socio.
 *
 * Se invalidan las mismas listas que al reservar, más una: la disponibilidad
 * del profesional, porque el horario que se acaba de soltar tiene que volver a
 * ofrecerse enseguida.
 *
 * El aviso de si cuesta o no se pide aparte (`getCancellationPreview`) y **antes**
 * de que el socio confirme: enterarse del cargo después sería una emboscada.
 */
export const useCancelClassBooking = () => {
  const queryClient = useQueryClient();
  const [cancelando, setCancelando] = useState(false);

  const preview = useCallback(async (bookingId: number) => {
    const respuesta = await classesService.getCancellationPreview(bookingId);
    return respuesta.success ? respuesta.data ?? null : null;
  }, []);

  const cancelar = useCallback(
    async (bookingId: number, reason?: string) => {
      setCancelando(true);
      const respuesta = await classesService.cancelBooking(bookingId, reason);
      if (respuesta.success) {
        await queryClient.invalidateQueries({ queryKey: classesKeys.myBookings });
        // Todo lo de clases: el horario que se soltó tiene que volver a
        // ofrecerse sin que nadie recargue a mano.
        await queryClient.invalidateQueries({ queryKey: ['classes'] });
      }
      setCancelando(false);
      return respuesta;
    },
    [queryClient],
  );

  const mandarSustituto = useCallback(
    async (bookingId: number, name: string, phone: string) => {
      const respuesta = await classesService.registerSubstitute(bookingId, name, phone);
      if (respuesta.success) {
        await queryClient.invalidateQueries({ queryKey: classesKeys.myBookings });
      }
      return respuesta;
    },
    [queryClient],
  );

  const quitarSustituto = useCallback(
    async (bookingId: number) => {
      const respuesta = await classesService.removeSubstitute(bookingId);
      if (respuesta.success) {
        await queryClient.invalidateQueries({ queryKey: classesKeys.myBookings });
      }
      return respuesta;
    },
    [queryClient],
  );

  return { preview, cancelar, cancelando, mandarSustituto, quitarSustituto };
};

/**
 * Crea la reserva.
 *
 * Al confirmar se invalidan las listas que quedaron desactualizadas: las clases
 * del socio y la disponibilidad de ese profesional, para que el horario recién
 * tomado aparezca como ocupado sin que nadie tenga que recargar a mano.
 */
export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: CreateBookingPayload) => {
      const response = await classesService.createBooking(payload);

      if (!response.success) {
        throw new Error(response.error ?? 'No se pudo crear la reserva');
      }

      return response.data as ClassBooking;
    },
    onSuccess: (_booking, payload) => {
      queryClient.invalidateQueries({ queryKey: classesKeys.myBookings });
      queryClient.invalidateQueries({
        queryKey: classesKeys.availability(payload.professionalId, payload.date),
      });
    },
  });

  return {
    createBooking: mutation.mutateAsync,
    creating: mutation.isPending,
  };
};
