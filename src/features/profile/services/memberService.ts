import { handleAuthError } from '../../../shared/utils/authErrorHandler';
import { userProfile } from "../interfaces/interfaces";

export interface MemberData {
  id: number;
  memberCode: number;
  title: string;
  profession: string;
  paymentMethod: string;
  dateOfAdmission: string;
  foreignMember: boolean;
  createdAt: string;
  updatedAt: string;
  userId: number;
  invitedById: number | null;
  relationship: string | null;
  user: {
    id: number;
    email: string;
    name: string;
    lastName: string;
    addressId: number;
    type: string;
    active: boolean;
    birthDate: string;
    gender: string;
    RFC: string;
    createdAt: string;
    updatedAt: string;
    roleId: number | null;
    address: {
      id: number;
      street: string;
      externalNumber: string;
      internalNumber: string;
      suburb: string;
      city: string;
      zipCode: string;
      state: string;
      country: string;
    };
    phone: any[]; // Cambié de [] a any[] para evitar problemas de tipo
    role: null;
    qrCode: [];
  };
  invitedBy: null;
  guests: [];
}

export interface MemberProfile {
  id: string;
  name: string;
  lastName: string;
  email?: string;
  phone?: string;
  address?: string;
  street?: string;
  externalNumber?: string;
  internalNumber?: string;
  colony?: string;
  zipCode?: string;
  city?: string;
  state?: string;
  country?: string;
  membershipType?: string;
  memberSince?: string | Date;
}

export interface AddFamilyMemberRequest {
  email: string;
  active: boolean;
  name: string;
  lastName: string;
  type: string;
  birthDate: string;
  gender: string;
  RFC?: string;
  expireAt?: string; // Optional field for temporary pass
  address: {
    street: string;
    externalNumber: string;
    internalNumber: string;
    suburb: string;
    city: string;
    zipCode: string;
    state: string;
    country: string;
  };
  phone: {
    number: string;
    alias: string;
    type: string;
  }[];
  invitedById: number;
  relationship: string;
}

export interface AddFamilyMemberResponse {
  success: boolean;
  data: {
    id: number;
    memberCode: number | null;
    title: string | null;
    profession: string | null;
    paymentMethod: string;
    dateOfAdmission: string;
    foreignMember: boolean;
    createdAt: string;
    updatedAt: string;
    invitedById: number;
    relationship: string;
    user: {
      id: number;
      email: string;
      name: string;
      lastName: string;
    };
  };
  timestamp: string;
  messageId: string;
  traceId: string;
}

export interface GetMemberResponse {
  success: boolean;
  data: {
    id: number;
    memberCode: number;
    title: string;
    profession: string;
    paymentMethod: string;
    dateOfAdmission: string;
    foreignMember: boolean;
    createdAt: string;
    updatedAt: string;
    invitedById: number | null;
    relationship: string | null;
    user: {
      id: number;
      email: string;
      password: string;
      name: string;
      lastName: string;
      addressId: number;
      type: string;
      active: boolean;
      birthDate: string;
      gender: string;
      RFC: string;
      createdAt: string;
      updatedAt: string;
      roleId: number | null;
      address: {
        id: number;
        street: string;
        externalNumber: string;
        internalNumber: string;
        suburb: string;
        city: string;
        zipCode: string;
        state: string;
        country: string;
      };
      phone: any[];
      role: null;
      qrCode: any[];
    };
    invitedBy: null;
    guests: Array<{
      id: number;
      memberCode: number | null;
      title: string | null;
      profession: string | null;
      paymentMethod: string;
      dateOfAdmission: string;
      foreignMember: boolean;
      createdAt: string;
      updatedAt: string;
      invitedById: number;
      relationship: string;
      user: {
        id: number;
        name: string;
        lastName: string;
        email: string;
      };
    }>;
  };
  timestamp: string;
  messageId: string;
  traceId: string;
}

// Interface for service responses
interface ServiceResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  status: number;
}

