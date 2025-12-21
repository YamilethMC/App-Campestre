import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { useReservationStore } from '../../../reservations/store/useReservationStore';
import { mockServices } from '../../../reservations/services/reservationService';
import styles from './Style';

const ActiveOrders: React.FC = () => {
  const { reservations } = useReservationStore();

  // Filtrar las reservaciones futuras (activas)
  const activeReservations = reservations.filter(res => {
    // Crear objeto de fecha para la reserva (usando el formato YYYY-MM-DD)
    const [year, month, day] = res.date.split('-').map(Number);
    const [hours, minutes] = res.time.split(':').map(Number);

    // Crear fecha completa de la reserva considerando la zona horaria local
    // Se usa UTC para evitar problemas de zona horaria
    const reservationDate = new Date(Date.UTC(year, month - 1, day, hours, minutes));

    // Comparar con la fecha y hora actual
    return reservationDate > new Date();
  });

  // Calcular minutos restantes para cada reserva
  const reservationsWithTimeLeft = activeReservations.map(res => {
    // Crear objeto de fecha para la reserva
    const [year, month, day] = res.date.split('-').map(Number);
    const [hours, minutes] = res.time.split(':').map(Number);

    // Crear fecha completa de la reserva considerando la zona horaria local
    // Se usa UTC para evitar problemas de zona horaria
    const reservationDate = new Date(Date.UTC(year, month - 1, day, hours, minutes));

    // Obtener la fecha y hora actual
    const currentDate = new Date();

    // Calcular la diferencia en milisegundos
    const timeDiff = reservationDate.getTime() - currentDate.getTime();

    // Convertir a minutos y redondear hacia arriba
    const minutesLeft = Math.ceil(timeDiff / (1000 * 60));

    // Asegurar que no haya valores negativos
    const calculatedMinutes = Math.max(0, minutesLeft);

    return { ...res, minutesLeft: calculatedMinutes };
  });

  // Función para formatear el tiempo restante de forma más legible
  const formatTimeLeft = (minutes: number) => {
    if (minutes <= 0) {
      return 'Ahora';
    } else {
      return `${minutes} min`;
    }
  };

  // Función para formatear la fecha de forma más amigable
  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    // Usar UTC para evitar problemas de zona horaria
    const date = new Date(Date.UTC(year, month - 1, day));
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoy';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Mañana';
    } else {
      return `${day}/${month}/${year}`;
    }
  };

  // Función para obtener el icono correspondiente al servicio
  const getServiceIcon = (serviceName: string) => {
    const normalizedServiceName = serviceName.toLowerCase();

    if (normalizedServiceName.includes('tenis') || normalizedServiceName.includes('tennis')) {
      return 'tennisball-outline';
    } else if (normalizedServiceName.includes('golf')) {
      return 'golf-outline';
    } else if (
      normalizedServiceName.includes('restaurante') ||
      normalizedServiceName.includes('restaurant')
    ) {
      return 'restaurant-outline';
    } else if (normalizedServiceName.includes('spa')) {
      return 'water-outline';
    } else if (
      normalizedServiceName.includes('gimnasio') ||
      normalizedServiceName.includes('gym')
    ) {
      return 'barbell-outline';
    } else if (
      normalizedServiceName.includes('locker') ||
      normalizedServiceName.includes('lockers')
    ) {
      return 'briefcase-outline';
    }

    return 'calendar-outline'; // Icono por defecto
  };

  // Función para obtener el color correspondiente al servicio
  const getServiceColor = (serviceName: string) => {
    const normalizedServiceName = serviceName.toLowerCase();

    // Buscar en los servicios mock para obtener el color
    const service = mockServices.find(
      s =>
        s.name.toLowerCase().includes(normalizedServiceName) ||
        normalizedServiceName.includes(s.name.toLowerCase()) ||
        s.id.toLowerCase() === normalizedServiceName,
    );

    return service ? service.color : COLORS.primary; // Color por defecto si no se encuentra
  };

  // Función para formatear el detalle del servicio (cancha o mesa)
  const formatServiceDetail = (serviceName: string, detail: string) => {
    const normalizedServiceName = serviceName.toLowerCase();

    if (normalizedServiceName.includes('tenis') || normalizedServiceName.includes('tennis')) {
      // Convertir 'tc2' a 'Cancha 2'
      if (detail.startsWith('tc')) {
        const courtNumber = detail.substring(2); // Obtener el número después de 'tc'
        return `Cancha ${courtNumber}`;
      }
    } else if (
      normalizedServiceName.includes('restaurante') ||
      normalizedServiceName.includes('restaurant')
    ) {
      // Convertir 't2' a 'Mesa 2'
      if (detail.startsWith('t')) {
        const tableNumber = detail.substring(1); // Obtener el número después de 't'
        return `Mesa ${tableNumber}`;
      }
    }

    // Si no es un formato conocido, devolver el detalle tal como está
    return detail;
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name="time-outline" size={20} color="#6366F1" />
        <Text style={styles.cardTitle}>Pedidos Activos</Text>
      </View>

      {activeReservations.length === 0 ? (
        <Text style={styles.noOrdersText}>Aún no hay pedidos activos</Text>
      ) : (
        <ScrollView style={styles.ordersList}>
          {reservationsWithTimeLeft.map(reservation => (
            <View key={reservation.id} style={styles.orderItem}>
              <View style={styles.serviceIcon}>
                <Ionicons
                  name={getServiceIcon(reservation.serviceName)}
                  size={24}
                  color={getServiceColor(reservation.serviceName)}
                />
              </View>
              <View style={styles.orderDetails}>
                <Text style={styles.orderName}>{reservation.serviceName}</Text>
                <Text style={styles.orderService}>
                  {formatServiceDetail(
                    reservation.serviceName,
                    reservation.details?.court || reservation.details?.table || 'Servicio',
                  )}
                  {' · '} {formatDate(reservation.date)} a las {reservation.time}
                </Text>
              </View>
              <View
                style={[
                  styles.timeBadge,
                  {
                    backgroundColor:
                      reservation.minutesLeft <= 30
                        ? `${COLORS.warning}40`
                        : `${getServiceColor(reservation.serviceName)}40`,
                    borderColor:
                      reservation.minutesLeft <= 30
                        ? COLORS.warning
                        : getServiceColor(reservation.serviceName),
                  },
                ]}
              >
                <Text
                  style={[
                    styles.timeText,
                    {
                      color:
                        reservation.minutesLeft <= 30
                          ? COLORS.warning
                          : getServiceColor(reservation.serviceName),
                    },
                  ]}
                >
                  {formatTimeLeft(reservation.minutesLeft)}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default ActiveOrders;
