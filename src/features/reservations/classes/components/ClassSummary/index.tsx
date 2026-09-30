import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { COLORS } from '../../../../../shared/theme/colors';
import { formatShortDate } from '../../utils/date';
import styles from './Style';

interface ClassSummaryRow {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}

interface ClassSummaryProps {
  title: string;
  labels: {
    discipline: string;
    professional: string;
    date: string;
    time: string;
    people: string;
    price: string;
  };
  personLabel: string;
  peopleLabel: string;
  disciplineName: string;
  professionalName: string;
  date: string;
  startTime: string;
  partySize: number;
  price: number;
}

/**
 * Resumen de la reserva de clase, pantalla 5 de la infografía.
 *
 * No reutiliza el SummaryCard de Reservas porque el diseño entregado es otro:
 * ahí cada dato va con su ícono en círculo, la etiqueta arriba y el valor abajo,
 * sin tarjeta ni encabezado. Es un componente distinto, no una copia.
 */
export const ClassSummary: React.FC<ClassSummaryProps> = ({
  title,
  labels,
  personLabel,
  peopleLabel,
  disciplineName,
  professionalName,
  date,
  startTime,
  partySize,
  price,
}) => {
  const rows: ClassSummaryRow[] = [
    { icon: 'school', label: labels.discipline, value: disciplineName },
    { icon: 'person', label: labels.professional, value: professionalName },
    { icon: 'calendar', label: labels.date, value: formatShortDate(date) },
    { icon: 'time', label: labels.time, value: startTime },
    {
      icon: 'people',
      label: labels.people,
      value: `${partySize} ${partySize === 1 ? personLabel : peopleLabel}`,
    },
    { icon: 'cash', label: labels.price, value: `$${price}` },
  ];

  return (
    <View>
      <View style={styles.checkCircle}>
        <Ionicons name="checkmark" size={40} color={COLORS.primary} />
      </View>

      <Text style={styles.title}>{title}</Text>

      {rows.map((row) => (
        <View key={row.label} style={styles.row}>
          <View style={styles.iconCircle}>
            <Ionicons name={row.icon} size={17} color={COLORS.white} />
          </View>
          <View>
            <Text style={styles.label}>{row.label}</Text>
            <Text style={styles.value}>{row.value}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};
