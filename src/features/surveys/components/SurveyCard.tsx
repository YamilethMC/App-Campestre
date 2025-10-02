import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../../shared/components/Card';
import { COLORS } from '../../../shared/theme/colors';
import { Survey, SurveyCategory } from '../interfaces';

interface SurveyCardProps {
  survey: Survey;
  onPress: (surveyId: string) => void;
  surveyId: string;
}

const SurveyCard: React.FC<SurveyCardProps> = ({ survey, onPress, surveyId }) => {
  // Function to get color based on priority
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'urgente':
        return COLORS.error;
      case 'importante':
        return COLORS.warning;
      case 'normal':
        return COLORS.gray500;
      case 'baja':
        return COLORS.success;
      default:
        return COLORS.gray500;
    }
  };

  // Function to get category label
  const getCategoryLabel = (category: SurveyCategory) => {
    switch (category) {
      case SurveyCategory.SERVICES:
        return 'Servicios';
      case SurveyCategory.RESTAURANT:
        return 'Restaurante';
      case SurveyCategory.SPORTS:
        return 'Deportes';
      case SurveyCategory.EVENTS:
        return 'Eventos';
      default:
        return category;
    }
  };

  return (
    <Card style={styles.card}>
      {/* Survey Image Placeholder */}
      <View style={styles.imageContainer}>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>IMG</Text>
        </View>
      </View>

      {/* Survey Details */}
      <View style={styles.content}>
        <Text style={styles.title}>{survey.title}</Text>
        <Text style={styles.description}>{survey.description}</Text>

        {/* Icons Row */}
        <View style={styles.iconsRow}>
          <View style={styles.iconContainer}>
            <Ionicons name="time-outline" size={16} color={COLORS.gray600} />
            <Text style={styles.iconText}>{survey.estimatedTime}</Text>
          </View>
          <View style={styles.iconContainer}>
            <Ionicons name="people-outline" size={16} color={COLORS.gray600} />
            <Text style={styles.iconText}>{survey.participantCount} personas</Text>
          </View>
          <View style={styles.iconContainer}>
            <Ionicons name="chatbubble-ellipses-outline" size={16} color={COLORS.gray600} />
            <Text style={styles.iconText}>{survey.questionCount} preguntas</Text>
          </View>
        </View>

        {/* Tags */}
        <View style={styles.tagsRow}>
          <View style={[styles.tag, { backgroundColor: getPriorityColor(survey.priority) }]}>
            <Text style={styles.tagText}>{survey.priority}</Text>
          </View>
          <View style={[styles.categoryTag, { borderColor: COLORS.gray300 }]}>
            <Text style={styles.categoryTagText}>{getCategoryLabel(survey.category)}</Text>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity style={styles.button} onPress={() => onPress(surveyId)}>
          <Text style={styles.buttonText}>Responder</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
  },
  imageContainer: {
    marginBottom: 12,
  },
  imagePlaceholder: {
    width: '100%',
    height: 120,
    backgroundColor: COLORS.gray200,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: COLORS.gray500,
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.gray900,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: COLORS.gray600,
    marginBottom: 12,
  },
  iconsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 12,
    color: COLORS.gray600,
    marginLeft: 6,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: COLORS.white,
  },
  tagText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
  categoryTagText: {
    color: COLORS.gray700,
    fontSize: 12,
    fontWeight: '600',
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 16,
  },
});

export default SurveyCard;