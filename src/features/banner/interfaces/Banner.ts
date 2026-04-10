export interface Banner {
  id: number;
  title: string;
  description: string;
  image: string; // URL or Base64 encoded image string
  order?: number; // Opcional porque no está en la respuesta del API
  active: boolean;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  destination: string | null;
  actionType: 'MODAL' | 'EXTERNAL_LINK';
}

export interface GetAvailableBannersResponse {
  success: boolean;
  banners: Banner[];
  error?: string;
  status: number;
}