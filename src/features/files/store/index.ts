import { create, StateCreator } from 'zustand';
import { File, PaginationMeta } from '../interfaces';
import { fileService } from '../services';

export interface FileStore {
  files: File[];
  pagination: PaginationMeta;
  loading: boolean;
  search: string;
  error: string | null;

  // Actions
  setFiles: (files: File[]) => void;
  setLoading: (loading: boolean) => void;
  setSearch: (search: string) => void;
  setError: (error: string | null) => void;
  setPagination: (pagination: PaginationMeta) => void;

  // API Actions
  fetchFiles: (page: number) => Promise<void>;
  downloadFile: (fileId: number) => Promise<void>;
}

export const useFileStore = create<FileStore>((set, get) => ({
  files: [],
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  },
  loading: false,
  search: '',
  error: null,

  setFiles: (files) => set({ files }),
  setLoading: (loading) => set({ loading }),
  setSearch: (search) => set({ search }),
  setError: (error) => set({ error }),
  setPagination: (pagination) => set({ pagination }),

  fetchFiles: async (page: number) => {
    const { search } = get();
    set({ loading: true, error: null });

    try {
      const response = await fileService.getFiles(page, 10, search, 'asc', 'name');

      if (response.success) {
        set({
          files: response.data.files,
          pagination: response.data.meta,
          loading: false
        });
      } else {
        set({ error: response.message || 'Error al obtener los archivos', loading: false });
      }
    } catch (error: any) {
      set({ error: error.message || 'Error al obtener los archivos', loading: false });
    }
  },

  downloadFile: async (fileId: number) => {
    try {
      await fileService.downloadFile(fileId);
    } catch (error: any) {
      set({ error: error.message || 'Error al descargar el archivo' });
      throw error;
    }
  }
}));