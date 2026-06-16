import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';
import useMessages from '../../hooks/useMessages';
import { SummaryCardProps } from '../../interfaces/reservationInterface';
import styles from './Style';

export const SummaryCard: React.FC<SummaryCardProps> = ({ 
  serviceName, 
  date, 
  time, 
  details 
}) => {
  const {messages} = useMessages();
  // Formatear la fecha
  const formatDate = (dateString: string) => {
    // Parsear como fecha LOCAL (no UTC) para evitar problemas de timezone
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const dayName = dayNames[date.getDay()];
    const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const monthName = monthNames[date.getMonth()];
    
    return `${dayName}, ${day} de ${monthName} de ${year}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{messages.SUMMARYCARD.TITLE}</Text>
      
      <View style={styles.detailRow}>
        <Ionicons name="reader-outline" size={20} color={COLORS.gray600} />
        <Text style={styles.label}>{messages.SUMMARYCARD.SERVICE}</Text>
        <Text style={styles.value}>{serviceName}</Text>
      </View>
      
      <View style={styles.detailRow}>
        <Ionicons name="calendar-outline" size={20} color={COLORS.gray600} />
        <Text style={styles.label}>{messages.SUMMARYCARD.DATE}</Text>
        <Text style={styles.value}>{formatDate(date)}</Text>
      </View>
      
      <View style={styles.detailRow}>
        <Ionicons name="time-outline" size={20} color={COLORS.gray600} />
        <Text style={styles.label}>{messages.SUMMARYCARD.TIME}</Text>
        <Text style={styles.value}>{time}</Text>
      </View>
      
      {/* Detalles específicos del servicio */}
      {details.court && (
        <View style={styles.detailRow}>
          <Ionicons name="tennisball-outline" size={20} color={COLORS.gray600} />
          <Text style={styles.label}>{messages.SUMMARYCARD.COURT}</Text>
          <Text style={styles.value}>{details.court}</Text>
        </View>
      )}
      
      {details.table && (
        <View style={styles.detailRow}>
          <Ionicons name="restaurant-outline" size={20} color={COLORS.gray600} />
          <Text style={styles.label}>{messages.SUMMARYCARD.TABLE}</Text>
          <Text style={styles.value}>{details.table}</Text>
        </View>
      )}
      
      {details.partySize !== undefined && (
        <View style={styles.detailRow}>
          <Ionicons name="people-outline" size={20} color={COLORS.gray600} />
          <Text style={styles.label}>{messages.SUMMARYCARD.PEOPLE}</Text>
          <Text style={styles.value}>{details.partySize}</Text>
        </View>
      )}
    </View>
  );
};