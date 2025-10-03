import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import Modal from '../../../shared/components/Modal/Modal';
import FilterSection from '../components/FilterSection';
import HeaderWithStats from '../components/HeaderWithStats';
import SurveyCard from '../components/SurveyCard';
import { useSurveyActions } from '../hooks/useSurveyActions';
import { SurveyCategory } from '../interfaces';
import { useSurveyStore } from '../store';

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
  } = useSurveyStore();

  const { 
    handleSurveyResponse, 
    confirmSurveyResponse, 
    cancelSurveyResponse,
    modalVisible 
  } = useSurveyActions();

  useEffect(() => {
    fetchSurveys();
  }, []);

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

  const filteredSurveys = getFilteredSurveys();

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
          onConfirm={() => modalVisible && confirmSurveyResponse(modalVisible)}
          onCancel={cancelSurveyResponse}
        />
      </ScrollView>
    </SafeAreaView>
  );
};


export default Surveys;