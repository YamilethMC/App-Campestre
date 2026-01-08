import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { SurveyCategory, SurveyFilter } from '../interfaces';
import { surveyService } from '../services';
import { useSurveyStore } from '../store';

export const useSurveyActions = () => {
  const [selectedSurveyId, setSelectedSurveyId] = useState<string | null>(null);
  const [showSurveyForm, setShowSurveyForm] = useState(false);
  const [surveyData, setSurveyData] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'activas' | 'completadas'>('activas');

  const {
    surveys,
    loading: storeLoading,
    error,
    currentFilter,
    pagination,
    activeSurveys,
    completedSurveys,
    averageRating,
    setSurveys,
    setLoading: setStoreLoading,
    setError,
    setFilter,
    setPagination,
    setActiveSurveys,
    setCompletedSurveys,
    setAverageRating,
  } = useSurveyStore();

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
  const loadSurveyData = async (
    surveyId: string,
    paginationPage: number,
    paginationLimit: number,
    currentFilter: string,
  ) => {
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
        Alert.alert(
          'Error',
          questionsResponse.error || 'Error al cargar las preguntas de la encuesta',
        );
        return;
      }
    } catch (error: any) {
      console.error('Error loading survey data:', error);
      Alert.alert('Error', error.message || 'Error al cargar los datos de la encuesta');
    } finally {
      setLoading(false);
    }
  };

  // Cargar encuestas
  const loadSurveys = useCallback(
    async (currentPage: number = 1) => {
      setStoreLoading(true);
      setError(null);

<<<<<<< HEAD
      try {
        // Mapear categoría a string para la API
        let category = '';
        if (currentFilter.category !== SurveyCategory.ALL) {
          switch (currentFilter.category) {
            case SurveyCategory.SERVICES:
              category = 'SERVICES';
              break;
            case SurveyCategory.RESTAURANT:
              category = 'RESTAURANT';
              break;
            case SurveyCategory.SPORTS:
              category = 'SPORTS';
              break;
            case SurveyCategory.EVENTS:
              category = 'EVENTS';
              break;
            default:
              category = '';
          }
=======
    try {
      // Mapear categoría a string para la API
      let category = 'SERVICES';
      if (currentFilter.category !== SurveyCategory.ALL) {
        switch(currentFilter.category) {
          case SurveyCategory.SERVICES:
            category = 'SERVICES';
            break;
          case SurveyCategory.RESTAURANT:
            category = 'RESTAURANT';
            break;
          case SurveyCategory.SPORTS:
            category = 'SPORTS';
            break;
          case SurveyCategory.EVENTS:
            category = 'EVENTS';
            break;
          default:
            category = 'SERVICES';
>>>>>>> d251b39a25dc3ac690b806c8c15ba4a0f6985b99
        }

        const order = 'asc';
        const limit = pagination.limit;

        const response = await surveyService.getSurveys(
          currentPage,
          limit,
          search,
          order,
          category,
        );

        if (response.success && response.data) {
          // Usar los datos y la paginación correspondiente según el estado actual
          let surveysData, meta;

          if (status === 'activas') {
            surveysData = response.data.unansweredSurveys;
            meta = response.data.unansweredMeta;
          } else if (status === 'completadas') {
            surveysData = response.data.answeredSurveys;
            meta = response.data.answeredMeta;
          } else {
            // Por defecto, usar unanswered (encuestas activas)
            surveysData = response.data.unansweredSurveys;
            meta = response.data.unansweredMeta;
          }

          setSurveys(surveysData);
          setPagination({
            page: meta.page,
            limit: meta.limit,
            total: meta.total,
            totalPages: meta.totalPages,
          });

          // Calcular estadísticas usando todos los datos
          const activeSurveysCount = response.data.unansweredSurveys.length;
          const completedSurveysCount = response.data.answeredSurveys.length;

          setActiveSurveys(activeSurveysCount);
          setCompletedSurveys(completedSurveysCount);
          setAverageRating(0); // Valor por defecto, ya que la API no proporciona este dato
        } else {
          setError(response.error || 'Error al cargar las encuestas');
        }
      } catch (error: any) {
        console.error('Error loading surveys:', error);
        setError(error.message || 'Error loading surveys');
      } finally {
        setStoreLoading(false);
      }
    },
    [
      currentFilter.category,
      search,
      status,
      pagination.limit,
      setSurveys,
      setStoreLoading,
      setError,
      setPagination,
      setActiveSurveys,
      setCompletedSurveys,
      setAverageRating,
    ],
  );

  // Set up auto-refresh every 30 minutes (1800000 ms)
  useEffect(() => {
    const autoRefreshInterval = setInterval(() => {
      loadSurveys();
    }, 1800000); // 30 minutes = 1800000 ms

    // Initial load
    loadSurveys();

    // Cleanup interval on unmount
    return () => {
      clearInterval(autoRefreshInterval);
    };
  }, [page, status, search, loadSurveys]);

  // Filter handlers
  const handleFilterChange = useCallback(
    (filter: SurveyFilter) => {
      setFilter(filter);
      setPage(1); // Reset to first page when filter changes
      loadSurveys(1); // Reload surveys with new filter
    },
    [setFilter, loadSurveys],
  );

  const handleStatusChange = useCallback(
    (newStatus: 'activas' | 'completadas') => {
      setStatus(newStatus);
      setPage(1); // Reset to first page when status changes
      loadSurveys(1); // Reload surveys with new status
    },
    [setStatus, loadSurveys],
  );

  // Pagination handlers
  const handleNextPage = useCallback(() => {
    if (page < pagination.totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadSurveys(nextPage);
    }
  }, [page, pagination.totalPages, loadSurveys]);

  const handlePreviousPage = useCallback(() => {
    if (page > 1) {
      const prevPage = page - 1;
      setPage(prevPage);
      loadSurveys(prevPage);
    }
  }, [page, loadSurveys]);

  const handleGoToPage = useCallback(
    (pageNum: number) => {
      if (pageNum >= 1 && pageNum <= pagination.totalPages) {
        setPage(pageNum);
        loadSurveys(pageNum);
      }
    },
    [pagination.totalPages, loadSurveys],
  );

  // Search handler
  const handleSearch = useCallback(
    (searchQuery: string) => {
      setSearch(searchQuery);
      setPage(1); // Reset to first page when search changes
      loadSurveys(1); // Reload surveys with new search query
    },
    [setSearch, loadSurveys],
  );

  // Enviar respuestas de la encuesta
  const submitSurveyResponse = async (surveyId: string, answers: any) => {
    if (!surveyId) return false;

    try {
      const response = await surveyService.submitSurvey(surveyId, answers);

      if (response.success) {
        // Actualizar encuestas después de enviar respuestas
        loadSurveys(page);
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
    // Data
    surveys,
    loading: loading || storeLoading,
    error,
    pagination,
    activeSurveys,
    completedSurveys,
    averageRating,
    currentFilter,
    status,
    selectedSurveyId,
    showSurveyForm,
    surveyData,
    questions,

    // Functions
    handleSurveyResponse,
    confirmSurveyResponse,
    cancelSurveyResponse,
    setShowSurveyForm,
    setSurveyData,
    setQuestions,
    loadSurveyData,
    submitSurveyResponse,
    loadSurveys,
    handleFilterChange,
    handleStatusChange,
    handleNextPage,
    handlePreviousPage,
    handleGoToPage,
    handleSearch,
    setPage,
    setStatus,
    setSearch,
  };
};
