export interface AccountStatement {
  id: string;
  month: string;
  year: number;
  period: string;
  date: string; // ISO date string
  dueDate: string; // Due date for payment
  totalAmount: number;
  status: string;
  concept: string;
  description: string;
  details: AccountStatementDetail[];
  summary: AccountStatementSummary[];
  pdfUrl: string;
  fileName: string;
  downloadUrl: string;
  userInfo: AccountStatementUserInfo;
}

export interface AccountStatementDetail {
  concept: string;
  charges: number | null;
  credits: number | null;
}

export interface AccountStatementSummary {
  concept: string;
  amount: number;
}

export interface AccountStatementUserInfo {
  id: string;
  name: string;
  address: string;
  city: string;
  memberCode: string;
  postalCode: string;
  memberSince: Date;
  membershipType: string;
}

export interface AccountStatementFilter {
  month?: string;
  year?: number;
  status?: 'paid' | 'pending' | 'overdue';
}

// Define the props for components
export interface AccountStatementHeaderProps {
  title?: string;
  description?: string;
}

export interface AccountStatementCardProps {
  statement: AccountStatement;
  onPress: (statement: AccountStatement) => void;
  onDownload: (statement: AccountStatement) => void;
}

export interface AccountStatementDetailProps {
  statement: AccountStatement | null;
  onClose: () => void;
  onDownload: (statement: AccountStatement) => void;
}
