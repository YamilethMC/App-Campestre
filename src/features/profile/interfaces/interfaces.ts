import { ViewStyle } from "react-native";

export interface userProfile {
  id: string;
  name: string;
  email: string;
  membershipType?: string;
  memberSince?: Date | string; // Acepta tanto Date como string
  familyMembers?: familyMember[];
  vehicles?: vehicle[];
  emergencyContact?: emergencyContact;
}

// Tipo para la actualización del perfil
export interface updateProfileData extends Omit<Partial<userProfile>, 'memberSince'> {
  memberSince?: Date; // Al actualizar, forzamos que sea Date
}

// Interface of emergency contact
interface emergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

interface familyMember {
  id: number;
  name: string;
  relationship: string;
  age: number;
  isActive: boolean;
}

// Interfaces of vehicle
export interface vehicle {
  id: number;
  plate: string;
  model: string;
  isActive: boolean;
}

export interface vehiclesProps {
  vehicles?: vehicle[];
  onAddVehicle?: () => void;
  style?: ViewStyle;
}
