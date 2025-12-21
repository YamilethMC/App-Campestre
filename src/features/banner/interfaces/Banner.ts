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
  typeActionId: number;
}

export interface GetAvailableBannersResponse {
  banners: Banner[];
}
