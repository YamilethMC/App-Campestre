import { useState } from 'react';
import { useSurveyStore } from '../store';

export const useSurveyActions = () => {
  const [selectedSurveyId, setSelectedSurveyId] = useState<string | null>(null);
  const [showSurveyForm, setShowSurveyForm] = useState(false);

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

  return {
    handleSurveyResponse,
    confirmSurveyResponse,
    cancelSurveyResponse,
    selectedSurveyId,
    showSurveyForm,
    setShowSurveyForm,
  };
};