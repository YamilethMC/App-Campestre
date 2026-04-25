import React from 'react';
import { View } from 'react-native';
import Button from '../../../../shared/components/Button';
import { COLORS } from '../../../../shared/theme/colors';
import { SurveyQuestion } from '../../interfaces';

interface YesNoQuestionProps {
  question: SurveyQuestion;
  answer: string | boolean;
  onAnswerChange: (value: string) => void;
  disabled?: boolean;
}

export const YesNoQuestion: React.FC<YesNoQuestionProps> = ({
  answer,
  onAnswerChange,
  disabled = false,
}) => {

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Button
        text="Sí"
        variant={answer === 'yes' || answer === true || answer === 'true' ? 'primary' : 'outline'}
        onPress={disabled ? () => {} : () => onAnswerChange('yes')}
        disabled={disabled}
        style={{
          flex: 1,
          marginHorizontal: 8,
          borderWidth: 1,
          borderRadius: 10,
          paddingVertical: 14,
          paddingHorizontal: 24,
          minHeight: 48,
          alignItems: 'center',
          justifyContent: 'center',
          // Estilos personalizados para modo vista
          ...(disabled && {
            backgroundColor: answer === 'yes' || answer === true || answer === 'true' ? COLORS.primaryDark : COLORS.white,
            borderColor: answer === 'yes' || answer === true || answer === 'true' ? COLORS.primaryDark : COLORS.primary,
            opacity: 0.7,
          })
        }}
      />
      <Button
        text="No"
        variant={answer === 'no' || answer === false || answer === 'false' ? 'primary' : 'outline'}
        onPress={disabled ? () => {} : () => onAnswerChange('no')}
        disabled={disabled}
        style={{
          flex: 1,
          marginHorizontal: 8,
          borderWidth: 1,
          borderRadius: 10,
          paddingVertical: 14,
          paddingHorizontal: 24,
          minHeight: 48,
          alignItems: 'center',
          justifyContent: 'center',
          // Estilos personalizados para modo vista
          ...(disabled && {
            backgroundColor: answer === 'no' || answer === false || answer === 'false' ? COLORS.primaryDark : COLORS.white,
            borderColor: answer === 'no' || answer === false || answer === 'false' ? COLORS.primaryDark : COLORS.primary,
            opacity: 0.7,
          })
        }}
      />
    </View>
  );
};

export default YesNoQuestion;
