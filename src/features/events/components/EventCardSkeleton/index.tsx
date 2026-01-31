import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

const EventCardSkeleton: React.FC = () => {
  const pulseAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    return () => pulse.stop();
  }, [pulseAnim]);

  return (
    <View style={styles.card}>
      {/* Image placeholder */}
      <Animated.View style={[styles.imagePlaceholder, { opacity: pulseAnim }]} />

      {/* Title placeholder */}
      <Animated.View style={[styles.titlePlaceholder, { opacity: pulseAnim }]} />

      {/* Description placeholder */}
      <Animated.View style={[styles.descriptionPlaceholder, { opacity: pulseAnim }]} />
      <Animated.View style={[styles.descriptionPlaceholder, styles.shortDescription, { opacity: pulseAnim }]} />

      {/* Info items */}
      <View style={styles.infoContainer}>
        <Animated.View style={[styles.infoItem, { opacity: pulseAnim }]} />
        <Animated.View style={[styles.infoItem, { opacity: pulseAnim }]} />
        <Animated.View style={[styles.infoItem, { opacity: pulseAnim }]} />
      </View>

      {/* Progress bar placeholder */}
      <Animated.View style={[styles.progressPlaceholder, { opacity: pulseAnim }]} />

      {/* Button placeholder */}
      <Animated.View style={[styles.buttonPlaceholder, { opacity: pulseAnim }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.gray900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  imagePlaceholder: {
    height: 160,
    backgroundColor: COLORS.gray200,
    borderRadius: 12,
    marginBottom: 12,
  },
  titlePlaceholder: {
    height: 24,
    backgroundColor: COLORS.gray200,
    borderRadius: 6,
    marginBottom: 8,
    width: '70%',
  },
  descriptionPlaceholder: {
    height: 14,
    backgroundColor: COLORS.gray200,
    borderRadius: 4,
    marginBottom: 6,
    width: '100%',
  },
  shortDescription: {
    width: '60%',
  },
  infoContainer: {
    marginTop: 12,
    gap: 8,
  },
  infoItem: {
    height: 16,
    backgroundColor: COLORS.gray200,
    borderRadius: 4,
    width: '45%',
  },
  progressPlaceholder: {
    height: 8,
    backgroundColor: COLORS.gray200,
    borderRadius: 4,
    marginTop: 16,
    marginBottom: 16,
  },
  buttonPlaceholder: {
    height: 44,
    backgroundColor: COLORS.gray200,
    borderRadius: 8,
  },
});

export default EventCardSkeleton;
