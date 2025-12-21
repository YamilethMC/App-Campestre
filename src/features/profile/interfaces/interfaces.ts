import { ViewStyle } from 'react-native';
import { EmergencyContact, FamilyMember, UserProfile, Vehicle } from '../../../interfaces';

export interface userProfile extends UserProfile {
  isEditing?: boolean;
  onNameChange?: (text: string) => void;
  onlastNameChange?: (text: string) => void;
  onEmailChange?: (text: string) => void;
  onPhoneChange?: (text: string) => void;
  onAddressChange?: (text: string) => void;
  onStreetChange?: (text: string) => void;
  onexternalNumberChange?: (text: string) => void;
  oninternalNumberChange?: (text: string) => void;
  oncolonyChange?: (text: string) => void;
  onzipCodeChange?: (text: string) => void;
  oncityChange?: (text: string) => void;
  onstateChange?: (text: string) => void;
  oncountryChange?: (text: string) => void;
  style?: ViewStyle;
  rightAction?: React.ReactNode;
  isActive?: boolean;
  photoUrl?: string;
}

export interface vehicle extends Vehicle {}

export interface familyMember extends FamilyMember {}

export interface emergencyContact extends EmergencyContact {
  emergencyContact?: EmergencyContact;
  style?: ViewStyle;
  isEditingContactEmergency: boolean;
  onNameChange: (text: string) => void;
  onRelationshipChange: (text: string) => void;
  onPhoneChange: (text: string) => void;
  rightAction?: React.ReactNode;
}

// Tipo para la actualización del perfil
export interface updateProfileData extends Omit<Partial<userProfile>, 'memberSince'> {
  memberSince?: Date; // Al actualizar, forzamos que sea Date
}

export interface vehiclesProps {
  vehicles?: Vehicle[];
  onAddVehicle?: () => void;
  style?: ViewStyle;
}

export interface emergencyContactProps extends EmergencyContact {
  emergencyContact?: EmergencyContact;
  style?: ViewStyle;
  isEditingContactEmergency: boolean;
  onNameChange: (text: string) => void;
  onRelationshipChange: (text: string) => void;
  onPhoneChange: (text: string) => void;
  rightAction?: React.ReactNode;
}

export interface familyMembers extends FamilyMember {}

export interface familyMembersProps {
  members: familyMember[];
  onAddMember?: () => void;
  style?: ViewStyle;
}

export interface personalInfoProps extends UserProfile {
  isEditing?: boolean;
  onNameChange?: (text: string) => void;
  onEmailChange?: (text: string) => void;
  onPhoneChange?: (text: string) => void;
  onAddressChange?: (text: string) => void;
  style?: ViewStyle;
  rightAction?: React.ReactNode;
}

export interface sectionCardProps {
  title: string;
  rightAction?: React.ReactNode;
  style?: ViewStyle;
  children: React.ReactNode;
}
