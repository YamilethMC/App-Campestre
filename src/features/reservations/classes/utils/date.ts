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
