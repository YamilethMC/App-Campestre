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
  getMemberById: async (memberId: string | number, token: string): Promise<MemberProfile | null> => {
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
        if (response.status === 404) {
          alert("Miembro no encontrado");
          return null;
        } else {
          alert(`Ocurrió un error: ${response.status}`);
        }
      }

      const result = await response.json();
      const data = result.data
      
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
        phone: data.user.phone.length > 0 ? data.user.phone[0] : undefined, // Suponiendo que phone es un array
        address: `${data.user.address.street} ${data.user.address.suburb} ${data.user.address.city} ${data.user.address.state} ${data.user.address.country}`,
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
      };

      return memberProfile;
    } catch (error) {
      console.error('Error fetching member data:', error);
      throw error;
    }
  },
};