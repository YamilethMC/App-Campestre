import { useAuthStore } from '../../auth/store/useAuthStore';
import { Event } from '../interfaces/eventInterface';

// Interface para la respuesta de la API
interface EventsApiResponse {
  success: boolean;
  data: {
    events: Array<{
      id: number;
      type: string;
      name: string;
      description: string;
      date: string;
      totalSpots: number;
      location: string;
      image?: string;
      inscritedShow?: boolean;
      progressShow?: boolean;
      createdAt: string;
      updatedAt: string;
      dateISO: string;
      availableSpots: number;
      ocupedSpots: number;
      isRegistered: boolean;
    }>;
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
  timestamp: string;
  messageId: string;
  traceId: string;
}

// Interface para la respuesta de la API de registro
interface EventRegistrationApiResponse {
  success: boolean;
  data: {
    message: string;
    availableSpots: number;
  };
  timestamp: string;
  messageId: string;
  traceId: string;
}

// Interface para la respuesta de la API de cancelación de registro
interface EventCancellationApiResponse {
  success: boolean;
  data: {
    message: string;
    eventName: string;
    memberId: number;
  };
  timestamp: string;
  messageId: string;
  traceId: string;
}

// Interfaces for member-related API responses
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
  messageId: string;
  traceId: string;
}

interface MembersResponse {
  members: Array<{
    id: number;
    memberCode: number | null;
    title: string | null;
    profession: string | null;
    paymentMethod: string;
    dateOfAdmission: string | null;
    foreignMember: boolean;
    createdAt: string;
    updatedAt: string;
    invitedById: number | null;
    relationship: string | null;
    user: {
      id: number;
      email: string;
      name: string;
      lastName: string;
    };
  }>;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface MemberDetailsResponse {
  id: number;
  memberCode: number;
  title: string | null;
  profession: string | null;
  paymentMethod: string;
  dateOfAdmission: string | null;
  foreignMember: boolean;
  createdAt: string;
  updatedAt: string;
  invitedById: number | null;
  relationship: string | null;
  user: {
    id: number;
    email: string;
    name: string;
    lastName: string;
  };
  invitedBy: any | null;
  guests: Array<{
    id: number;
    memberCode: number | null;
    title: string | null;
    profession: string | null;
    paymentMethod: string;
    dateOfAdmission: string | null;
    foreignMember: boolean;
    createdAt: string;
    updatedAt: string;
    invitedById: number;
    relationship: string | null;
    user: {
      id: number;
      name: string;
      lastName: string;
      email: string;
    };
  }>;
}

interface RegistrationResponse {
  message: string;
  availableSpots: number;
}

// Mapear el tipo de evento de string a tipo definido
const mapEventType = (type: string): 'SOCIAL' | 'SPORT' | 'FAMILY' | 'OTHER' => {
  switch (type.toUpperCase()) {
    case 'SOCIAL': return 'SOCIAL';
    case 'SPORT':
    case 'DEPORTIVO': return 'SPORT';
    case 'FAMILY':
    case 'FAMILIAR':
    case 'FAMILIAR': return 'FAMILY';
    default: return 'OTHER';
  }
};

// Parsear la fecha para mostrarla en formato legible
const parseDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).replace(/^\w/, (c) => c.toUpperCase());
  } catch (error) {
    return dateString;
  }
};

// Parsear la hora de dateISO
const parseTime = (dateISOString: string): string => {
  try {
    const date = new Date(dateISOString);
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  } catch (error) {
    return '00:00';
  }
};

