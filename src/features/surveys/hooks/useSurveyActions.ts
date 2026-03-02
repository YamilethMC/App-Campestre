import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { SurveyCategory, SurveyFilter } from '../interfaces';
import { surveyService } from '../services';
import { useSurveyStore } from '../store';

const mapCategoryToParam = (category: SurveyCategory): string => {
  switch (category) {
    case SurveyCategory.SERVICES:
      return 'SERVICES';
    case SurveyCategory.RESTAURANT:
      return 'RESTAURANT';
    case SurveyCategory.SPORTS:
      return 'SPORTS';
    case SurveyCategory.EVENTS:
      return 'EVENTS';
    case SurveyCategory.ALL:
    default:
      return '';
  }
};

export const useSurveyActions = () => {
  const [selectedSurveyId, setSelectedSurveyId] = useState<string | null>(null);
  const [showSurveyForm, setShowSurveyForm] = useState(false);
  const [surveyData, setSurveyData] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

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
    unansweredCache,
    answeredCache,
    closedCache,
    unansweredMeta,
    answeredMeta,
    closedMeta,
    setSurveyCaches,
    setLastLoadedParams,
    lastLoadedCategory,
    lastLoadedSearch,
    clearSurveyCaches
  } = useSurveyStore();

  const hasCachedDataForCurrentCategory = useMemo(() => {
    const hasCacheEntries = unansweredCache.length > 0 || answeredCache.length > 0 || closedCache.length > 0;
    const hasCacheMeta = unansweredMeta !== null || answeredMeta !== null || closedMeta !== null;
    const hasCache = hasCacheEntries || hasCacheMeta;
    return hasCache && lastLoadedCategory === currentFilter.category && lastLoadedSearch === search;
  }, [
    unansweredCache.length,
    answeredCache.length,
    closedCache.length,
    unansweredMeta,
    answeredMeta,
    closedMeta,
    lastLoadedCategory,
    lastLoadedSearch,
    currentFilter.category,
    search
  ]);

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
        // Verificar si es un error de autenticación
        if (questionsResponse.status === 401) {
          // No mostramos alerta aquí porque el servicio ya la maneja
          return;
        }
        Alert.alert('Error', questionsResponse.error || 'Error al cargar las preguntas de la encuesta');
        return;
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Error al cargar los datos de la encuesta');
    } finally {
      setLoading(false);
    }
  };

  const applyDataset = useCallback((data: any[], meta?: any) => {
    setSurveys(data);

    const computedPage = meta?.page || 1;
    const computedLimit = meta?.limit || pagination.limit;
    const computedTotal = meta?.total ?? data.length;
    const computedTotalPages = meta?.totalPages || Math.max(1, Math.ceil((computedTotal || data.length) / computedLimit));

    setPagination({
      page: computedPage,
      limit: computedLimit,
      total: computedTotal,
      totalPages: computedTotalPages,
      hasNextPage: computedPage < computedTotalPages,
      hasPreviousPage: computedPage > 1,
    });
  }, [pagination.limit, setPagination, setSurveys]);

  const getCachedDataset = useCallback((status: 'abiertas' | 'completadas' | 'cerradas') => {
    if (status === 'abiertas') {
      return { data: unansweredCache, meta: unansweredMeta };
    }
    if (status === 'completadas') {
      return { data: answeredCache, meta: answeredMeta };
    }
    return { data: closedCache, meta: closedMeta };
  }, [unansweredCache, answeredCache, closedCache, unansweredMeta, answeredMeta, closedMeta]);

  const applyCachedStatusView = useCallback((status: 'abiertas' | 'completadas' | 'cerradas') => {
    const { data, meta } = getCachedDataset(status);
    applyDataset(data, meta);
  }, [applyDataset, getCachedDataset]);

  // Cargar encuestas
  const loadSurveys = useCallback(async (
    currentPage: number = 1,
    options: {
      forceRefresh?: boolean;
      categoryOverride?: SurveyCategory;
      statusOverride?: 'abiertas' | 'completadas' | 'cerradas';
      searchOverride?: string;
    } = {}
  ) => {
    const { forceRefresh = false, categoryOverride, statusOverride, searchOverride } = options;
    const effectiveCategory = categoryOverride ?? currentFilter.category;
    const effectiveStatus = statusOverride ?? currentFilter.status;
    const effectiveSearch = searchOverride ?? search;

    const reuseCache = !forceRefresh &&
      lastLoadedCategory === effectiveCategory &&
      lastLoadedSearch === effectiveSearch &&
      (unansweredCache.length > 0 || answeredCache.length > 0 || closedCache.length > 0);

    if (reuseCache) {
      applyCachedStatusView(effectiveStatus);
      return;
    }

    setStoreLoading(true);
    setError(null);

    try {
      const categoryParam = mapCategoryToParam(effectiveCategory);
      const order = 'asc';
      const limit = pagination.limit;

      const response = await surveyService.getSurveys(
        currentPage,
        limit,
        effectiveSearch,
        order,
        categoryParam
      );
      if (response.success && response.data) {
        const unansweredSurveys = response.data.unansweredSurveys || [];
        const answeredSurveys = response.data.answeredSurveys || [];
        const closedSurveys = response.data.closedSurveys || [];

        setSurveyCaches({
          unanswered: unansweredSurveys,
          answered: answeredSurveys,
          closed: closedSurveys,
          unansweredMeta: response.data.unansweredMeta,
          answeredMeta: response.data.answeredMeta,
          closedMeta: response.data.closedMeta,
        });

        setLastLoadedParams({ category: effectiveCategory, search: effectiveSearch });

        setActiveSurveys(unansweredSurveys.length);
        setCompletedSurveys(answeredSurveys.length);
        setAverageRating(0); // Valor por defecto, ya que la API no proporciona este dato

        if (effectiveStatus === 'abiertas') {
          applyDataset(unansweredSurveys, response.data.unansweredMeta);
        } else if (effectiveStatus === 'completadas') {
          applyDataset(answeredSurveys, response.data.answeredMeta);
        } else {
          applyDataset(closedSurveys, response.data.closedMeta);
        }
      } else {
        // Verificar si es un error de autenticación
        if (response.status === 401) {
          // No mostramos alerta aquí porque el servicio ya la maneja
          return;
        }
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Error al cargar las encuestas');
    } finally {
      setStoreLoading(false);
    }
  }, [
    applyCachedStatusView,
    applyDataset,
    closedCache.length,
    currentFilter.category,
    currentFilter.status,
    lastLoadedCategory,
    lastLoadedSearch,
    pagination.limit,
    search,
    setActiveSurveys,
    setAverageRating,
    setCompletedSurveys,
    setError,
    setLastLoadedParams,
    setStoreLoading,
    setSurveyCaches,
    unansweredCache.length,
    answeredCache.length,
    closedCache.length,
  ]);

  const loadSurveysRef = useRef(loadSurveys);
  useEffect(() => {
    loadSurveysRef.current = loadSurveys;
  }, [loadSurveys]);

  // Set up auto-refresh every 30 minutes (1800000 ms)
  useEffect(() => {
    const executeFetch = () => {
      loadSurveysRef.current?.(1, { forceRefresh: true });
    };

    executeFetch();
    const autoRefreshInterval = setInterval(executeFetch, 1800000); // 30 minutes

    // Cleanup interval on unmount
    return () => {
      clearInterval(autoRefreshInterval);
    };
  }, []);

  // Filter handlers
  const handleFilterChange = useCallback((filter: SurveyFilter) => {
    setFilter(filter);
    setPage(1); // Reset to first page when filter changes
    loadSurveys(1, { forceRefresh: true, categoryOverride: filter.category, statusOverride: filter.status });
  }, [loadSurveys, setFilter]);

  const handleStatusChange = useCallback((newStatus: 'abiertas' | 'completadas' | 'cerradas') => {
    setPage(1); // Reset to first page when status changes
    const updatedFilter: SurveyFilter = {
      ...currentFilter,
      status: newStatus,
    };
    setFilter(updatedFilter);

    if (hasCachedDataForCurrentCategory) {
      applyCachedStatusView(newStatus);
    } else {
      loadSurveys(1, { forceRefresh: true, statusOverride: newStatus });
    }
  }, [applyCachedStatusView, currentFilter, hasCachedDataForCurrentCategory, loadSurveys, setFilter]);

  // Pagination handlers
  const handleNextPage = useCallback(() => {
    if (page < pagination.totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadSurveys(nextPage, { forceRefresh: true });
    }
  }, [page, pagination.totalPages, loadSurveys]);

  const handlePreviousPage = useCallback(() => {
    if (page > 1) {
      const prevPage = page - 1;
      setPage(prevPage);
      loadSurveys(prevPage, { forceRefresh: true });
    }
  }, [page, loadSurveys]);

  const handleGoToPage = useCallback((pageNum: number) => {
    if (pageNum >= 1 && pageNum <= pagination.totalPages) {
      setPage(pageNum);
      loadSurveys(pageNum, { forceRefresh: true });
    }
  }, [pagination.totalPages, loadSurveys]);

  // Search handler
  const handleSearch = useCallback((searchQuery: string) => {
    setSearch(searchQuery);
    setPage(1); // Reset to first page when search changes
    loadSurveys(1, { forceRefresh: true, searchOverride: searchQuery });
  }, [loadSurveys, setSearch]);

  // Enviar respuestas de la encuesta
  const submitSurveyResponse = async (surveyId: string, answers: any) => {
    if (!surveyId) return false;

    try {
      const response = await surveyService.submitSurvey(surveyId, answers);

      if (response.success) {
        // Limpiar cache para forzar refetch fresco
        clearSurveyCaches();
        setPage(1);
        await loadSurveys(1, { forceRefresh: true });
        return true;
      } else {
        // Verificar si es un error de autenticación
        if (response.status === 401) {
          // No mostramos alerta aquí porque el servicio ya la maneja
          return false;
        }
        Alert.alert('Error', response.error || 'Error al enviar la encuesta');
        return false;
      }
    } catch (error: any) {
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
    setSearch,
  };
};