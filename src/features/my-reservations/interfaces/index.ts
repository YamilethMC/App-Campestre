export interface Facility {
  id: number;
  name: string;
  type: string;
  description: string;
  status: string;
  openTime: string;
  closeTime: string;
  maxDuration: number;
  createdAt: string;
  updatedAt: string;
}

export interface Reservation {
  id: number;
  facilityId: number;
  clubMemberId: number;
  startTime: string; // ISO 8601 format
  endTime: string; // ISO 8601 format
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED' | string;
  createdAt: string;
  updatedAt: string;
  facility: Facility;
}

export interface GetReservationsResponse {
  success: boolean;
  data: Reservation[];
  timestamp: string;
  messageId: string;
  traceId: string;
  message?: string;
}

export interface CancelReservationRequest {
  startTime: string; // ISO 8601 format
  endTime: string; // ISO 8601 format
  status: 'CANCELLED';
}

export interface CancelReservationResponse {
  success: boolean;
  data: any;
  timestamp: string;
  messageId: string;
  traceId: string;
  message?: string;
}

export interface ServiceResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  status: number;
}
