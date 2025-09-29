
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  membershipType?: string;
  memberSince?: Date | string; // Acepta tanto Date como string
  familyMembers?: FamilyMember[];
  vehicles?: Vehicle[];
  emergencyContact?: EmergencyContact;
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