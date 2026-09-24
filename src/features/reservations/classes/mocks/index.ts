/**
 * Datos simulados del módulo de Clases.
 *
 * ORIGEN DE CADA DATO (nada aquí es inventado por el equipo de desarrollo):
 *
 * - Disciplinas: pantalla 2 de la infografía "Implementación módulo de clases"
 *   (Pádel, Tenis, Golf, GYM) con su nota literal: "Mostrar solo las disciplinas
 *   disponibles". Tenis y GYM quedan inactivas porque el Club todavía no entregó
 *   profesionales ni horarios para ellas.
 *
 * - Profesionales y horarios de GOLF: archivo "Horarios profesionales.xlsx"
 *   (hojas Fermin, Jimmy, Esteban, David, Walter). Se tomaron ÚNICAMENTE los
 *   bloques "Particulares" según §2 de la Especificación; Club, Academia,
 *   Descanso, guion y vacío no son reservables. Las horas 1:00–6:00 del Excel
 *   se normalizaron a 13:00–18:00 (§5).
 *
 * - Profesionales y horarios de PÁDEL: pantallas 3 y 4 de la infografía
 *   (Carlos Mendoza, Ana Torres, Luis Ramírez; horarios 07:00, 09:00, 17:00,
 *   19:00). Son los datos de ejemplo del propio documento de Carlos.
 *
 * - Precios: $400 / $500 / $600 para 1, 2 y 3 personas (§2 de la Especificación
 *   y mensaje de Carlos del 23/sep/2026).
 *
 * PENDIENTE DEL CLUB (§10, no debe inventarse en producción): apellido completo
 * de Fermín, Esteban, David y Walter; acentuación de Jimmy Díaz; fotografías
 * oficiales; duración real de la clase.
 */

import { Discipline, PriceRule, Professional, WeeklySchedule } from '../interfaces';

/** Construye un horario semanal a partir de las horas reservables por día. */
const schedule = (
  domingo: string[],
  lunes: string[],
  martes: string[],
  miercoles: string[],
  jueves: string[],
  viernes: string[],
  sabado: string[],
): WeeklySchedule => ({
  0: domingo,
  1: lunes,
  2: martes,
  3: miercoles,
  4: jueves,
  5: viernes,
  6: sabado,
});

/**
 * Las 4 disciplinas de la pantalla 2 de la infografía, todas activas y tocables.
 *
 * OJO: "activa" NO significa "tiene profesionales". Son cosas distintas:
 *   - active  -> el Club ofrece esa disciplina. Lo apaga el Club desde el admin
 *                cuando deja de darla (§6: Discipline tiene campo active).
 *   - sin profesionales -> el Club todavía no nos ha entregado sus maestros ni
 *                sus horarios. Hoy es el caso de Tenis y GYM: se pueden tocar y
 *                la pantalla siguiente avisa "Aún no hay profesionales
 *                disponibles para esta disciplina".
 *
 * Del Club sólo llegó el Excel de Golf; los de Pádel salen de la propia
 * infografía. Cuando manden los de Tenis y GYM, basta agregarlos abajo en
 * PROFESSIONALS: no hay que tocar nada más.
 */
export const DISCIPLINES: Discipline[] = [
  { id: 'padel', name: 'Pádel', icon: 'tennisball-outline', active: true },
  { id: 'tenis', name: 'Tenis', icon: 'tennisball-outline', active: true },
  { id: 'golf', name: 'Golf', icon: 'golf-outline', active: true },
  { id: 'gym', name: 'GYM', icon: 'barbell-outline', active: true },
];

/** Horario de ejemplo de Pádel, tal como aparece en la pantalla 4 de la infografía. */
const PADEL_SLOTS = ['07:00', '09:00', '17:00', '19:00'];
const padelSchedule = schedule([], PADEL_SLOTS, PADEL_SLOTS, PADEL_SLOTS, PADEL_SLOTS, PADEL_SLOTS, PADEL_SLOTS);

export const PROFESSIONALS: Professional[] = [
  // ---- Golf: horarios reales del Excel entregado por el Club ----
  {
    id: 'golf-fermin',
    disciplineId: 'golf',
    displayName: 'Fermín Gzz.',
    active: true,
    weeklySchedule: schedule(
      ['09:00', '10:00', '11:00', '14:00'],
      ['07:00', '08:00', '09:00', '18:00'],
      ['15:00', '18:00'],
      ['07:00', '08:00', '09:00', '15:00', '18:00'],
      ['07:00', '15:00', '18:00'],
      [],
      ['08:00', '09:00', '10:00', '11:00', '12:00'],
    ),
  },
  {
    id: 'golf-jimmy',
    disciplineId: 'golf',
    displayName: 'Jimmy Díaz',
    active: true,
    weeklySchedule: schedule(
      ['12:00', '13:00'],
      ['07:00', '08:00', '09:00', '18:00'],
      ['18:00'],
      ['07:00', '08:00', '09:00', '18:00'],
      ['11:00', '18:00'],
      [],
      ['11:00', '12:00', '13:00', '14:00', '15:00'],
    ),
  },
  {
    id: 'golf-esteban',
    disciplineId: 'golf',
    displayName: 'Esteban',
    active: true,
    weeklySchedule: schedule(
      [],
      ['07:00', '08:00', '15:00', '18:00'],
      ['07:00', '15:00', '18:00'],
      ['07:00', '08:00', '15:00', '18:00'],
      ['07:00', '15:00', '18:00'],
      ['07:00', '08:00', '15:00', '16:00'],
      ['11:00'],
    ),
  },
  {
    id: 'golf-david',
    disciplineId: 'golf',
    displayName: 'David',
    active: true,
    weeklySchedule: schedule(
      ['10:00', '11:00', '12:00'],
      [],
      ['11:00', '12:00'],
      ['09:00', '10:00', '13:00', '15:00'],
      ['13:00', '15:00'],
      ['08:00', '09:00', '10:00', '11:00', '15:00', '16:00', '17:00'],
      ['09:00', '10:00', '11:00', '12:00'],
    ),
  },
  {
    id: 'golf-walter',
    disciplineId: 'golf',
    displayName: 'Walter',
    active: true,
    weeklySchedule: schedule(
      [],
      ['07:00', '08:00', '14:00'],
      ['07:00', '15:00'],
      ['07:00', '08:00', '10:00'],
      ['07:00', '15:00'],
      ['07:00', '08:00', '09:00', '15:00'],
      ['07:00', '09:00', '10:00', '11:00'],
    ),
  },

  // ---- Pádel: datos de ejemplo de la infografía ----
  {
    id: 'padel-carlos-mendoza',
    disciplineId: 'padel',
    displayName: 'Carlos Mendoza',
    credential: 'Entrenador Nacional',
    active: true,
    weeklySchedule: padelSchedule,
  },
  {
    id: 'padel-ana-torres',
    disciplineId: 'padel',
    displayName: 'Ana Torres',
    credential: 'Certificada FIP',
    active: true,
    weeklySchedule: padelSchedule,
  },
  {
    id: 'padel-luis-ramirez',
    disciplineId: 'padel',
    displayName: 'Luis Ramírez',
    credential: 'Instructor',
    active: true,
    weeklySchedule: padelSchedule,
  },
];

export const PRICE_RULES: PriceRule[] = [
  { partySize: 1, price: 400 },
  { partySize: 2, price: 500 },
  { partySize: 3, price: 600 },
];

/** Máximo de personas por reserva con la información actual del Club (§2). */
export const MAX_PARTY_SIZE = 3;
export const MIN_PARTY_SIZE = 1;
