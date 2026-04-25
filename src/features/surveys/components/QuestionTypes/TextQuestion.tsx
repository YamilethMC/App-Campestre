import React from 'react';
import { TextInput, View } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';
import { SurveyQuestion } from '../../interfaces';

interface TextQuestionProps {
  question: SurveyQuestion;
  answer: string;
  onAnswerChange: (value: string) => void;
  disabled?: boolean;
}

export const TextQuestion: React.FC<TextQuestionProps> = ({
  answer,
  onAnswerChange,
  disabled = false,
}) => {
  return (
    <View style={{ width: '100%' }}>
      <TextInput
        value={answer}
        onChangeText={disabled ? undefined : onAnswerChange}
        placeholder={disabled ? "" : "Escribe tu respuesta aquí"}
        multiline
        numberOfLines={4}
        editable={!disabled}
        style={{
          borderWidth: 1,
          borderColor: disabled ? COLORS.gray200 : COLORS.gray300,
          borderRadius: 8,
          padding: 12,
          textAlignVertical: 'top',
          minHeight: 120,
          backgroundColor: disabled ? COLORS.gray50 : COLORS.white,
          color: disabled ? COLORS.gray600 : COLORS.black,
        }}
      />
    </View>
  );
};

export default TextQuestion;
