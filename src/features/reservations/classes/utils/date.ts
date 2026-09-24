const DAY_NAMES = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MONTH_NAMES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

/**
 * 'YYYY-MM-DD' -> 'Lun, 12 Ene 2026'.
 *
 * Es el formato corto que usan las pantallas 4 y 5 de la infografía. Se parsea
 * en local, no con new Date(string), que interpreta la cadena como UTC y en
 * UTC-6 devuelve el día anterior.
 */
export const formatShortDate = (date: string): string => {
  const [year, month, day] = date.split('-').map(Number);
  const parsed = new Date(year, month - 1, day);
  return `${DAY_NAMES[parsed.getDay()]}, ${day} ${MONTH_NAMES[month - 1]} ${year}`;
};

/**
 * Saca la fecha "YYYY-MM-DD" de un instante del backend.
 *
 * Se corta la cadena en vez de construir un Date: el backend guarda la hora de
 * pared del club dentro de un campo UTC, así que leerla con los métodos locales
 * de Date la recorrería según el huso del teléfono.
 */
export const dateFromInstant = (isoInstant: string): string => isoInstant.substring(0, 10);

/** Saca la hora "HH:MM" de un instante del backend, por la misma razón. */
export const timeFromInstant = (isoInstant: string): string => isoInstant.substring(11, 16);