export const memberService = {
  /**
   * Obtener la información del miembro del club por ID
   */
  getMemberById: async (memberId: string | number, token: string): Promise<ServiceResponse<MemberProfile>> => {
    if (!token) {
      return {
        success: false,
        error: 'No authentication token available',
        status: 401
      };
    }

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/club-members/${memberId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'accept': '*/*',
        },
      });

      if (!response.ok) {
        // Verificar si es un error de autenticación
        if (response.status === 401) {
          // Llamar a la función global para manejar el error de autenticación
          handleAuthError();
          return {
            success: false,
            error: 'No autorizado: Sesión expirada',
            status: response.status
          };
        }

        let errorMessage = 'Error al cargar los datos del miembro';

        // Manejar códigos de error específicos en el servicio
        switch (response.status) {
          case 401:
            errorMessage = 'No autorizado: Por favor inicia sesión para continuar';
            break;
          case 404:
            errorMessage = 'Socio no encontrado';
            break;
          case 500:
            errorMessage = 'Error interno del servidor: Por favor intenta más tarde';
            break;
          default:
            errorMessage = 'Error al cargar los datos del miembro';
        }

        return {
          success: false,
          error: errorMessage,
          status: response.status
        };
      }

      const result: GetMemberResponse = await response.json();
      const data = result.data;
      const memberProfile: userProfile = {
        id: data.id.toString(),
        memberCode: data.memberCode ? Number(data.memberCode) : undefined,
        title: data.title,
        profession: data.profession,
        paymentMethod: data.paymentMethod,
        dateOfAdmission: data.dateOfAdmission,
        foreignMember: data.foreignMember,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        userId: data.user.id,
        invitedById: data.invitedById,
        relationship: data.relationship,
        name: data.user.name,
        lastName: data.user.lastName,
        addressId: data.user.addressId,
        type: data.user.type,
        active: data.user.active,
        birthDate: data.user.birthDate,
        gender: data.user.gender,
        RFC: data.user.RFC,
        roleId: data.user.roleId,
        email: data.user.email,
        phone: data.user.phone.length > 0 ? data.user.phone[0].number : undefined,
        address: `Calle ${data.user.address.street} ${data.user.address.externalNumber}, Colonia ${data.user.address.suburb}, C.P. ${data.user.address.zipCode}, ${data.user.address.city}, ${data.user.address.state}, ${data.user.address.country}`,
        street: data.user.address.street,
        externalNumber: data.user.address.externalNumber,
        internalNumber: data.user.address.internalNumber,
        colony: data.user.address.suburb,
        zipCode: data.user.address.zipCode,
        city: data.user.address.city,
        state: data.user.address.state,
        country: data.user.address.country,
        membershipType: data.user.type,
        memberSince: data.dateOfAdmission,
        role: data.user.role,
        qrCode: data.user.qrCode,
        invitedBy: data.invitedBy,
        guests: data.guests,
        familyMembers: data.guests.map(guest => ({
          id: guest.id,
          name: guest.user.name,
          lastName: guest.user.lastName,
          relationship: translateRelationship(guest.relationship),
          age: 0, // Temporalmente 0 ya que en "guest.user" no viene la fecha de nacimiento completa
          isActive: data.user.active
        })),
      };

      return {
        success: true,
        data: memberProfile,
        message: 'Datos del miembro cargados exitosamente',
        status: response.status
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Error desconocido al cargar los datos del miembro',
        status: 500
      };
    }
  },

  /**
   * Agregar un nuevo miembro de la familia
   */
  addFamilyMember: async (memberData: AddFamilyMemberRequest, token: string): Promise<ServiceResponse<AddFamilyMemberResponse>> => {
    if (!token) {
      return {
        success: false,
        error: 'No authentication token available',
        status: 401
      };
    }

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/club-members`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'accept': '*/*',
        },
        body: JSON.stringify(memberData),
      });
      if (!response.ok) {
        // Verificar si es un error de autenticación
        if (response.status === 401) {
          // Llamar a la función global para manejar el error de autenticación
          handleAuthError();
          return {
            success: false,
            error: 'No autorizado: Sesión expirada',
            status: response.status
          };
        }

        let errorMessage = 'Error al agregar miembro de la familia';

        // Manejar códigos de error específicos en el servicio
        switch (response.status) {
          case 400:
            errorMessage = 'Datos de entrada inválidos';
            break;
          case 401:
            errorMessage = 'No autorizado: Por favor inicia sesión para continuar';
            break;
          case 409:
            errorMessage = 'El correo electrónico ya está en uso';
            break;
          case 500:
            errorMessage = 'Error interno del servidor: Por favor intenta más tarde';
            break;
          default:
            errorMessage = 'Error al agregar invitado';
        }

        return {
          success: false,
          error: errorMessage,
          status: response.status
        };
      }

      const result: AddFamilyMemberResponse = await response.json();

      return {
        success: true,
        data: result,
        message: 'Miembro de la familia agregado exitosamente',
        status: response.status
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Error desconocido al agregar miembro de la familia',
        status: 500
      };
    }
  },
};

// Función auxiliar para calcular la edad
const calculateAge = (birthDateString: string): number => {
  const birthDate = new Date(birthDateString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

// Función para traducir la relación al español
const translateRelationship = (relationship: string): string => {
  switch (relationship.toUpperCase()) {
    case 'WIFE':
      return 'Esposa';
    case 'HUSBAND':
      return 'Esposo';
    case 'SON':
      return 'Hijo';
    case 'DAUGHTER':
      return 'Hija';
    case 'FATHER':
      return 'Padre';
    case 'MOTHER':
      return 'Madre';
    case 'BROTHER':
      return 'Hermano';
    case 'SISTER':
      return 'Hermana';
    case 'FRIEND':
      return 'Amigo';
    case 'OTHER':
      return 'Otro';
    default:
      return relationship; // Devolver el valor original si no se encuentra traducción
  }
};

export interface UpdateUserRequest {
  email?: string;
  name?: string;
  lastName?: string;
  phone?: {
    number: string;
    alias: string;
    type: string;
  }[];
  address?: {
    street: string;
    externalNumber: string;
    internalNumber: string;
    suburb: string;
    city: string;
    zipCode: string;
    state: string;
    country: string;
  };
}

export interface UpdateUserResponse {
  success: boolean;
  data: any;
  timestamp: string;
  messageId: string;
  traceId: string;
}

// Interface for service responses
interface ServiceResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  status: number;
}

export const updateUser = async (userId: number, userData: UpdateUserRequest, token: string): Promise<ServiceResponse<UpdateUserResponse>> => {
  if (!token) {
    return {
      success: false,
      error: 'No authentication token available',
      status: 401
    };
  }
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'accept': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      // Verificar si es un error de autenticación
      if (response.status === 401) {
        // Llamar a la función global para manejar el error de autenticación
        handleAuthError();
        return {
          success: false,
          error: 'No autorizado: Sesión expirada',
          status: response.status
        };
      }

      let errorMessage = 'Error al actualizar el perfil';

      // Manejar códigos de error específicos
      switch (response.status) {
        case 400:
          errorMessage = 'Datos de entrada inválidos';
          break;
        case 401:
          errorMessage = 'No autorizado: Por favor inicia sesión para continuar';
          break;
        case 404:
          errorMessage = 'Usuario no encontrado';
          break;
        case 409:
          errorMessage = 'Ya existe un usuario con este correo electrónico';
          break;
        case 500:
          errorMessage = 'Error interno del servidor: Por favor intenta más tarde';
          break;
        default:
          errorMessage = `Error al actualizar el perfil: ${response.status}`;
      }

      return {
        success: false,
        error: errorMessage,
        status: response.status
      };
    }

    const result: UpdateUserResponse = await response.json();
    return {
      success: true,
      data: result,
      message: 'Perfil actualizado exitosamente',
      status: response.status
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Error desconocido al actualizar el perfil',
      status: 500
    };
  }
};