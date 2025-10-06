export interface Survey {
  id: string;
  title: string;
  description: string;
  category: SurveyCategory;
  priority: SurveyPriority;
  estimatedTime: string; // e.g. "3-5 min"
  participantCount: number; // e.g. 156 people
  questionCount: number; // e.g. 8 questions
  isActive: boolean;
  imageUrl?: string; // Placeholder for image URL
  averageRating?: number; // Average rating for completed surveys
  dateCreated?: string;
  dateCompleted?: string;
}

export interface SurveyQuestion {
  id: string;
  surveyId: string;
  question: string;
  type: 'multiple-choice' | 'rating' | 'text' | 'yes-no';
  options?: string[]; // For multiple-choice questions
  required: boolean;
}

export enum SurveyCategory {
  ALL = 'Todas',
  SERVICES = 'Servicios',
  RESTAURANT = 'Restaurante',
  SPORTS = 'Deportes',
  EVENTS = 'Eventos',
}

export enum SurveyPriority {
  URGENT = 'Urgente',
  IMPORTANT = 'Importante',
  NORMAL = 'Normal',
  LOW = 'Baja',
}

export interface SurveyFilter {
  category: SurveyCategory;
  status: 'activas' | 'completadas';
}

export interface SurveyCardProps {
  survey: Survey;
  onPress: (surveyId: string) => void;
  surveyId: string;
}

export interface HeaderWithStatsProps {
  activeSurveys: number;
  completedSurveys: number;
  averageRating: number;
}

export interface FilterSectionProps {
  selectedCategory: SurveyCategory;
  selectedStatus: 'activas' | 'completadas';
  onCategoryChange: (category: SurveyCategory) => void;
  onStatusChange: (status: 'activas' | 'completadas') => void;
}