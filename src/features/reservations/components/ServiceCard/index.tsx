import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ServiceCardProps } from '../../interfaces/reservationInterface';
import styles from './Style';

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onPress }) => {
  return (
    <TouchableOpacity style={styles.gridCard} onPress={onPress}>
      <View style={[styles.gridIconContainer, { backgroundColor: `${service.color}10` }]}>
        <Ionicons
          name={service.icon as any}
          size={30}
          color={service.color}
        />
      </View>
      <Text style={styles.gridServiceName}>{service.name}</Text>
    </TouchableOpacity>
  );
};