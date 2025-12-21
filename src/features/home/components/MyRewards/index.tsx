import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import styles from './Style';

const MyRewards: React.FC = () => {
  // Simular datos de puntos del usuario - en una implementación real, estos vendrían de un store o API
  const points = 2450;
  const pointsExpiration = 'dic 2025';

  const handleViewCatalog = () => {
    // Mostrar alerta de funcionalidad no implementada
    alert('Funcionalidad en desarrollo: Catálogo de Recompensas');
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name="gift-outline" size={24} color="#A78BFA" />
        <Text style={styles.cardTitle}>Mis Recompensas</Text>
      </View>

      <View style={styles.rewardsContainer}>
        <View style={styles.pointsContainer}>
          <View style={styles.pointsInfo}>
            <Text style={styles.pointsLabel}>Puntos Acumulados</Text>
            <Text style={styles.validityText}>Válidos hasta {pointsExpiration}</Text>
          </View>
          <View style={styles.pointsValueContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="star" size={18} color="#10B981" style={styles.starIcon} />
              <Text style={styles.pointsValue}>{points.toLocaleString()} pts</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.catalogButton} onPress={handleViewCatalog}>
          <Text style={styles.catalogButtonText}>Ver Catálogo de Recompensas</Text>
        </TouchableOpacity>

        <View style={styles.infoLabel}>
          <Ionicons name="gift-outline" size={18} color="#7C3AED" style={styles.infoIcon} />
          <Text style={styles.infoText}>Canjea tus puntos por servicios y productos del club</Text>
        </View>
      </View>
    </View>
  );
};

export default MyRewards;
