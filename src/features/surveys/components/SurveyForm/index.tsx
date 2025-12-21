import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import Button from '../../../../shared/components/Button';
import Card from '../../../../shared/components/Card/Card';
import { COLORS } from '../../../../shared/theme/colors';
import { SurveyQuestion } from '../../interfaces';
import { MultipleChoiceQuestion } from '../QuestionTypes/MultipleChoiceQuestion';
import { RatingQuestion } from '../QuestionTypes/RatingQuestion';
import { TextQuestion } from '../QuestionTypes/TextQuestion';
import { YesNoQuestion } from '../QuestionTypes/YesNoQuestion';
import styles from './Style';

// Import the styles directly since we can't import from containers

interface SurveyFormProps {
  survey: {
    title: string;
    description: string;
  };
  questions: SurveyQuestion[];
  currentQuestionIndex: number;
  progress: number;
  answers: Record<string, any>;
  goToPreviousQuestion: () => void;
  goToNextQuestion: () => void;
  handleSubmit: () => void;
  handleAnswerChange: (questionId: string, value: any) => void;
  onBack: () => void;
  messages: {
    CONTAINER: {
      QUESTION: string;
      OF: string;
      REQUIRED: string;
      PREVIOUS: string;
      NEXT: string;
      SUBMIT: string;
    };
  };
}
export const SurveyForm: React.FC<SurveyFormProps> = ({
  survey,
  questions,
  currentQuestionIndex,
  progress,
  answers,
  goToPreviousQuestion,
  goToNextQuestion,
  handleSubmit,
  handleAnswerChange,
  onBack,
  messages,
}) => {
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Survey Info Header */}
        <View style={styles.headerSection}>
          <Card style={styles.surveyCard}>
            <Text style={styles.surveyTitle}>{survey.title}</Text>
            <Text style={styles.surveyDescription}>{survey.description}</Text>
          </Card>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressText}>
              {messages.CONTAINER.QUESTION} {currentQuestionIndex + 1} {messages.CONTAINER.OF}{' '}
              {questions.length}
            </Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>
        </View>

        {/* Question Card */}
        {currentQuestion && (
          <View style={styles.questionSection}>
            <Card style={styles.questionCard}>
              <View style={styles.questionHeader}>
                <Text style={styles.questionText}>{currentQuestion.question}</Text>
                {currentQuestion.required && (
                  <View style={styles.requiredIndicator}>
                    <Text style={styles.requiredText}>{messages.CONTAINER.REQUIRED}</Text>
                  </View>
                )}
              </View>

              <View style={styles.answerContainer}>
                {currentQuestion.type === 'SELECT' && currentQuestion.options && (
                  <MultipleChoiceQuestion
                    question={currentQuestion}
                    answer={answers[currentQuestion.id] || ''}
                    onAnswerChange={value => handleAnswerChange(currentQuestion.id, value)}
                  />
                )}

                {currentQuestion.type === 'NUMBER' && (
                  <RatingQuestion
                    question={currentQuestion}
                    answer={answers[currentQuestion.id] || 0}
                    onAnswerChange={value => handleAnswerChange(currentQuestion.id, value)}
                  />
                )}

                {currentQuestion.type === 'TEXT' && (
                  <TextQuestion
                    question={currentQuestion}
                    answer={answers[currentQuestion.id] || ''}
                    onAnswerChange={value => handleAnswerChange(currentQuestion.id, value)}
                  />
                )}

                {currentQuestion.type === 'BOOLEAN' && (
                  <YesNoQuestion
                    question={currentQuestion}
                    answer={answers[currentQuestion.id] || ''}
                    onAnswerChange={value => handleAnswerChange(currentQuestion.id, value)}
                  />
                )}
              </View>
            </Card>
          </View>
        )}

        {/* Navigation Buttons */}
        <View style={styles.navigationContainer}>
          <View style={styles.navButtonsRow}>
            <Button
              text={messages.CONTAINER.PREVIOUS}
              variant="outline"
              onPress={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
              style={
                currentQuestionIndex === 0
                  ? [styles.navButton, styles.disabledNavButton]
                  : styles.navButton
              }
              titleStyle={currentQuestionIndex === 0 ? styles.disabledNavButtonText : undefined}
            />

            {currentQuestionIndex < questions.length - 1 ? (
              <Button
                text={messages.CONTAINER.NEXT}
                onPress={goToNextQuestion}
                style={styles.navButton}
              />
            ) : (
              <Button
                text={messages.CONTAINER.SUBMIT}
                onPress={handleSubmit}
                style={styles.navButton}
              />
            )}
          </View>

          {/* Back to Surveys Button */}
          <Button
            text="Volver a encuestas"
            variant="outline"
            onPress={onBack}
            style={styles.backToSurveysButton}
            icon={
              <Ionicons
                name="arrow-back"
                size={16}
                color={COLORS.primary}
                style={styles.backIcon}
              />
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SurveyForm;
