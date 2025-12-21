import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import Button from '../../../shared/components/Button';
import Card from '../../../shared/components/Card/Card';
import { COLORS } from '../../../shared/theme/colors';
import FilterSection from '../components/FilterSection/FilterSection';
import HeaderWithStats from '../components/HeaderWithStats/HeaderWithStats';
import SurveyCard from '../components/SurveyCard/SurveyCard';
import useMessages from '../hooks/useMessage';
import { useSurveyActions } from '../hooks/useSurveyActions';
import { SurveyCategory } from '../interfaces';
import { surveyService } from '../services';
import { useSurveyStore } from '../store';
import styles from './Style';

const SurveysScreen: React.FC = () => {
  const {
    activeSurveys,
    completedSurveys,
    averageRating,
    currentFilter,
    surveys,
    getFilteredSurveys,
    setFilter,
    fetchSurveys,
    incrementCompletedSurveys,
    pagination,
    loading: storeLoading,
    fetchNextPage,
    fetchPreviousPage,
    goToPage,
  } = useSurveyStore();

  const {
    handleSurveyResponse,
    confirmSurveyResponse,
    cancelSurveyResponse,
    selectedSurveyId,
    showSurveyForm,
    setShowSurveyForm,
    surveyData,
    questions,
    loading: hookLoading,
    loadSurveyData,
    submitSurveyResponse,
  } = useSurveyActions();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [modalVisible, setModalVisible] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    // Cargar página 1 al inicio y cuando cambie el filtro
    fetchSurveys(1);
  }, [currentFilter]);

  // Load survey and questions when selectedSurveyId changes
  useEffect(() => {
    if (selectedSurveyId) {
      loadSurveyData(selectedSurveyId, pagination.page, pagination.limit, currentFilter.category);
    }
  }, [selectedSurveyId]);

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    // Check if all required questions are answered
    const requiredQuestions = questions.filter(q => q.required);
    const unansweredRequired = requiredQuestions.some(q => {
      const value = answers[q.id];
      if (q.type === 'BOOLEAN') {
        return value !== true && value !== false;
      }
      return !value || value === '';
    });

    if (unansweredRequired) {
      Alert.alert('Error', 'Por favor responde todas las preguntas obligatorias antes de enviar.');
      return;
    }

    try {
      // Submit survey answers using hook function
      const success = await submitSurveyResponse(selectedSurveyId as string, answers);

      if (success) {
        // Update survey status in store
        if (selectedSurveyId) {
          incrementCompletedSurveys(selectedSurveyId as string);
        }

        await fetchSurveys(1);
        setSubmitSuccess(true);
      }
    } catch (error) {
      console.error('Error submitting survey:', error);
      Alert.alert('Error', 'Hubo un error al enviar la encuesta. Por favor intenta de nuevo.');
    }
  };

  const handleFormClose = () => {
    setShowSurveyForm(false);
    setSubmitSuccess(false);
    setModalVisible(null);
  };

  const handleCategoryChange = (category: SurveyCategory) => {
    setFilter({
      ...currentFilter,
      category,
    });
  };

  const handleStatusChange = (status: 'activas' | 'completadas') => {
    setFilter({
      ...currentFilter,
      status,
    });
  };

  const handleCardPress = (surveyId: string) => {
    handleSurveyResponse(surveyId);
  };

  const { messages } = useMessages();
  const filteredSurveys = surveys.filter(survey => {
    const matchesCategory =
      currentFilter.category === SurveyCategory.ALL || survey.category === currentFilter.category;
    const matchesStatus = currentFilter.status === 'activas' ? survey.isActive : !survey.isActive;

    return matchesCategory && matchesStatus;
  });

  const currentQuestion = questions[currentQuestionIndex];
  const progress = selectedSurveyId ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  const getVisiblePages = () => {
    const total = pagination.totalPages;
    const current = pagination.page;
    const maxVisible = 6;

    if (total <= maxVisible) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    let start = current - Math.floor(maxVisible / 2);
    if (start < 1) start = 1;

    let end = start + maxVisible - 1;
    if (end > total) {
      end = total;
      start = end - maxVisible + 1;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  if (showSurveyForm && surveyData && !submitSuccess) {
    // Survey form view
    if (hookLoading || !surveyData) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.centerContainer}>
            <Text>{messages.CONTAINER.LOADING}</Text>
          </View>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Survey Info Header */}
          <View style={styles.headerSection}>
            <Card style={styles.surveyCard}>
              <Text style={styles.surveyTitle}>{surveyData.title}</Text>
              <Text style={styles.surveyDescription}>{surveyData.description}</Text>
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
                      answer={answers[currentQuestion.id] ?? null}
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

            {/* Back to Surveys Button - Moved below navigation */}
            <Button
              text="Volver a encuestas"
              variant="outline"
              onPress={() => setShowSurveyForm(false)}
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
  }

  if (submitSuccess) {
    // Success view
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <View style={styles.successContent}>
            <Ionicons
              name="checkmark-circle"
              size={80}
              color={COLORS.success}
              style={styles.successIcon}
            />
            <Text style={styles.successTitle}>{messages.CONTAINER.THANK_YOU}</Text>
            <Text style={styles.successMessage}>{messages.CONTAINER.TEXT_INFORMATION}</Text>
            <Button
              text={messages.CONTAINER.BACK_TO_SURVEYS}
              onPress={handleFormClose}
              style={styles.successButton}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Default list view
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={e => {
          // No activar la paginación infinita automática
          // El usuario debe usar los controles de paginación manual
        }}
      >
        <View style={styles.contentContainer}>
          {/* Header with Stats */}
          <HeaderWithStats
            activeSurveys={activeSurveys}
            completedSurveys={completedSurveys}
            averageRating={averageRating}
          />

          {/* Filter Section */}
          <FilterSection
            selectedCategory={currentFilter.category}
            selectedStatus={currentFilter.status}
            onCategoryChange={handleCategoryChange}
            onStatusChange={handleStatusChange}
          />

          {/* Surveys List */}
          <View style={styles.surveysList}>
            {filteredSurveys.length > 0 ? (
              filteredSurveys.map(survey => (
                <SurveyCard
                  key={survey.id}
                  survey={survey}
                  onPress={handleCardPress}
                  surveyId={survey.id}
                />
              ))
            ) : (
              <View style={styles.noSurveysContainer}>
                <Text style={styles.noSurveysText}>
                  {currentFilter.status === 'activas'
                    ? 'No hay encuestas disponibles'
                    : 'Aún no has contestado ninguna encuesta'}
                </Text>
              </View>
            )}
          </View>

          {/* Loading indicator for pagination */}
          {storeLoading && pagination.page > 1 && (
            <View style={styles.loadingMoreContainer}>
              <Text style={styles.loadingMoreText}>Cargando más encuestas...</Text>
            </View>
          )}

          {/* Pagination controls - only show if there are pages to display */}
          {pagination.totalPages > 0 && (
            <View style={styles.paginationControlsContainer}>
              <View style={styles.paginationRow}>
                <Button
                  icon={<Ionicons name="chevron-back" size={22} color={COLORS.primary} />}
                  variant="outline"
                  onPress={fetchPreviousPage}
                  disabled={pagination.page <= 1}
                  style={[
                    styles.paginationArrowButton,
                    pagination.page <= 1 && styles.paginationArrowButtonDisabled,
                  ]}
                  titleStyle={[
                    styles.paginationArrowButtonText,
                    pagination.page <= 1 && styles.paginationArrowButtonTextDisabled,
                  ]}
                />

                <View style={styles.pageNumbersContainer}>
                  {/*{Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(pageNum => (*/}
                  {getVisiblePages().map(pageNum => (
                    <Button
                      key={pageNum}
                      text={pageNum.toString()}
                      variant="outline"
                      onPress={() => goToPage(pageNum)}
                      style={[
                        styles.pageNumberButton,
                        pageNum === pagination.page && styles.currentPageButton,
                      ]}
                      titleStyle={[
                        styles.pageNumberButtonText,
                        pageNum === pagination.page && styles.currentPageButtonText,
                      ]}
                    />
                  ))}
                </View>

                <Button
                  icon={<Ionicons name="chevron-forward" size={22} color={COLORS.primary} />}
                  variant="outline"
                  onPress={fetchNextPage}
                  disabled={pagination.page >= pagination.totalPages}
                  style={[
                    styles.paginationArrowButton,
                    pagination.page >= pagination.totalPages &&
                      styles.paginationArrowButtonDisabled,
                  ]}
                  titleStyle={[
                    styles.paginationArrowButtonText,
                    pagination.page >= pagination.totalPages &&
                      styles.paginationArrowButtonTextDisabled,
                  ]}
                />
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Confirmation Modal */}
      {/* <Modal
        visible={!!modalVisible}
        title={messages.CONTAINER.ANSWER_SURVERY}
        message={messages.CONTAINER.MESSAGE}
        confirmText={messages.CONTAINER.CONFIRM}
        cancelText={messages.CONTAINER.CANCEL}
        onConfirm={() => modalVisible && confirmSurveyResponse(modalVisible as string)}
        onCancel={cancelSurveyResponse}
      /> */}
    </View>
  );
};

