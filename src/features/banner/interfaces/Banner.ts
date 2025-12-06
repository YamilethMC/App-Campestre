export interface Banner {
  id: number;
  title: string;
  description: string;
  image: string; // Base64 encoded image string
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetAvailableBannersResponse {
  banners: Banner[];
}