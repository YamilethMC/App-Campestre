import { useCallback } from 'react';
import { Discipline, Professional, Weekday } from '../interfaces';
import {
  DISCIPLINES,
  MAX_PARTY_SIZE,
  MIN_PARTY_SIZE,
  PRICE_RULES,
  PROFESSIONALS,
} from '../mocks';
import { useClassBookingStore } from '../store/useClassBookingStore';

/** Convierte 'YYYY-MM-DD' en Date local, sin que el huso horario recorra el día. */
const parseLocalDate = (date: string): Date => {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const isSameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

/**
 * Reglas de negocio del módulo de Clases.
 *
 * La disponibilidad implementa §8 literal: "horario recurrente PARTICULAR +
 * fecha futura + profesional activo + disciplina activa + sin excepción de
 * bloqueo + sin reserva activa para ese slot". Las excepciones de bloqueo
 * (ScheduleException) llegan con el backend; aquí aún no hay origen para ellas.
 */
export const useClasses = () => {
  const isSlotTaken = useClassBookingStore((state) => state.isSlotTaken);

  /**
   * Todas las disciplinas del catálogo, activas e inactivas.
   * La pantalla pinta apagadas las que aún no tienen profesionales del Club,
   * para que la cuadrícula se vea como la pantalla 2 de la infografía.
   */
  const getDisciplines = useCallback((): Discipline[] => DISCIPLINES, []);

  const getDisciplineById = useCallback(
    (disciplineId: string): Discipline | undefined => DISCIPLINES.find((d) => d.id === disciplineId),
    [],
  );

  const getProfessionalsByDiscipline = useCallback(
    (disciplineId: string): Professional[] =>
      PROFESSIONALS.filter((p) => p.disciplineId === disciplineId && p.active),
    [],
  );

  const getProfessionalById = useCallback(
    (professionalId: string): Professional | undefined =>
      PROFESSIONALS.find((p) => p.id === professionalId),
    [],
  );

  /**
   * Horarios "Particulares" del profesional para esa fecha, ya tomados o no.
   *
   * Deja fuera las fechas pasadas y, si la fecha es hoy, las horas que ya pasaron.
   * Los que están reservados SÍ se devuelven: la pantalla los pinta apagados con
   * la leyenda "Ocupado" en vez de esconderlos, para que el socio entienda que el
   * horario existe pero alguien llegó antes.
   */
  const getScheduleSlots = useCallback(
    (professional: Professional | undefined, date: string): string[] => {
      if (!professional || !professional.active || !date) return [];

      const discipline = DISCIPLINES.find((d) => d.id === professional.disciplineId);
      if (!discipline || !discipline.active) return [];

      const selectedDate = parseLocalDate(date);
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      // No se permite reservar en fechas pasadas (§8).
      if (selectedDate < today) return [];

      const weekday = selectedDate.getDay() as Weekday;
      const slots = professional.weeklySchedule[weekday] ?? [];

      // Si la fecha es hoy, las horas que ya pasaron dejan de ofrecerse.
      if (!isSameDay(selectedDate, now)) return slots;

      return slots.filter((slot) => {
        const [hours, minutes] = slot.split(':').map(Number);
        const slotDate = new Date(selectedDate);
        slotDate.setHours(hours, minutes, 0, 0);
        return slotDate > now;
      });
    },
    [],
  );

  /**
   * De esos horarios, los que ya tienen una reserva activa (§2, "Doble reserva").
   * Hoy sale de la tienda local; con el backend vendrá del servidor.
   */
  const getTakenSlots = useCallback(
    (professional: Professional | undefined, date: string): string[] => {
      if (!professional || !date) return [];
      return getScheduleSlots(professional, date).filter((slot) =>
        isSlotTaken(professional.id, date, slot),
      );
    },
    [getScheduleSlots, isSlotTaken],
  );

  /** Precio según número de personas: $400 / $500 / $600 (§2). */
  const getPrice = useCallback((partySize: number): number => {
    const rule = PRICE_RULES.find((r) => r.partySize === partySize);
    return rule ? rule.price : 0;
  }, []);

  return {
    priceRules: PRICE_RULES,
    minPartySize: MIN_PARTY_SIZE,
    maxPartySize: MAX_PARTY_SIZE,
    getDisciplines,
    getDisciplineById,
    getProfessionalsByDiscipline,
    getProfessionalById,
    getScheduleSlots,
    getTakenSlots,
    getPrice,
  };
};
