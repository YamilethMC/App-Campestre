import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../../shared/theme/colors';
import { SurveyQuestion } from '../../interfaces';

interface RatingQuestionProps {
  question: SurveyQuestion;
  answer: number;
  onAnswerChange: (value: number) => void;
}

export const RatingQuestion: React.FC<RatingQuestionProps> = ({
  answer = 0,
  onAnswerChange,
}) => {
  const maxRating = 5;
  
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
      {[...Array(maxRating)].map((_, index) => {
        const ratingValue = index + 1;
        const isFilled = ratingValue <= answer;
        
        return (
          <TouchableOpacity 
            key={index} 
            style={{ marginHorizontal: 4 }}
            onPress={() => onAnswerChange(ratingValue)}
            activeOpacity={0.7}
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
