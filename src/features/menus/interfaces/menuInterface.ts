export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  isVegetarian?: boolean;
  isGlutenFree?: boolean;
}

export interface Menu {
  id: string;
  name: string;
  date: string;
  type: 'daily' | 'weekly' | 'special';
  items: MenuItem[];
  startTime?: string;
  endTime?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface MenusState {
  menus: Menu[];
  loading: boolean;
  error: string | null;
  setMenus: (menus: Menu[]) => void;
  addMenu: (menu: Omit<Menu, 'id'>) => void;
  updateMenu: (id: string, updates: Partial<Menu>) => void;
  deleteMenu: (id: string) => void;
  fetchMenus: () => Promise<void>;
  getMenusByType: (type: Menu['type']) => Menu[];
}
