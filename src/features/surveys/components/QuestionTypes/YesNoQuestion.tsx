import React from 'react';
import { View } from 'react-native';
import { SurveyQuestion } from '../../interfaces';
import Button from '../../../../shared/components/Button';

interface YesNoQuestionProps {
  question: SurveyQuestion;
  answer: string;
  onAnswerChange: (value: string) => void;
}

export const YesNoQuestion: React.FC<YesNoQuestionProps> = ({ answer, onAnswerChange }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Button
        text="Sí"
        variant={answer === 'yes' ? 'primary' : 'outline'}
        onPress={() => onAnswerChange('yes')}
        style={{ flex: 1, marginRight: 8 }}
      />
      <Button
        text="No"
        variant={answer === 'no' ? 'primary' : 'outline'}
        onPress={() => onAnswerChange('no')}
        style={{ flex: 1, marginLeft: 8 }}
      />
    </View>
  );
};

export default YesNoQuestion;
