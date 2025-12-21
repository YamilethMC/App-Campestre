import { create } from 'zustand';
import { Survey, SurveyCategory, SurveyFilter } from '../interfaces';

interface SurveyStore {
  surveys: Survey[];
  userCompletedSurveys: string[]; // IDs of surveys completed by the user
  activeSurveys: number;
  completedSurveys: number; // Total of surveys completed by the user
  averageRating: number;
  currentFilter: SurveyFilter;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };

  setSurveys: (surveys: Survey[]) => void;
  setActiveSurveys: (count: number) => void;
  setCompletedSurveys: (count: number) => void;
  setUserCompletedSurveys: (completedSurveyIds: string[]) => void;
  setAverageRating: (rating: number) => void;
  setFilter: (filter: SurveyFilter) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setPagination: (pagination: any) => void;
  fetchSurveys: (page?: number) => Promise<void>; // Mantenida para compatibilidad, pero ahora se llama desde el hook
  fetchNextPage: () => Promise<void>;
  fetchPreviousPage: () => Promise<void>;
  goToPage: (page: number) => Promise<void>;
  getFilteredSurveys: () => Survey[];
  updateSurveyStatus: (surveyId: string, status: 'completed' | 'active') => void;
  incrementCompletedSurveys: (surveyId: string) => void;
  resetPagination: () => void;
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
  pagination: {
    page: 1,
    limit: 1,
    total: 0,
    totalPages: 1,
  },

  setSurveys: surveys => set({ surveys }),

  setActiveSurveys: activeSurveys => set({ activeSurveys }),

  setCompletedSurveys: completedSurveys => set({ completedSurveys }),

  setUserCompletedSurveys: completedSurveyIds => set({ userCompletedSurveys: completedSurveyIds }),

  setAverageRating: averageRating => set({ averageRating }),

  setFilter: currentFilter => {
    // When filter changes, reset to page 1
    set({
      currentFilter,
      pagination: { ...get().pagination, page: 1 },
    });
  },

  setLoading: loading => set({ loading }),

  setError: error => set({ error }),

  setPagination: pagination => set({ pagination }),

  resetPagination: () => {
    set({
      pagination: {
        page: 1,
        limit: get().pagination.limit,
        total: 0,
        totalPages: 1,
      },
    });
  },

  fetchSurveys: async (page = 1) => {
    set({ loading: true });
    set({
      pagination: {
        ...get().pagination,
        page: page,
      },
    });
    set({ loading: false });
  },

  fetchNextPage: async () => {
    const { pagination } = get();
    if (pagination.page < pagination.totalPages) {
      await get().fetchSurveys(pagination.page + 1);
    }
  },

  fetchPreviousPage: async () => {
    const { pagination } = get();
    if (pagination.page > 1) {
      await get().fetchSurveys(pagination.page - 1);
    }
  },

  goToPage: async (page: number) => {
    const { pagination } = get();
    if (page >= 1 && page <= pagination.totalPages) {
      await get().fetchSurveys(page);
    }
  },

  getFilteredSurveys: () => {
    const { surveys, currentFilter, userCompletedSurveys } = get();

    // Create a copy of surveys with updated status based on user completion
    const surveysWithUpdatedStatus = surveys.map(survey => ({
      ...survey,
      // Survey is active if it's originally active AND not completed by user
      isActive: survey.isActive && !userCompletedSurveys.includes(survey.id),
    }));

    return surveysWithUpdatedStatus.filter(survey => {
      const matchesCategory =
        currentFilter.category === SurveyCategory.ALL || survey.category === currentFilter.category;

      const matchesStatus = currentFilter.status === 'activas' ? survey.isActive : !survey.isActive;

      return matchesCategory && matchesStatus;
    });
  },

  updateSurveyStatus: (surveyId, status) => {
    set(state => {
      // In this implementation, we're tracking completed surveys by user in userCompletedSurveys
      const updatedCompletedSurveys =
        status === 'completed'
          ? [...state.userCompletedSurveys, surveyId]
          : state.userCompletedSurveys.filter(id => id !== surveyId);

      const updatedActiveSurveys = state.surveys.filter(
        s => s.isActive && !updatedCompletedSurveys.includes(s.id),
      ).length;

      const updatedCompletedSurveysCount = updatedCompletedSurveys.length;

      // Calculate average from active surveys that are not completed by user
      const activeRatings = state.surveys
        .filter(s => s.isActive && !updatedCompletedSurveys.includes(s.id) && s.averageRating)
        .map(s => s.averageRating as number);
      const newAverageRating =
        activeRatings.length > 0
          ? activeRatings.reduce((sum, rating) => sum + rating, 0) / activeRatings.length
          : state.averageRating;

      return {
        userCompletedSurveys: updatedCompletedSurveys,
        activeSurveys: updatedActiveSurveys,
        completedSurveys: updatedCompletedSurveysCount,
        averageRating: parseFloat(newAverageRating.toFixed(1)),
      };
    });
  },

  incrementCompletedSurveys: surveyId => {
    set(state => {
      const updatedCompletedSurveys = [...state.userCompletedSurveys, surveyId];
      const updatedCompletedCount = updatedCompletedSurveys.length;

      // Calculate new active surveys count
      const updatedActiveSurveys = state.surveys.filter(
        s => s.isActive && !updatedCompletedSurveys.includes(s.id),
      ).length;

      // Calculate average from active surveys that are not completed by user
      const activeRatings = state.surveys
        .filter(s => s.isActive && !updatedCompletedSurveys.includes(s.id) && s.averageRating)
        .map(s => s.averageRating as number);
      const newAverageRating =
        activeRatings.length > 0
          ? activeRatings.reduce((sum, rating) => sum + rating, 0) / activeRatings.length
          : state.averageRating;

      return {
        userCompletedSurveys: updatedCompletedSurveys,
        completedSurveys: updatedCompletedCount,
        activeSurveys: updatedActiveSurveys,
        averageRating: parseFloat(newAverageRating.toFixed(1)),
      };
    });
  },
}));
