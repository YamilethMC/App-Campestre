import React, { useState } from 'react';
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

interface UpdateDataCTAProps {
  onPress: () => Promise<void> | void;
  style?: StyleProp<ViewStyle>;
}

const UpdateDataCTA: React.FC<UpdateDataCTAProps> = ({ onPress, style }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handlePress = async () => {
    if (isOpening) {
      return;
    }

    try {
      setIsOpening(true);
      await onPress();
    } finally {
      setIsOpening(false);
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
        style,
      ]}
      onPress={handlePress}
      disabled={isOpening}
      accessibilityRole="button"
      accessibilityHint="Abre el portal del Club para actualizar tus datos"
      accessibilityState={{ busy: isOpening, disabled: isOpening }}
    >
      <View style={styles.textContainer}>
        <Text style={styles.title}>Actualización de datos</Text>
        <Text style={styles.subtitle}>Revisa o corrige tu información desde el portal oficial.</Text>
      </View>

      <View style={styles.buttonWrapper}>
        <View style={styles.buttonOutline}>
          <Text style={styles.buttonOutlineText}>{isOpening ? 'Abriendo…' : 'Ir al portal'}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 12,
    flexWrap: 'wrap',
    shadowColor: COLORS.black,
    shadowOpacity: 0.03,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  },
  cardPressed: {
    transform: [{ scale: 0.99 }],
  },
  textContainer: {
    flex: 1,
    minWidth: 200,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.gray900,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.gray600,
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  buttonOutline: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingHorizontal: 26,
    paddingVertical: 12,
    minWidth: 220,
    alignItems: 'center',
  },
  buttonOutlineText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default UpdateDataCTA;
