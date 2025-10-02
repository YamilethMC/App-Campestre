import { create } from 'zustand';
import { Survey, SurveyFilter, SurveyCategory } from '../interfaces';

interface SurveyStore {
  surveys: Survey[];
  userCompletedSurveys: string[]; // IDs of surveys completed by the user
  activeSurveys: number;
  completedSurveys: number; // Total of surveys completed by the user
  averageRating: number;
  currentFilter: SurveyFilter;
  loading: boolean;
  error: string | null;
  
  setSurveys: (surveys: Survey[]) => void;
  setActiveSurveys: (count: number) => void;
  setCompletedSurveys: (count: number) => void;
  setUserCompletedSurveys: (completedSurveyIds: string[]) => void;
  setAverageRating: (rating: number) => void;
  setFilter: (filter: SurveyFilter) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchSurveys: () => Promise<void>;
  getFilteredSurveys: () => Survey[];
  updateSurveyStatus: (surveyId: string, status: 'completed' | 'active') => void;
  incrementCompletedSurveys: (surveyId: string) => void;
  updateAverageRating: (newRating: number) => void;
}

export const useSurveyStore = create<SurveyStore>((set, get) => ({
  surveys: [],
  userCompletedSurveys: [],
  activeSurveys: 0,
  completedSurveys: 0,
  averageRating: 0,
  currentFilter: {
    category: SurveyCategory.ALL,
    status: 'activas',
  },
  loading: false,
  error: null,
  
  setSurveys: (surveys) => set({ surveys }),
  
  setActiveSurveys: (activeSurveys) => set({ activeSurveys }),
  
  setCompletedSurveys: (completedSurveys) => set({ completedSurveys }),
  
  setUserCompletedSurveys: (completedSurveyIds) => set({ userCompletedSurveys: completedSurveyIds }),
  
  setAverageRating: (averageRating) => set({ averageRating }),
  
  setFilter: (currentFilter) => set({ currentFilter }),
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),
  
  fetchSurveys: async () => {
    set({ loading: true, error: null });
    try {
      // In a real app, this would call the API
      // For now, we'll use mock data
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      
      // Using mock data - surveys that were originally completed
      const mockSurveys = [
        {
          id: '1',
          title: 'Satisfacción con Servicios del Club',
          description: 'Ayúdanos a mejorar nuestros servicios compartiendo tu experiencia.',
          category: SurveyCategory.SERVICES,
          priority: 'Importante',
          estimatedTime: '3-5 min',
          participantCount: 156,
          questionCount: 8,
          isActive: true,
          imageUrl: '',
          averageRating: 4.2,
          dateCreated: '2024-10-01',
        },
        {
          id: '2',
          title: 'Calidad del Restaurante',
          description: 'Evalúa la calidad de nuestros alimentos y servicio en el restaurante.',
          category: SurveyCategory.RESTAURANT,
          priority: 'Normal',
          estimatedTime: '4-6 min',
          participantCount: 89,
          questionCount: 10,
          isActive: true,
          imageUrl: '',
          averageRating: 4.5,
          dateCreated: '2024-10-05',
        },
        {
          id: '3',
          title: 'Instalaciones Deportivas',
          description: 'Comparte tu opinión sobre nuestras instalaciones deportivas.',
          category: SurveyCategory.SPORTS,
          priority: 'Urgente',
          estimatedTime: '5-7 min',
          participantCount: 234,
          questionCount: 12,
          isActive: true,
          imageUrl: '',
          averageRating: 3.8,
          dateCreated: '2024-09-25',
        },
        {
          id: '4',
          title: 'Experiencia en Eventos',
          description: 'Ayúdanos a mejorar nuestros eventos y actividades.',
          category: SurveyCategory.EVENTS,
          priority: 'Normal',
          estimatedTime: '3-5 min',
          participantCount: 76,
          questionCount: 7,
          isActive: true,
          imageUrl: '',
          averageRating: 4.7,
          dateCreated: '2024-10-10',
        },
        {
          id: '5',
          title: 'Calidad del Servicio General',
          description: 'Evalúa el servicio general del club.',
          category: SurveyCategory.SERVICES,
          priority: 'Baja',
          estimatedTime: '4-6 min',
          participantCount: 321,
          questionCount: 9,
          isActive: false, // Completed survey
          imageUrl: '',
          averageRating: 4.0,
          dateCreated: '2024-08-15',
          dateCompleted: '2024-09-15',
        },
      ];
      
      // Initially, user has completed only survey 5
      const initialCompletedSurveyIds = ['5'];
      
      set({ 
        surveys: mockSurveys,
        userCompletedSurveys: initialCompletedSurveyIds
      });
      
      // Calculate stats
      const activeSurveys = mockSurveys.filter(s => s.isActive && !initialCompletedSurveyIds.includes(s.id)).length;
      const completedSurveys = initialCompletedSurveyIds.length; // Initially only survey 5 is completed by the user
      const activeRatings = mockSurveys
        .filter(s => s.isActive && !initialCompletedSurveyIds.includes(s.id) && s.averageRating)
        .map(s => s.averageRating as number);
      const averageRating = activeRatings.length > 0 
        ? activeRatings.reduce((sum, rating) => sum + rating, 0) / activeRatings.length
        : 0;
      
      set({ 
        activeSurveys,
        completedSurveys,
        averageRating: parseFloat(averageRating.toFixed(1))
      });
    } catch (error) {
      set({ error: 'Error fetching surveys', loading: false });
    } finally {
      set({ loading: false });
    }
  },
  
  getFilteredSurveys: () => {
    const { surveys, currentFilter, userCompletedSurveys } = get();
    
    // Create a copy of surveys with updated status based on user completion
    const surveysWithUpdatedStatus = surveys.map(survey => ({
      ...survey,
      // Survey is active if it's originally active AND not completed by user
      isActive: survey.isActive && !userCompletedSurveys.includes(survey.id)
    }));
    
    return surveysWithUpdatedStatus.filter(survey => {
      const matchesCategory = currentFilter.category === SurveyCategory.ALL || 
                              survey.category === currentFilter.category;
      
      const matchesStatus = currentFilter.status === 'activas' ? 
                            survey.isActive : 
                            !survey.isActive;
      
      return matchesCategory && matchesStatus;
    });
  },
  
  updateSurveyStatus: (surveyId, status) => {
    set(state => {
      // In this implementation, we're tracking completed surveys by user in userCompletedSurveys
      const updatedCompletedSurveys = status === 'completed'
        ? [...state.userCompletedSurveys, surveyId]
        : state.userCompletedSurveys.filter(id => id !== surveyId);
      
      const updatedActiveSurveys = state.surveys.filter(s => 
        s.isActive && !updatedCompletedSurveys.includes(s.id)
      ).length;
      
      const updatedCompletedSurveysCount = updatedCompletedSurveys.length;
      
      // Calculate average from active surveys that are not completed by user
      const activeRatings = state.surveys
        .filter(s => s.isActive && !updatedCompletedSurveys.includes(s.id) && s.averageRating) 
        .map(s => s.averageRating as number);
      const newAverageRating = activeRatings.length > 0 
        ? activeRatings.reduce((sum, rating) => sum + rating, 0) / activeRatings.length
        : state.averageRating;
      
      return {
        userCompletedSurveys: updatedCompletedSurveys,
        activeSurveys: updatedActiveSurveys,
        completedSurveys: updatedCompletedSurveysCount,
        averageRating: parseFloat(newAverageRating.toFixed(1))
      };
    });
  },
  
  incrementCompletedSurveys: (surveyId) => {
    set(state => {
      const updatedCompletedSurveys = [...state.userCompletedSurveys, surveyId];
      const updatedCompletedCount = updatedCompletedSurveys.length;
      
      // Calculate new active surveys count
      const updatedActiveSurveys = state.surveys.filter(s => 
        s.isActive && !updatedCompletedSurveys.includes(s.id)
      ).length;
      
      // Calculate average from active surveys that are not completed by user
      const activeRatings = state.surveys
        .filter(s => s.isActive && !updatedCompletedSurveys.includes(s.id) && s.averageRating) 
        .map(s => s.averageRating as number);
      const newAverageRating = activeRatings.length > 0 
        ? activeRatings.reduce((sum, rating) => sum + rating, 0) / activeRatings.length
        : state.averageRating;
      
      return {
        userCompletedSurveys: updatedCompletedSurveys,
        completedSurveys: updatedCompletedCount,
        activeSurveys: updatedActiveSurveys,
        averageRating: parseFloat(newAverageRating.toFixed(1))
      };
    });
  },
}));