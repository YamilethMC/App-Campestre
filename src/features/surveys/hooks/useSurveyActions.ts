import { useState } from 'react';
import { Alert } from 'react-native';
import { useSurveyStore } from '../store';

export const useSurveyActions = () => {
  const { incrementCompletedSurveys } = useSurveyStore();
  const [modalVisible, setModalVisible] = useState<string | null>(null);

  const handleSurveyResponse = (surveyId: string) => {
    setModalVisible(surveyId);
  };

  const confirmSurveyResponse = (surveyId: string) => {
    // In a real app, this would navigate to the survey form
    // For now, we'll just show an alert
    Alert.alert('Funcionalidad no disponible', 'El formulario de encuesta aún no está implementado.');
    
    // Update the store to reflect the completion of the survey
    incrementCompletedSurveys(surveyId);
    setModalVisible(null);
  };

  const cancelSurveyResponse = () => {
    setModalVisible(null);
  };

  return {
    handleSurveyResponse,
    confirmSurveyResponse,
    cancelSurveyResponse,
    modalVisible,
  };
};