export const eventsService = {
  /**
   * Obtener eventos con paginación y filtros
   */
  async getEvents(
    page: number = 1,
    search: string = '',
    type: string = '',
    date: string = '' // formato 'yyyy-mm'
  ): Promise<{
    success: boolean;
    data?: {
      events: Event[];
      meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
    };
    message?: string;
    status: number;
    error?: string;
  }> {
    const { token } = useAuthStore.getState();
    if (!token) {
      return {
        success: false,
        error: 'No authentication token available',
        status: 401
      };
    }

    try {
      // Construir la URL con los parámetros
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10', // Límite fijo (match surveys)
        search,
        order: 'asc', // Orden fijo
        orderBy: 'name', // Orden por nombre fijo
      });

      if (type) {
        params.append('type', type.toUpperCase());
      }

      if (date) {
        params.append('date', date);
      }

      const url = `${process.env.EXPO_PUBLIC_API_URL}/events?${params.toString()}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': 'application/json',
        },
      });

      if (!response.ok) {
        let errorMessage = 'Error al cargar los eventos';

        // Manejar códigos de error específicos en el servicio
        switch (response.status) {
          case 400:
            errorMessage = 'Solicitud incorrecta: Verifica los parámetros proporcionados';
            break;
          case 401:
            errorMessage = 'No autorizado: Por favor inicia sesión para continuar';
            break;
          case 403:
            errorMessage = 'Acceso prohibido: No tienes permisos para ver eventos';
            break;
          case 404:
            errorMessage = 'No se encontraron eventos';
            break;
          case 500:
            errorMessage = 'Error interno del servidor: Por favor intenta más tarde';
            break;
          default:
            const errorText = await response.text();
            errorMessage = `Error en la solicitud: ${response.status}. Detalles: ${errorText}`;
        }

        return {
          success: false,
          error: errorMessage,
          status: response.status
        };
      }

      const result: EventsApiResponse = await response.json();
      // Convertir los datos de la API al formato de Event
      const events: Event[] = result.data.events.map(apiEvent => ({
        id: apiEvent.id.toString(),
        name: apiEvent.name,
        description: apiEvent.description,
        date: apiEvent.date, // Fecha legible
        time: parseTime(apiEvent.dateISO), // Hora extraída de dateISO
        location: apiEvent.location,
        eventType: mapEventType(apiEvent.type),
        availableSpots: apiEvent.availableSpots,
        totalSpots: apiEvent.totalSpots,
        isRegistered: apiEvent.isRegistered, // La API no proporciona esta información directamente
        ocupedSpots: apiEvent.totalSpots - apiEvent.availableSpots,
        image: apiEvent.image,
        inscritedShow: apiEvent.inscritedShow,
        progressShow: apiEvent.progressShow,
      }));

      return {
        success: true,
        data: {
          events,
          meta: result.data.meta,
        },
        message: 'Eventos cargados exitosamente',
        status: response.status
      };
    } catch (error) {
      console.error('Error fetching events:', error);
      return {
        success: false,
        error: 'Error desconocido al cargar los eventos',
        status: 500
      };
    }
  },

  /**
   * Obtener detalles de un miembro del club
   */
  async getMemberDetails(memberId: number): Promise<{
    success: boolean;
    data?: MemberDetailsResponse;
    message?: string;
    status: number;
    error?: string;
  }> {
    const { token } = useAuthStore.getState();
    if (!token) {
      return {
        success: false,
        error: 'No authentication token available',
        status: 401
      };
    }

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/club-members/${memberId}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'accept': '*/*',
          },
        }
      );

      if (!response.ok) {
        let errorMessage = 'Error al cargar los detalles del miembro';

        // Manejar códigos de error específicos en el servicio
        switch (response.status) {
          case 400:
            errorMessage = 'Solicitud incorrecta: Verifica los datos proporcionados';
            break;
          case 401:
            errorMessage = 'No autorizado: Por favor inicia sesión para continuar';
            break;
          case 403:
            errorMessage = 'Acceso prohibido: No tienes permisos para ver detalles de miembros';
            break;
          case 404:
            errorMessage = 'Miembro no encontrado';
            break;
          case 500:
            errorMessage = 'Error interno del servidor: Por favor intenta más tarde';
            break;
          default:
            const errorText = await response.text();
            errorMessage = `Error en la solicitud: ${response.status}. Detalles: ${errorText}`;
        }

        return {
          success: false,
          error: errorMessage,
          status: response.status
        };
      }

      const result: ApiResponse<MemberDetailsResponse> = await response.json();

      return {
        success: true,
        data: result.data,
        message: 'Detalles del miembro cargados exitosamente',
        status: response.status
      };
    } catch (error) {
      console.error('Error fetching member details:', error);
      return {
        success: false,
        error: 'Error desconocido al cargar los detalles del miembro',
        status: 500
      };
    }
  },

  /**
   * Registrar usuario a un evento
   */
  async registerForEvent(eventId: string, clubMemberId: string, totalRegistrations: number = 1): Promise<{
    success: boolean;
    data?: Event;
    message?: string;
    status: number;
    error?: string;
  }> {
    const { token } = useAuthStore.getState();
    if (!token) {
      return {
        success: false,
        error: 'No authentication token available',
        status: 401
      };
    }
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/events/${eventId}/registration`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            clubMemberId,
            totalRegistrations,
          }),
        }
      );

      if (!response.ok) {
        let errorMessage = 'Error al registrar en el evento';

        // Manejar códigos de error específicos en el servicio
        switch (response.status) {
          case 400:
            errorMessage = 'Solicitud incorrecta: Verifica los datos proporcionados';
            break;
          case 401:
            errorMessage = 'No autorizado: Por favor inicia sesión para continuar';
            break;
          case 403:
            errorMessage = 'Acceso prohibido: No tienes permisos para registrarte en eventos';
            break;
          case 404:
            errorMessage = 'Evento o Miembro no encontrado';
            break;
          case 409:
            errorMessage = 'El evento está lleno o el socio ya está registrado';
            break;
          case 500:
            errorMessage = 'Error interno del servidor: Por favor intenta más tarde';
            break;
          default:
            const errorText = await response.text();
            errorMessage = `Error en la solicitud: ${response.status}. Detalles: ${errorText}`;
        }

        return {
          success: false,
          error: errorMessage,
          status: response.status
        };
      }

      const result: EventRegistrationApiResponse = await response.json();

      const event: Event = {
        id: eventId,
        name: '', // No se proporciona en la respuesta
        description: '',
        date: '',
        time: '',
        location: '',
        eventType: 'SOCIAL', // Valor por defecto
        availableSpots: result.data.availableSpots,
        totalSpots: 0, // No se proporciona en la respuesta
        isRegistered: true,
        ocupedSpots: 0, // Calculado posteriormente
      };

      return {
        success: true,
        data: event,
        message: 'Registro completado exitosamente',
        status: response.status
      };
    } catch (error) {
      console.error('Error registering for event:', error);
      return {
        success: false,
        error: 'Error desconocido al registrar en el evento',
        status: 500
      };
    }
  },

  /**
   * Cancelar el registro de un usuario en un evento
   */
  async cancelEventRegistration(eventId: string, clubMemberId: string): Promise<{
    success: boolean;
    data?: {
      message: string;
      eventName: string;
      memberId: number;
    };
    message?: string;
    status: number;
    error?: string;
  }> {
    const { token } = useAuthStore.getState();
    if (!token) {
      return {
        success: false,
        error: 'No authentication token available',
        status: 401
      };
    }

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/events/${eventId}/registrations/members/${clubMemberId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'accept': '*/*',
          },
        }
      );

      if (!response.ok) {
        let errorMessage = 'Error al cancelar el registro';

        // Manejar códigos de error específicos en el servicio
        switch (response.status) {
          case 404:
            errorMessage = 'Registro no encontrado';
            break;
          case 500:
            errorMessage = 'Error interno del servidor: Por favor intenta más tarde';
            break;
          default:
            const errorText = await response.text();
            errorMessage = `Error en la solicitud: ${response.status}. Detalles: ${errorText}`;
        }

        return {
          success: false,
          error: errorMessage,
          status: response.status
        };
      }

      const result: EventCancellationApiResponse = await response.json();

      return {
        success: true,
        data: result.data,
        message: result.data.message,
        status: response.status
      };
    } catch (error) {
      console.error('Error canceling event registration:', error);
      return {
        success: false,
        error: 'Error desconocido al cancelar el registro',
        status: 500
      };
    }
  },

};