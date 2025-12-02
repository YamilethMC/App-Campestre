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
      createdAt: string;
      updatedAt: string;
      dateISO: string;
      availableSpots: number;
      ocupedSpots: number;
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
    events: Event[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }> {
    console.log('HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    const { token } = useAuthStore.getState();
    if (!token) {
      throw new Error('No authentication token available');
    }

    try {
      // Construir la URL con los parámetros
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '1', // Límite fijo
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
      console.log('URL DE EVENTOS:', url);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': 'application/json',
        },
      });

      if (!response.ok) {
        let errorMessage = 'Error al cargar los eventos';

        switch (response.status) {
          case 400:
            errorMessage = 'Solicitud incorrecta: Verifica los parámetros proporcionados';
            break;
          case 401:
            errorMessage = 'No autorizado: Por favor inicia sesión para continuar';
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

        throw new Error(errorMessage);
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
        registeredUsers: [], // La API no proporciona esta información directamente
        ocupedSpots: apiEvent.totalSpots - apiEvent.availableSpots,
      }));
      console.log('EVENTOS:', events);
      return {
        events,
        meta: result.data.meta,
      };
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },

  /**
   * Obtener detalles de un miembro del club
   */
  async getMemberDetails(memberId: number): Promise<MemberDetailsResponse> {
    const { token } = useAuthStore.getState();
    if (!token) {
      throw new Error('No authentication token available');
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

        switch (response.status) {
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

        throw new Error(errorMessage);
      }

      const result: ApiResponse<MemberDetailsResponse> = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching member details:', error);
      throw error;
    }
  },

  /**
   * Registrar usuario a un evento
   */
  async registerForEvent(eventId: string, clubMemberId: string, totalRegistrations: number = 1): Promise<Event> {
    const { token } = useAuthStore.getState();
    if (!token) {
      throw new Error('No authentication token available');
    }
    console.log('REGISTRANDO EVENTO:', { eventId, clubMemberId, totalRegistrations });
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

        switch (response.status) {
          case 400:
            errorMessage = 'Solicitud incorrecta: Verifica los datos proporcionados';
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

        throw new Error(errorMessage);
      }

      const result: EventRegistrationApiResponse = await response.json();

      // Aquí retornamos un evento actualizado, aunque no tenemos toda la información original
      // En una implementación más completa, se debería hacer otra llamada para obtener el evento actualizado
      return {
        id: eventId,
        name: '', // No se proporciona en la respuesta
        description: '',
        date: '',
        time: '',
        location: '',
        eventType: 'SOCIAL', // Valor por defecto
        availableSpots: result.data.availableSpots,
        totalSpots: 0, // No se proporciona en la respuesta
        registeredUsers: [],
        ocupedSpots: 0, // Calculado posteriormente
      };
    } catch (error) {
      console.error('Error registering for event:', error);
      throw error;
    }
  },

};