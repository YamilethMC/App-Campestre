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

export const memberService = {
  /**
   * Obtener la información del miembro del club por ID
   */
  getMemberById: async (memberId: string | number, token: string): Promise<MemberProfile> => {
    if (!token) {
      throw new Error('No authentication token available');
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
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('response memberService.getMemberById: ', response);
      const result = await response.json();
      const data = result.data
      console.log('result memberService.getMemberById: ', result);
      console.log('data memberService.getMemberById: ', data);
      // Transformar la respuesta de la API a la interfaz MemberProfile
      const { user } = result.data;
      console.log('user data memberService.getMemberById: ', user);
      const memberProfile: userProfile = {
        id: data.id.toString(),
        memberCode: data.memberCode,
        title: data.title,
        profession: data.profession,
        paymentMethod: data.paymentMethod,
        dateOfAdmission: data.dateOfAdmission,
        foreignMember: data.foreignMember,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        userId: data.user.userId,
        invitedById: user.invitedById,
        relationship: user.relationship,
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
        phone: data.user.phone.length > 0 ? data.user.phone[0] : undefined, // Suponiendo que phone es un array
        address: `${user.address.street}, ${user.address.suburb}, ${user.address.city}, ${user.address.state}, ${user.address.country}`,
        street: data.user.address.street,
        externalNumber: data.user.address.externalNumber,
        internalNumber: data.user.address.internalNumber,
        colony: data.user.address.suburb,
        zipCode: data.user.address.zipCode,
        city: data.user.address.city,
        state: data.user.address.state,
        country: data.user.address.country,
        membershipType: user.type,
        memberSince: result.data.dateOfAdmission,
        role: data.user.role,
        qrCode: data.user.qrCode,
        invitedBy: data.invitedBy,
        guests: data.guests,
      };

      return memberProfile;
    } catch (error) {
      console.error('Error fetching member data:', error);
      throw error;
    }
  },
};