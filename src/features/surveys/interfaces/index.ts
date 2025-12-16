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
  image?: string; // Image URL (replaces imageUrl)
  responsesShow?: boolean; // Whether to show response count
  averageRating?: number; // Average rating for completed surveys
  dateCreated?: string;
  dateCompleted?: string;
}

export interface OptionType {
  value: string;
  label: string;
}

export interface FullSurvey {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: string;
  timeStimed: string;
  questionCount: number;
  participantCount: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  surveyQuestions: SurveyQuestion[];
  _count: {
    responses: number;
    surveyQuestions: number;
  };
}

export interface SurveyQuestion {
  id: string;
  surveyId: string;
  question: string;
  type: 'SELECT' | 'NUMBER' | 'TEXT' | 'BOOLEAN';
  options?: OptionType[] | string[]; // For multiple-choice questions
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