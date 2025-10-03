import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../../shared/theme/colors';
import { Ionicons } from '@expo/vector-icons';

interface ServiceCardProps {
  service: {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
  };
  onPress: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={[styles.iconContainer, { backgroundColor: `${service.color}20` }]}>
        <Ionicons 
          name={service.icon as any} 
          size={32} 
          color={service.color} 
        />
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

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray800,
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: COLORS.gray600,
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});