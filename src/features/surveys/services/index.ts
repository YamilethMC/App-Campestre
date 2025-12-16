import { useAuthStore } from '../../auth/store/useAuthStore';
import { FullSurvey, Survey, SurveyCategory, SurveyPriority } from '../interfaces';

// Interface para la respuesta de la API
interface SurveyApiResponse {
  success: boolean;
  data: {
    data: {
      answered: {
        data: Array<{
          id: number;
          title: string;
          description: string;
          active?: boolean;
          priority?: string;
          category: string;
          timeStimed: string;
          createdAt: string;
          updatedAt?: string;
          endDate: string;
          questionCount?: number;
          participantCount?: number;
          isAnswered: boolean;
          responseCount?: number;
          responsePercentage?: number;
          image?: string; // Nueva propiedad para la imagen
          responsesShow?: boolean; // Nueva propiedad para mostrar conteo de respuestas
        }>;
        meta: {
          total: number;
          page: number;
          limit: number;
          totalPages: number;
        };
      };
      unanswered: {
        data: Array<{
          id: number;
          title: string;
          description: string;
          active?: boolean;
          priority?: string;
          category: string;
          timeStimed: string;
          createdAt: string;
          updatedAt?: string;
          endDate: string;
          questionCount?: number;
          participantCount?: number;
          isAnswered: boolean;
          responseCount?: number;
          responsePercentage?: number;
          image?: string; // Nueva propiedad para la imagen
          responsesShow?: boolean; // Nueva propiedad para mostrar conteo de respuestas
        }>;
        meta: {
          total: number;
          page: number;
          limit: number;
          totalPages: number;
        };
      };
      stats: {
        totalMembers: number;
        totalResponses: number;
      };
    };
  };
  timestamp: string;
  messageId: string;
  traceId: string;
}

// Mapear la categoría de string a SurveyCategory
const mapCategory = (category: string): SurveyCategory => {
  switch (category.toUpperCase()) {
    case 'SERVICES':
    case 'SERVICIOS': // Por si acaso viene en español
      return SurveyCategory.SERVICES;
    case 'RESTAURANT':
    case 'RESTAURANTE': // Por si acaso viene en español
      return SurveyCategory.RESTAURANT;
    case 'SPORTS':
    case 'DEPORTES': // Por si acaso viene en español
      return SurveyCategory.SPORTS;
    case 'EVENTS':
    case 'EVENTOS': // Por si acaso viene en español
      return SurveyCategory.EVENTS;
    default: return SurveyCategory.ALL; // Valor por defecto
  }
};

// Mapear la prioridad de string a SurveyPriority
const mapPriority = (priority: string): SurveyPriority => {
  switch (priority.toUpperCase()) {
    //case 'HIGH':
    //case 'URGENT': return SurveyPriority.URGENT;
    case 'HIGH':
    case 'IMPORTANT': return SurveyPriority.IMPORTANT;
    case 'MEDIUM':
    case 'NORMAL': return SurveyPriority.NORMAL;
    case 'LOW': return SurveyPriority.LOW;
    default: return SurveyPriority.NORMAL; // Valor por defecto
  }
};

// Interface para service responses
interface ServiceResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  status: number;
}

