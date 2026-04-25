import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';
import { SurveyQuestion } from '../../interfaces';

interface RatingQuestionProps {
  question: SurveyQuestion;
  answer: number;
  onAnswerChange: (value: number) => void;
  disabled?: boolean;
}

export const RatingQuestion: React.FC<RatingQuestionProps> = ({
  answer = 0,
  onAnswerChange,
  disabled = false,
}) => {
  const maxRating = 10;

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
      {[...Array(maxRating)].map((_, index) => {
        const ratingValue = index + 1;
        const isFilled = ratingValue <= answer;
        
        return (
          <TouchableOpacity 
            key={index} 
            style={{ marginHorizontal: 0.5 }}
            onPress={disabled ? undefined : () => onAnswerChange(ratingValue)}
            disabled={disabled}
            activeOpacity={disabled ? 1 : 0.7}
          >
            <Ionicons
              name={isFilled ? 'star' : 'star-outline'}
              size={32}
              color={isFilled ? COLORS.warning : COLORS.gray400}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default RatingQuestion;
