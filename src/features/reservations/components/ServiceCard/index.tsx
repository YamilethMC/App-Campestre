import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';
import { ServiceCardProps } from '../../interfaces/reservationInterface';
import styles from './Style';

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={[styles.iconContainer, { backgroundColor: `${service.color}20` }]}>
        <Ionicons name={service.icon as any} size={32} color={service.color} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.serviceName}>{service.name}</Text>
        <Text style={styles.serviceDescription}>{service.description}</Text>
      </View>
      <View style={styles.arrowContainer}>
        <Ionicons name="chevron-forward-outline" size={24} color={COLORS.gray400} />
      </View>
    </TouchableOpacity>
  );
};
