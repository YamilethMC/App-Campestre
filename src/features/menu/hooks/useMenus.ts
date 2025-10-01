import { useTranslation } from 'react-i18next';
import { useMenusStore } from '../store/useMenuStore';

export const useMenus = () => {
  const { t } = useTranslation('menus');
  const { menus, setMenus, addMenu, updateMenu, deleteMenu } = useMenusStore();

  const getMenuById = (id: string) => {
    return menus.find(menu => menu.id === id);
  };

  const getMenusByType = (type: 'daily' | 'weekly' | 'special') => {
    return menus.filter(menu => menu.type === type);
  };

  return {
    menus,
    setMenus,
    addMenu,
    updateMenu,
    deleteMenu,
    getMenuById,
    getMenusByType,
    t
  };
};

export const useMenuForm = () => {
  const { t } = useTranslation('menus');
  
  const validateMenu = (menu: any) => {
    const errors: Record<string, string> = {};
    
    if (!menu.name?.trim()) {
      errors.name = t('errors.nameRequired');
    }
    
    if (!menu.date) {
      errors.date = t('errors.dateRequired');
    }
    
    if (!menu.type) {
      errors.type = t('errors.typeRequired');
    }
    
    if (!menu.items?.length) {
      errors.items = t('errors.itemsRequired');
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };
  
  return {
    validateMenu,
    t
  };
};