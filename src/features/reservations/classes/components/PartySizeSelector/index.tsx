import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../../../shared/theme/colors';
import { PriceRule } from '../../interfaces';
import styles from './Style';

interface PartySizeSelectorProps {
  label: string;
  priceTitle: string;
  personLabel: string;
  peopleLabel: string;
  partySize: number;
  minPartySize: number;
  maxPartySize: number;
  priceRules: PriceRule[];
  onChange: (partySize: number) => void;
  /** Texto chico de la leyenda de disponibilidad, p. ej. "Clase particular". */
  availabilityCaption: string;
  /** Estado en verde, p. ej. "Disponible". */
  availabilityValue: string;
  /** La leyenda sólo aparece cuando ya hay un horario elegido. */
  showAvailability: boolean;
}

/**
 * Selector de 1 a 3 personas con la tabla de precios.
 * Corresponde a la pantalla 4 de la infografía: contador y "Precios por clase".
 */
export const PartySizeSelector: React.FC<PartySizeSelectorProps> = ({
  label,
  priceTitle,
  personLabel,
  peopleLabel,
  partySize,
  minPartySize,
  maxPartySize,
  priceRules,
  onChange,
  availabilityCaption,
  availabilityValue,
  showAvailability,
}) => {
  const canDecrease = partySize > minPartySize;
  const canIncrease = partySize < maxPartySize;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="people-outline" size={24} color={COLORS.primary} />
        <Text style={styles.label}>{label}</Text>
      </View>

      <View style={styles.counterRow}>
        <TouchableOpacity
          style={[styles.counterButton, !canDecrease && styles.counterButtonDisabled]}
          onPress={() => canDecrease && onChange(partySize - 1)}
          disabled={!canDecrease}
        >
          <Ionicons name="remove" size={22} color={COLORS.primary} />
        </TouchableOpacity>

        <Text style={styles.counterValue}>{partySize}</Text>

        <TouchableOpacity
          style={[styles.counterButton, !canIncrease && styles.counterButtonDisabled]}
          onPress={() => canIncrease && onChange(partySize + 1)}
          disabled={!canIncrease}
        >
          <Ionicons name="add" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.priceBox}>
        <Text style={styles.priceTitle}>{priceTitle}</Text>
        {priceRules.map((rule) => {
          const isActive = rule.partySize === partySize;
          return (
            <View key={rule.partySize} style={styles.priceRow}>
              <View style={styles.priceLabelColumn}>
                <Text style={[styles.priceLabel, isActive && styles.priceRowActive]}>
                  {rule.partySize} {rule.partySize === 1 ? personLabel : peopleLabel}:
                </Text>
              </View>
              <Text style={[styles.priceValue, isActive && styles.priceRowActive]}>
                ${rule.price}
              </Text>
            </View>
          );
        })}
      </View>

      {showAvailability && (
        <View style={styles.availabilityBox}>
          <View style={styles.availabilityIcon}>
            <Ionicons name="checkmark" size={15} color={COLORS.white} />
          </View>
          <View>
            <Text style={styles.availabilityCaption}>{availabilityCaption}</Text>
            <Text style={styles.availabilityValue}>{availabilityValue}</Text>
          </View>
        </View>
      )}
    </View>
  );
};
