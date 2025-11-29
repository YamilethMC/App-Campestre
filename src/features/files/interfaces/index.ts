export interface File {
  id: number;
  name: string;
  description: string;
  type: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface FileApiResponse {
  success: boolean;
  data: {
    files: File[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
  timestamp: string;
  messageId: string;
  traceId: string;
  message?: string;
}

export interface FileDownloadResponse {
  success: boolean;
  data: any; // El contenido del archivo
  message: string;
  timestamp: string;
  messageId: string;
  traceId: string;
}

export interface FileError {
  code: number;
  message: string;
  details?: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface FileHeaderProps {
  title: string;
  description: string;
  icon?: string;
}