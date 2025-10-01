import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Menu, MenusState } from '../interfaces/menuInterface';
import { menuService } from '../services/menuService';

export const useMenusStore = create<MenusState>()(
  devtools(
    (set) => ({
      menus: menuService.getSampleMenus(),
      setMenus: (menus) => set({ menus }),
      addMenu: (menu) => 
        set((state) => ({
          menus: [...state.menus, { ...menu, id: Date.now().toString() }]
        })),
      updateMenu: (id, updates) =>
        set((state) => ({
          menus: state.menus.map((menu) =>
            menu.id === id ? { ...menu, ...updates } : menu
          )
        })),
      deleteMenu: (id) =>
        set((state) => ({
          menus: state.menus.filter((menu) => menu.id !== id)
        }))
    }),
    { name: 'menus-store' }
  )
);
