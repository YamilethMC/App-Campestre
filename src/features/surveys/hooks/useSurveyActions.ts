import { useState } from 'react';
import { Alert } from 'react-native';
import { useSurveyStore } from '../store';
import { surveyService } from '../services';

export const useSurveyActions = () => {
  const [selectedSurveyId, setSelectedSurveyId] = useState<string | null>(null);
  const [showSurveyForm, setShowSurveyForm] = useState(false);
  const [surveyData, setSurveyData] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSurveyResponse = (surveyId: string) => {
    setSelectedSurveyId(surveyId);
    setShowSurveyForm(true);
  };

  const confirmSurveyResponse = (surveyId: string) => {
    setSelectedSurveyId(surveyId);
    setShowSurveyForm(true);
  };

  const cancelSurveyResponse = () => {
    setSelectedSurveyId(null);
    setShowSurveyForm(false);
  };

  // Cargar datos de encuesta
  const loadSurveyData = async (surveyId: string, paginationPage: number, paginationLimit: number, currentFilter: string) => {
    if (!surveyId) return;

    setLoading(true);
    try {
      // Cargar preguntas de la encuesta
      const questionsResponse = await surveyService.getQuestionsBySurveyId(surveyId);

      if (questionsResponse.success && questionsResponse.data) {
        setSurveyData(questionsResponse.data);
        setQuestions(questionsResponse.data.surveyQuestions);
      } else {
        console.error('Error loading survey questions:', questionsResponse.error);
        Alert.alert('Error', questionsResponse.error || 'Error al cargar las preguntas de la encuesta');
        return;
      }
    } catch (error: any) {
      console.error('Error loading survey data:', error);
      Alert.alert('Error', error.message || 'Error al cargar los datos de la encuesta');
    } finally {
      setLoading(false);
    }
  };

  // Enviar respuestas de la encuesta
  const submitSurveyResponse = async (surveyId: string, answers: any) => {
    if (!surveyId) return false;

    try {
      const response = await surveyService.submitSurvey(surveyId, answers);

      if (response.success) {
        return true;
      } else {
        console.error('Error submitting survey:', response.error);
        Alert.alert('Error', response.error || 'Error al enviar la encuesta');
        return false;
      }
    } catch (error: any) {
      console.error('Error submitting survey:', error);
      Alert.alert('Error', error.message || 'Error al enviar la encuesta');
      return false;
    }
  };

  return {
    handleSurveyResponse,
    confirmSurveyResponse,
    cancelSurveyResponse,
    selectedSurveyId,
    showSurveyForm,
    setShowSurveyForm,
    surveyData,
    questions,
    loading,
    loadSurveyData,
    submitSurveyResponse,
  };
};