export const surveyService = {
  // Obtener las encuestas activas paginadas con filtros
  getSurveys: async (
    page: number = 1,
    limit: number = 1,
    search: string = '',
    order: string = 'asc',
    category: string = ''
  ): Promise<ServiceResponse<{
    surveys: Survey[];
    unansweredSurveys: Survey[];
    answeredSurveys: Survey[];
    unansweredMeta: any;
    answeredMeta: any;
  }>> => {
    const {userId, token } = useAuthStore.getState();
    if (!token) {
      return {
        success: false,
        error: 'No authentication token available',
        status: 401
      };
    }

    try {
      // Construir la URL sin el parámetro category si está vacío
      let url = `${process.env.EXPO_PUBLIC_API_URL}/survey/${userId}/surveys/?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}&order=${order}`;
      if (category) {
        url += `&category=${encodeURIComponent(category)}`;
      }

      const response = await fetch(
        url,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'accept': '*/*',
          },
        }
      );

      if (!response.ok) {
        let errorMessage = 'Error al cargar las encuestas';

        // Manejar códigos de error específicos en el servicio
        switch (response.status) {
          case 400:
            errorMessage = 'Petición inválida. Verifica los parámetros.';
            break;
          case 401:
            errorMessage = 'No autorizado: Por favor inicia sesión para continuar';
            break;
          case 500:
            errorMessage = 'Error interno del servidor: Por favor intenta más tarde';
            break;
          default:
            const errorTextDefault = await response.text();
            errorMessage = `Error en la solicitud: ${response.status}. Detalles: ${errorTextDefault}`;
        }

        return {
          success: false,
          error: errorMessage,
          status: response.status
        };
      }

      const result: SurveyApiResponse = await response.json();
      // Convertir los datos de la API a formato de Survey
      // Devolver ambos arrays por separado para manejarlos adecuadamente
      const answeredSurveys: Survey[] = result.data.data.answered.data.map(apiSurvey => ({
        id: apiSurvey.id.toString(),
        title: apiSurvey.title,
        description: apiSurvey.description,
        category: mapCategory(apiSurvey.category),
        priority: apiSurvey.priority ? mapPriority(apiSurvey.priority) : SurveyPriority.NORMAL,
        estimatedTime: apiSurvey.timeStimed,
        participantCount: apiSurvey.participantCount || apiSurvey.responseCount || 0,
        questionCount: apiSurvey.questionCount || 0,
        isActive: false, // Respondida, por lo tanto no activa
        dateCreated: apiSurvey.createdAt,
        dateCompleted: apiSurvey.endDate,
        image: apiSurvey.image, // Nuevo campo para la imagen
        responsesShow: apiSurvey.responsesShow, // Nuevo campo para mostrar conteo de respuestas
      }));

      const unansweredSurveys: Survey[] = result.data.data.unanswered.data.map(apiSurvey => ({
        id: apiSurvey.id.toString(),
        title: apiSurvey.title,
        description: apiSurvey.description,
        category: mapCategory(apiSurvey.category),
        priority: apiSurvey.priority ? mapPriority(apiSurvey.priority) : SurveyPriority.NORMAL,
        estimatedTime: apiSurvey.timeStimed,
        participantCount: apiSurvey.participantCount || apiSurvey.responseCount || 0,
        questionCount: apiSurvey.questionCount || 0,
        isActive: true, // No respondida, por lo tanto activa
        dateCreated: apiSurvey.createdAt,
        dateCompleted: apiSurvey.endDate,
        image: apiSurvey.image, // Nuevo campo para la imagen
        responsesShow: apiSurvey.responsesShow, // Nuevo campo para mostrar conteo de respuestas
      }));

      // Devolver ambos conjuntos de datos y la información de paginación
      return {
        success: true,
        data: {
          surveys: [...unansweredSurveys, ...answeredSurveys],
          unansweredSurveys,
          answeredSurveys,
          unansweredMeta: result.data.data.unanswered.meta,
          answeredMeta: result.data.data.answered.meta
        },
        message: 'Encuestas cargadas exitosamente',
        status: response.status
      };
    } catch (error: any) {
      console.error('Error fetching surveys:', error);
      return {
        success: false,
        error: error.message || 'Error desconocido al cargar las encuestas',
        status: 500
      };
    }
  },

  // Obtener preguntas de una encuesta específica
  getQuestionsBySurveyId: async (surveyId: string): Promise<ServiceResponse<FullSurvey>> => {
    const {token } = useAuthStore.getState();
    if (!token) {
      return {
        success: false,
        error: 'No authentication token available',
        status: 401
      };
    }

    try {
      // Este endpoint es hipotético, ya que no tenemos información exacta
      // del endpoint para obtener las preguntas de una encuesta específica
      // En la práctica, necesitarías revisar la documentación de la API
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/survey/${surveyId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'accept': '*/*',
        },
      });

      if (!response.ok) {
        let errorMessage = 'Error al cargar las preguntas de la encuesta';

        // Manejar códigos de error específicos en el servicio
        switch (response.status) {
          case 400:
            errorMessage = 'Petición inválida. Verifica los parámetros.';
            break;
          case 401:
            errorMessage = 'No autorizado: Por favor inicia sesión para continuar';
            break;
          case 404:
            errorMessage = 'No se encontró esa encuesta.';
            break;
          case 500:
            errorMessage = 'Error interno del servidor: Por favor intenta más tarde';
            break;
          default:
            errorMessage = `Error en la solicitud: ${response.status}`;
        }

        return {
          success: false,
          error: errorMessage,
          status: response.status
        };
      }

      const data = await response.json();
      console.log('Survey questions data:', data);

      if (!data.success || !data.data) {
        return {
          success: false,
          error: 'No se encontraron datos de la encuesta',
          status: response.status
        };
      }

      const survey = data.data;

      const fullSurvey: FullSurvey = {
        id: survey.id,
        title: survey.title,
        description: survey.description,
        category: survey.category,
        priority: survey.priority,
        timeStimed: survey.timeStimed,
        questionCount: survey.questionCount,
        participantCount: survey.participantCount,
        active: survey.active,
        createdAt: survey.createdAt,
        updatedAt: survey.updatedAt,
        _count: survey._count,
        surveyQuestions: survey.surveyQuestions.map((q: any) => ({
          id: q.id.toString(),
          surveyId: surveyId,
          question: q.question,
          type: q.type ?? 'text',
          options: q.options,
          required: q.required ?? false,
        }))
      };

      return {
        success: true,
        data: fullSurvey,
        message: 'Preguntas de la encuesta cargadas exitosamente',
        status: response.status
      };

    } catch (error: any) {
      console.error('Error fetching questions:', error);
      return {
        success: false,
        error: error.message || 'Error desconocido al cargar las preguntas',
        status: 500
      };
    }
  },

  // Enviar respuestas de encuesta - endpoint hipotético, revisar API real
  submitSurvey: async (surveyId: string, answers: any): Promise<ServiceResponse<boolean>> => {
    const {token, userId } = useAuthStore.getState();
    if (!token) {
      return {
        success: false,
        error: 'No authentication token available',
        status: 401
      };
    }

    console.log('Submitting survey with answers:', answers, 'and surveyId:', surveyId, 'for userId:', userId);

    const formattedResponses = Object.entries(answers).map(
      ([questionId, answer]) => ({
        questionId,
        answer,
      })
    );

    console.log('Formatted responses for submission:', formattedResponses);
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/survey/${surveyId}/club-member/${userId}/submit`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'accept': '*/*',
        },
        body: JSON.stringify({ responses: formattedResponses }),
      });

      if (!response.ok) {
        let errorMessage = 'Error al enviar la encuesta';

        // Manejar códigos de error específicos en el servicio
        switch (response.status) {
          case 400:
            errorMessage = 'Respuestas inválidas. Verifica tus respuestas.';
            break;
          case 401:
            errorMessage = 'No autorizado: Por favor inicia sesión para continuar';
            break;
          case 404:
            errorMessage = 'Socio o encuesta no encontrado.';
            break;
          case 409:
            errorMessage = 'El socio ya ha respondido esta encuesta.';
            break;
          case 500:
            errorMessage = 'Error interno del servidor: Por favor intenta más tarde';
            break;
          default:
            errorMessage = `Error al enviar encuesta: ${response.status}`;
        }

        return {
          success: false,
          error: errorMessage,
          status: response.status
        };
      }

      const data = await response.json();
      console.log('Survey submission response data:', data);

      return {
        success: true,
        data: data.success,
        message: 'Encuesta enviada exitosamente',
        status: response.status
      };
    } catch (error: any) {
      console.error('Error submitting survey:', error);
      return {
        success: false,
        error: error.message || 'Error desconocido al enviar la encuesta',
        status: 500
      };
    }
  },
};