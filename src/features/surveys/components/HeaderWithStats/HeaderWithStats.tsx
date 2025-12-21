import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';
import useMessages from '../../hooks/useMessage';
import { HeaderWithStatsProps } from '../../interfaces';
import styles from './Style';

const HeaderWithStats: React.FC<HeaderWithStatsProps> = ({
  activeSurveys,
  completedSurveys,
  averageRating,
}) => {
  const { messages } = useMessages();
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="chatbubble-ellipses-outline" size={40} color={COLORS.primary} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{messages.HEADERWITHSTATS.TITLE}</Text>
        <Text style={styles.description}>{messages.HEADERWITHSTATS.TEXT}</Text>
        {/*<View style={styles.statsRow}>
          <Text style={styles.statText}>{activeSurveys} {messages.HEADERWITHSTATS.ACTIVE}</Text>
          <Text style={styles.statText}>• {completedSurveys} {messages.HEADERWITHSTATS.COMPLETED}</Text>
          <Text style={styles.statText}>• {averageRating.toFixed(1)} {messages.HEADERWITHSTATS.AVERAGE}</Text>
        </View>*/}
      </View>
    </View>
  );
};

export default HeaderWithStats;
