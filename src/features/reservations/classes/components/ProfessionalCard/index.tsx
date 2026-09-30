import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Professional } from '../../interfaces';
import styles from './Style';

interface ProfessionalCardProps {
  professional: Professional;
  disciplineName: string;
  actionLabel: string;
  onPress: () => void;
}

/** Iniciales del profesional, para cuando el Club aún no entrega su foto (§10). */
const getInitials = (fullName: string): string =>
  fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');

export const ProfessionalCard: React.FC<ProfessionalCardProps> = ({
  professional,
  disciplineName,
  actionLabel,
  onPress,
}) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
    {professional.photoUrl ? (
      <Image source={{ uri: professional.photoUrl }} style={styles.avatar} />
    ) : (
      <View style={styles.avatarFallback}>
        <Text style={styles.initials}>{getInitials(professional.displayName)}</Text>
      </View>
    )}

    <View style={styles.info}>
      <Text style={styles.name}>{professional.displayName}</Text>
      <Text style={styles.discipline}>{disciplineName}</Text>
      {professional.shortBio ? (
        <Text style={styles.credential}>{professional.shortBio}</Text>
      ) : null}

      <View style={styles.actionButton}>
        <Text style={styles.actionText}>{actionLabel}</Text>
      </View>
    </View>
  </TouchableOpacity>
);
