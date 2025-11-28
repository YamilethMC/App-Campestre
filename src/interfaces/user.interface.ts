
export interface UserProfile {
  memberCode?: number;
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
  memberSince?: Date | string; // Acepta tanto Date como string
  familyMembers?: FamilyMember[];
  vehicles?: Vehicle[];
  emergencyContact?: EmergencyContact;
  title?: string;
  profession?: string;
  paymentMethod?: string;
  dateOfAdmission?: string;
  foreignMember?: boolean;
  createdAt?: string;
  updatedAt?: string;
  userId?: number;
  invitedById?: number | null;
  relationship?: string | null;
  role?: any;
  qrCode?: any[];
  invitedBy?: any;
  guests?: any[];
  addressId?: number;
  type?: string;
  active?: boolean;
  birthDate?: string;
  gender?: string;
  RFC?: string;
  roleId?: number | null;
}

// Interface of emergency contact
export interface EmergencyContact {
    name: string;
    relationship: string;
    phone: string;
  }
  
 export interface FamilyMember {
    id: number;
    name: string;
    lastName?: string;
    relationship: string;
    age: number;
    isActive: boolean;
  }
  
  // Interfaces of vehicle
  export interface Vehicle {
    id: number;
    plate: string;
    model: string;
    isActive: boolean;
  }