import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export enum ErrorAction {
  RETRY = 'RETRY',
  LOGIN = 'LOGIN',
  CONTACT_SUPPORT = 'CONTACT_SUPPORT',
  UPDATE_APP = 'UPDATE_APP',
  NONE = 'NONE',
}

export interface StandardErrorResponse {
  success: false;
  errorCode: string;
  message: string;
  technicalDetails?: string;
  action: ErrorAction;
  fields?: Record<string, string>;
  timestamp?: string;
  path?: string;
}

export interface StandardSuccessResponse<T = any> {
  success: true;
  data: T;
  message?: string;
}

export type ApiResponse<T = any> = StandardSuccessResponse<T> | StandardErrorResponse;

class ApiClient {
  private baseURL: string;
  private onUnauthorized?: () => void;
  private onOffline?: () => void;

  constructor() {
    this.baseURL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3003';
  }

  setOnUnauthorized(callback: () => void) {
    this.onUnauthorized = callback;
  }

  setOnOffline(callback: () => void) {
    this.onOffline = callback;
  }

  private async getAuthToken(): Promise<string | null> {
    return await AsyncStorage.getItem('authToken');
  }

  private async handleError(error: any, url: string, options: RequestInit): Promise<never> {
    if (!navigator.onLine) {
      if (this.onOffline) {
        this.onOffline();
      }
      throw {
        success: false,
        errorCode: 'NETWORK_ERROR',
        message: 'No hay conexión a internet. Por favor verifica tu conexión.',
        action: ErrorAction.RETRY,
      } as StandardErrorResponse;
    }

    if (error.message === 'Network request failed') {
      throw {
        success: false,
        errorCode: 'NETWORK_ERROR',
        message: 'Error de conexión con el servidor. Por favor intenta más tarde.',
        action: ErrorAction.RETRY,
      } as StandardErrorResponse;
    }

    throw error;
  }

  private async handleResponse<T>(
    response: Response,
    url: string,
    options: RequestInit,
  ): Promise<T> {
    if (response.status === 401) {
      if (this.onUnauthorized) {
        this.onUnauthorized();
      }
      throw {
        success: false,
        errorCode: 'UNAUTHORIZED',
        message: 'Tu sesión ha expirado. Por favor inicia sesión nuevamente.',
        action: ErrorAction.LOGIN,
      } as StandardErrorResponse;
    }

    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');

    if (!response.ok) {
      if (isJson) {
        const errorData = await response.json();
        throw errorData as StandardErrorResponse;
      } else {
        throw {
          success: false,
          errorCode: `HTTP_${response.status}`,
          message: `Error del servidor (${response.status})`,
          action: ErrorAction.RETRY,
        } as StandardErrorResponse;
      }
    }

    if (isJson) {
      return await response.json();
    }

    return response as any;
  }

  async get<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = await this.getAuthToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'GET',
        headers,
        ...options,
      });

      return await this.handleResponse<T>(response, endpoint, options);
    } catch (error) {
      return await this.handleError(error, endpoint, options);
    }
  }

  async post<T>(endpoint: string, data?: any, options: RequestInit = {}): Promise<T> {
    const token = await this.getAuthToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers,
        body: data ? JSON.stringify(data) : undefined,
        ...options,
      });

      return await this.handleResponse<T>(response, endpoint, options);
    } catch (error) {
      return await this.handleError(error, endpoint, options);
    }
  }

  async put<T>(endpoint: string, data?: any, options: RequestInit = {}): Promise<T> {
    const token = await this.getAuthToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PUT',
        headers,
        body: data ? JSON.stringify(data) : undefined,
        ...options,
      });

      return await this.handleResponse<T>(response, endpoint, options);
    } catch (error) {
      return await this.handleError(error, endpoint, options);
    }
  }

  async patch<T>(endpoint: string, data?: any, options: RequestInit = {}): Promise<T> {
    const token = await this.getAuthToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PATCH',
        headers,
        body: data ? JSON.stringify(data) : undefined,
        ...options,
      });

      return await this.handleResponse<T>(response, endpoint, options);
    } catch (error) {
      return await this.handleError(error, endpoint, options);
    }
  }

  async delete<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = await this.getAuthToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'DELETE',
        headers,
        ...options,
      });

      return await this.handleResponse<T>(response, endpoint, options);
    } catch (error) {
      return await this.handleError(error, endpoint, options);
    }
  }
}

export const apiClient = new ApiClient();
