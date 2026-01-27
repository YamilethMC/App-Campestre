import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Card from '../../../../shared/components/Card';
import { COLORS } from '../../../../shared/theme/colors';
import useMessages from '../../hooks/useMessage';
import { SurveyCardProps, SurveyCategory } from '../../interfaces';
import styles from './Style';

const SurveyCard: React.FC<SurveyCardProps> = ({ survey, onPress, surveyId }) => {
  const { messages } = useMessages();
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
        return COLORS.info;
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
      <View style={styles.imageWrapper}>
        {/* Survey Image - Use the image URL if available */}
        {survey.image ? (
          <Image
            source={{ uri: survey.image }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>IMG</Text>
          </View>
        )}

        {/* Badge for priority on top-left corner */}
        <View style={styles.badgeContainer}>
          <View style={[styles.badge, { backgroundColor: getPriorityColor(survey.priority) }]}>
            <Text style={[styles.badgeText, { color: COLORS.white }]}>
              {survey.priority.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>

      {/* Survey Details */}
      <View style={styles.content}>
        <Text style={styles.title}>{survey.title}</Text>
        <Text style={styles.description}>{survey.description}</Text>

        {/* Icons Row - Changed to boxes with icon on top and text below */}
        <View style={styles.iconsRow}>
          <View style={styles.iconBox}>
            <Ionicons name="time" size={16} color={COLORS.gray500} style={styles.icon} />
            <Text style={styles.iconText}>{survey.estimatedTime} min</Text>
          </View>

          {/* Mostrar el contador de personas solo si showResponseCount es true */}
          {survey.responsesShow !== false && (
            <View style={styles.iconBox}>
              <Ionicons name="people" size={16} color={COLORS.gray500} style={styles.icon} />
              <Text style={styles.iconText}>{survey.participantCount} {messages.SURVEYCARD.PEOPLE}</Text>
            </View>
          )}

          <View style={styles.iconBox}>
            <Ionicons name="chatbubble-ellipses" size={16} color={COLORS.gray500} style={styles.icon} />
            <Text style={styles.iconText}>{survey.questionCount} {messages.SURVEYCARD.QUESTIONS}</Text>
          </View>
        </View>

        {/* Tags */}
        {/*<View style={styles.tagsRow}>
          <View style={[styles.categoryTag, { borderColor: COLORS.gray300 }]}>
            <Text style={styles.categoryTagText}>{getCategoryLabel(survey.category)}</Text>
          </View>
        </View>*/}

        {/* Action Button - Only show for open surveys */}
        {survey.isActive && !survey.isAnswered && (
          <TouchableOpacity style={styles.button} onPress={() => onPress(surveyId)}>
            <Text style={styles.buttonText}>{messages.SURVEYCARD.START}</Text>
          </TouchableOpacity>
        )}
      </View>
    </Card>
  );
};

export default SurveyCard;