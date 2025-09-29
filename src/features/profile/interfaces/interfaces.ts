import { ViewStyle } from "react-native";
import { EmergencyContact, FamilyMember, UserProfile, Vehicle } from "../../../interfaces";


export interface userProfile extends UserProfile {}
export interface vehicle extends Vehicle {}
export interface familyMember extends FamilyMember {}
export interface emergencyContact extends EmergencyContact {}

// Tipo para la actualización del perfil
export interface updateProfileData extends Omit<Partial<userProfile>, 'memberSince'> {
  memberSince?: Date; // Al actualizar, forzamos que sea Date
}

export interface vehiclesProps {
  vehicles?: Vehicle[];
  onAddVehicle?: () => void;
  style?: ViewStyle;
}