// Question Component Variants
const MultipleChoiceQuestion: React.FC<{
  question: any;
  answer: string;
  onAnswerChange: (value: string) => void;
}> = ({ question, answer, onAnswerChange }) => {
  console.log('question', question, 'answer', answer);
  return (
    <View>
      {question.options?.map((option: any) => (
        <Button
          key={option.id}
          text={option.value}
          variant={answer === option.option ? 'filled' : 'outline'}
          onPress={() => onAnswerChange(option.option)}
          style={styles.multipleChoiceButton}
        />
      ))}
    </View>
  );
};

const RatingQuestion: React.FC<{
  question: any;
  answer: number;
  onAnswerChange: (value: number) => void;
}> = ({ question, answer, onAnswerChange }) => {
  return (
    <View style={styles.ratingContainer}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(star => (
        <Ionicons
          key={star}
          name={star <= answer ? 'star' : 'star-outline'}
          size={25}
          color={star <= answer ? COLORS.primary : COLORS.gray400}
          onPress={() => onAnswerChange(star)}
          style={styles.starIcon}
        />
      ))}
    </View>
  );
};

const TextQuestion: React.FC<{
  question: any;
  answer: string;
  onAnswerChange: (value: string) => void;
}> = ({ question, answer, onAnswerChange }) => {
  const { messages } = useMessages();
  return (
    <View style={styles.textInputContainer}>
      <TextInput
        placeholder={messages.CONTAINER.PLACEHOLDER}
        placeholderTextColor={COLORS.gray400} // More visible placeholder color
        value={answer}
        onChangeText={onAnswerChange}
        multiline
        style={styles.textInput}
        numberOfLines={4}
      />
    </View>
  );
};

const YesNoQuestion: React.FC<{
  question: any;
  answer: boolean;
  onAnswerChange: (value: boolean) => void;
}> = ({ question, answer, onAnswerChange }) => {
  console.log('answer', answer);
  const { messages } = useMessages();
  return (
    <View style={styles.yesNoContainer}>
      <Button
        text={messages.CONTAINER.YES}
        variant={answer === true ? 'filled' : 'outline'}
        onPress={() => onAnswerChange(true)}
        style={styles.yesNoButton}
      />
      <Button
        text={messages.CONTAINER.NO}
        variant={answer === false ? 'filled' : 'outline'}
        onPress={() => onAnswerChange(false)}
        style={styles.yesNoButton}
      />
    </View>
  );
};

export default SurveysScreen;
