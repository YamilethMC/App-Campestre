import React from 'react';
import { View } from 'react-native';
import Button from '../../../../shared/components/Button';
import { COLORS } from '../../../../shared/theme/colors';
import { OptionType, SurveyQuestion } from '../../interfaces';

interface MultipleChoiceQuestionProps {
  question: SurveyQuestion;
  answer: string;
  onAnswerChange: (value: string) => void;
  disabled?: boolean;
}

const isOptionType = (option: string | OptionType): option is OptionType => {
  return (option as OptionType).value !== undefined;
};

export const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  answer,
  onAnswerChange,
  disabled = false,
}) => {
  if (!question.options) {
    return null;
  }

  return (
    <View style={{ width: '100%' }}>
      {question.options.map((option, index) => {
        const optionValue = isOptionType(option) ? option.value : option;
        const optionLabel = isOptionType(option) ? option.label : option;
        const key = isOptionType(option) ? option.value : `option-${index}`;

        return (
          <Button
            key={key}
            text={optionLabel}
            variant={answer === optionValue ? 'primary' : 'outline'}
            onPress={disabled ? () => {} : () => onAnswerChange(optionValue)}
            disabled={disabled}
            style={{
              marginBottom: 8,
              // Estilos personalizados para modo vista
              ...(disabled && {
                backgroundColor: answer === optionValue ? COLORS.primaryDark : COLORS.white,
                borderColor: answer === optionValue ? COLORS.primaryDark : COLORS.primary,
                opacity: 0.7,
              })
            }}
          />
        );
      })}
    </View>
  );
};

export default MultipleChoiceQuestion;
