import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../shared/theme/colors';

interface HeaderWithStatsProps {
  activeSurveys: number;
  completedSurveys: number;
  averageRating: number;
}

const HeaderWithStats: React.FC<HeaderWithStatsProps> = ({
  activeSurveys,
  completedSurveys,
  averageRating,
}) => {
  return (
    <View style={styles.container}>
      {/* Title and Description */}
      <View style={styles.headerContent}>
        <View style={styles.titleContainer}>
          <Ionicons name="chatbubble-ellipses-outline" size={24} color={COLORS.white} />
          <Text style={styles.title}>Encuestas</Text>
        </View>
        <Text style={styles.subtitle}>Tu opinión nos ayuda a mejorar</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{activeSurveys}</Text>
          <Text style={styles.statLabel}>Activas</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{completedSurveys}</Text>
          <Text style={styles.statLabel}>Completadas</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{averageRating.toFixed(1)}</Text>
          <Text style={styles.statLabel}>Promedio</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    padding: 16,
  },
  headerContent: {
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 12,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.white,
    marginTop: 4,
    textAlign: 'center',
  },
});

export default HeaderWithStats;