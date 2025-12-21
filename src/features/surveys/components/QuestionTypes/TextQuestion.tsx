import React from 'react';
import { TextInput, View } from 'react-native';
import { SurveyQuestion } from '../../interfaces';

interface TextQuestionProps {
  question: SurveyQuestion;
  answer: string;
  onAnswerChange: (value: string) => void;
}

export const TextQuestion: React.FC<TextQuestionProps> = ({ answer, onAnswerChange }) => {
  return (
    <View style={{ width: '100%' }}>
      <TextInput
        value={answer}
        onChangeText={onAnswerChange}
        placeholder="Escribe tu respuesta aquí"
        multiline
        numberOfLines={4}
        style={{
          borderWidth: 1,
          borderColor: '#D1D5DB',
          borderRadius: 8,
          padding: 12,
          textAlignVertical: 'top',
          minHeight: 120,
        }}
      />
    </View>
  );
};

export default TextQuestion;
