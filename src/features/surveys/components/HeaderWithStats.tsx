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
      <View style={styles.iconContainer}>
        <Ionicons name="chatbubble-ellipses-outline" size={40} color={COLORS.primary} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Encuestas</Text>
        <Text style={styles.description}>Tu opinión nos ayuda a mejorar</Text>
        <View style={styles.statsRow}>
          <Text style={styles.statText}>{activeSurveys} activas</Text>
          <Text style={styles.statText}>• {completedSurveys} completadas</Text>
          <Text style={styles.statText}>• {averageRating.toFixed(1)} promedio</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    marginTop: 16,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.gray900,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: COLORS.gray600,
    marginBottom: 4,
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  statText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
    marginRight: 8,
  },
});

export default HeaderWithStats;