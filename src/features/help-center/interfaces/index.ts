export interface FAQ {
  id: number;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}

export interface HelpCenterResponse {
  success: boolean;
  data: FAQ[];
  timestamp: string;
  messageId: string;
  traceId: string;
}

export interface HelpCenterHeaderProps {
  title: string;
  description: string;
  icon?: string;
}
