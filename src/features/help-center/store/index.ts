import { create } from 'zustand';
import { FAQ } from '../interfaces';
import { helpCenterService } from '../services';

export interface HelpCenterStore {
  faqs: FAQ[];
  loading: boolean;
  error: string | null;

  // Actions
  setFAQs: (faqs: FAQ[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // API Actions
  fetchFAQs: () => Promise<void>;
}

export const useHelpCenterStore = create<HelpCenterStore>((set, get) => ({
  faqs: [],
  loading: false,
  error: null,

  setFAQs: (faqs) => set({ faqs }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  fetchFAQs: async () => {
    set({ loading: true, error: null });

    const response = await helpCenterService.getFAQs();

    if (response.success && response.data) {
      set({
        faqs: response.data,
        loading: false
      });
    } else {
      set({
        error: response.error || 'Error al obtener las preguntas frecuentes',
        loading: false
      });
    }
  }
}));