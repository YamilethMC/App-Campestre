import React, { useEffect, useState } from 'react';
import { 
  SafeAreaView, 
  ScrollView, 
  View, 
  Text, 
  StyleSheet,
  TextInput,
  Alert 
} from 'react-native';
import { router } from 'expo-router';
import Modal from '../../../shared/components/Modal/Modal';
import FilterSection from '../components/FilterSection';
import HeaderWithStats from '../components/HeaderWithStats';
import SurveyCard from '../components/SurveyCard';
import { useSurveyActions } from '../hooks/useSurveyActions';
import { SurveyCategory, SurveyQuestion } from '../interfaces';
import { useSurveyStore } from '../store';
import { surveyService } from '../services';
import Card from '../../../shared/components/Card/Card';
import Button from '../../../shared/components/Button';
import { COLORS } from '../../../shared/theme/colors';
import { Ionicons } from '@expo/vector-icons';

const Surveys: React.FC = () => {
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
  } = useSurveyStore();

  const { 
    handleSurveyResponse, 
    confirmSurveyResponse, 
    cancelSurveyResponse,
    selectedSurveyId,
    showSurveyForm,
    setShowSurveyForm,
  } = useSurveyActions();

  const [survey, setSurvey] = useState<any>(null);
  const [questions, setQuestions] = useState<SurveyQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    fetchSurveys();
  }, []);

  // Load survey and questions when selectedSurveyId changes
  useEffect(() => {
    if (selectedSurveyId) {
      const fetchSurveyData = async () => {
        try {
          setLoading(true);
          const surveyData = await surveyService.getSurveyById(selectedSurveyId);
          const questionsData = await surveyService.getQuestionsBySurveyId(selectedSurveyId);

          if (surveyData && questionsData) {
            setSurvey(surveyData);
            setQuestions(questionsData);
            // Initialize answers object with empty values
            const initialAnswers: Record<string, any> = {};
            questionsData.forEach(q => initialAnswers[q.id] = '');
            setAnswers(initialAnswers);
            setCurrentQuestionIndex(0);
          }
        } catch (error) {
          console.error('Error fetching survey data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchSurveyData();
    }
  }, [selectedSurveyId]);

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
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
    const unansweredRequired = requiredQuestions.some(q => !answers[q.id] || answers[q.id] === '');
    
    if (unansweredRequired) {
      Alert.alert('Error', 'Por favor responde todas las preguntas obligatorias antes de enviar.');
      return;
    }
    
    try {
      // Submit survey answers
      await surveyService.submitSurvey(selectedSurveyId as string, answers);
      
      // Update survey status in store
      if (selectedSurveyId) {
        incrementCompletedSurveys(selectedSurveyId as string);
      }
      
      setSubmitSuccess(true);
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
    setModalVisible(surveyId);
  };

  const filteredSurveys = getFilteredSurveys();

  const currentQuestion = questions[currentQuestionIndex];
  const progress = selectedSurveyId ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  if (showSurveyForm && survey && !submitSuccess) {
    // Survey form view
    if (loading || !survey) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.centerContainer}>
            <Text>Cargando encuesta...</Text>
          </View>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
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
                Pregunta {currentQuestionIndex + 1} de {questions.length}
              </Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View 
                style={[
                  styles.progressBarFill, 
                  { width: `${progress}%` }
                ]} 
              />
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
                      <Text style={styles.requiredText}>Obligatorio</Text>
                    </View>
                  )}
                </View>
                
                <View style={styles.answerContainer}>
                  {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
                    <MultipleChoiceQuestion 
                      question={currentQuestion}
                      answer={answers[currentQuestion.id] || ''}
                      onAnswerChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                    />
                  )}
                  
                  {currentQuestion.type === 'rating' && (
                    <RatingQuestion 
                      question={currentQuestion}
                      answer={answers[currentQuestion.id] || 0}
                      onAnswerChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                    />
                  )}
                  
                  {currentQuestion.type === 'text' && (
                    <TextQuestion 
                      question={currentQuestion}
                      answer={answers[currentQuestion.id] || ''}
                      onAnswerChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                    />
                  )}
                  
                  {currentQuestion.type === 'yes-no' && (
                    <YesNoQuestion 
                      question={currentQuestion}
                      answer={answers[currentQuestion.id] || ''}
                      onAnswerChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                    />
                  )}
                </View>
              </Card>
            </View>
          )}
          
          {/* Navigation Buttons */}
          <View style={styles.navigationContainer}>
            <Button 
              text="Anterior" 
              variant="outline"
              onPress={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
              containerStyle={styles.navButton}
            />
            
            {currentQuestionIndex < questions.length - 1 ? (
              <Button 
                text="Siguiente" 
                onPress={goToNextQuestion}
                containerStyle={styles.navButton}
              />
            ) : (
              <Button 
                text="Enviar" 
                onPress={handleSubmit}
                containerStyle={styles.navButton}
              />
            )}
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
            <Ionicons name="checkmark-circle" size={80} color={COLORS.success} style={styles.successIcon} />
            <Text style={styles.successTitle}>¡Gracias por responder!</Text>
            <Text style={styles.successMessage}>Tu encuesta ha sido enviada exitosamente.</Text>
            <Button 
              text="Volver a encuestas" 
              onPress={handleFormClose}
              containerStyle={styles.successButton}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Default list view
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <ScrollView>
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
        <View>
          {filteredSurveys.map((survey) => (
            <SurveyCard
              key={survey.id}
              survey={survey}
              onPress={handleCardPress}
              surveyId={survey.id}
            />
          ))}
        </View>

        {/* Confirmation Modal */}
        <Modal
          visible={!!modalVisible}
          title="Responder Encuesta"
          message="¿Estás seguro de que deseas responder esta encuesta?"
          confirmText="Aceptar"
          cancelText="Cancelar"
          onConfirm={() => modalVisible && confirmSurveyResponse(modalVisible as string)}
          onCancel={cancelSurveyResponse}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

// Question Component Variants
const MultipleChoiceQuestion: React.FC<{
  question: any;
  answer: string;
  onAnswerChange: (value: string) => void;
}> = ({ question, answer, onAnswerChange }) => {
  return (
    <View>
      {question.options?.map((option: string, index: number) => (
        <Button
          key={index}
          text={option}
          variant={answer === option ? 'filled' : 'outline'}
          onPress={() => onAnswerChange(option)}
          containerStyle={styles.multipleChoiceButton}
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
      {[1, 2, 3, 4, 5].map((star) => (
        <Ionicons
          key={star}
          name={star <= answer ? "star" : "star-outline"}
          size={40}
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
  return (
    <View style={styles.textInputContainer}>
      <TextInput
        placeholder="Escribe tu respuesta aquí..."
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
  answer: string;
  onAnswerChange: (value: string) => void;
}> = ({ question, answer, onAnswerChange }) => {
  return (
    <View style={styles.yesNoContainer}>
      <Button
        text="Sí"
        variant={answer === 'Sí' ? 'filled' : 'outline'}
        onPress={() => onAnswerChange('Sí')}
        containerStyle={styles.yesNoButton}
      />
      <Button
        text="No"
        variant={answer === 'No' ? 'filled' : 'outline'}
        onPress={() => onAnswerChange('No')}
        containerStyle={styles.yesNoButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray50,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 120, // Extra space for navigation buttons
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  successContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIcon: {
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.gray900,
    marginBottom: 8,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: COLORS.gray700,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  successButton: {
    width: '100%',
  },
  headerSection: {
    marginBottom: 16,
  },
  surveyCard: {
    padding: 16,
    backgroundColor: COLORS.white,
  },
  surveyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.gray900,
    marginBottom: 8,
  },
  surveyDescription: {
    fontSize: 14,
    color: COLORS.gray600,
    lineHeight: 20,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: COLORS.gray700,
    fontWeight: '500',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: COLORS.gray200,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  questionSection: {
    marginBottom: 16,
  },
  questionCard: {
    padding: 16,
    backgroundColor: COLORS.white,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  questionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray800,
    lineHeight: 24,
  },
  requiredIndicator: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 8,
  },
  requiredText: {
    fontSize: 10,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  answerContainer: {
    marginTop: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  starIcon: {
    marginHorizontal: 4,
  },
  textInputContainer: {
    marginTop: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.gray300,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: COLORS.gray800,
    textAlignVertical: 'top',
  },
  yesNoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  yesNoButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  multipleChoiceButton: {
    marginBottom: 8,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    elevation: 8,
    shadowColor: COLORS.gray800,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  navButton: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export default Surveys;