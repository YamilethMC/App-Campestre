import React from 'react';
import { View } from 'react-native';
import Button from '../../../../shared/components/Button';
import { OptionType, SurveyQuestion } from '../../interfaces';

interface MultipleChoiceQuestionProps {
  question: SurveyQuestion;
  answer: string;
  onAnswerChange: (value: string) => void;
}

const isOptionType = (option: string | OptionType): option is OptionType => {
  return (option as OptionType).value !== undefined;
};

export const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  answer,
  onAnswerChange,
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
            onPress={() => onAnswerChange(optionValue)}
            style={{ marginBottom: 8 }}
          />
        );
      })}
    </View>
  );
};

export default MultipleChoiceQuestion;
