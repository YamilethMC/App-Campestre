import { useAuthStore, type AuthState } from '../features/auth/store/useAuthStore';
import { useProfileStore } from '../features/profile/store/useProfileStore';
import { useMenusStore } from '../features/menus/store/useMenusStore';

// Re-export store hooks
export { useAuthStore, useProfileStore, useMenusStore };

// Common types
export interface SurveyResponse {
  id: string;
  // Add other survey response fields as needed
  [key: string]: any;
}

// For backward compatibility with existing code
export const useStore = () => {
  const authStore = useAuthStore();
  const profileStore = useProfileStore();
  const menusStore = useMenusStore();
  
  return {
    // Auth store
    isAuthenticated: authStore.isAuthenticated,
    user: authStore.userId, // Using userId as user
    login: authStore.setAuthData, // Alias for setAuthData
    logout: authStore.clearAuth,  // Alias for clearAuth
    
    // Profile store
    profile: profileStore.profile,
    updateProfile: profileStore.updateProfile,
    clearProfile: profileStore.clearProfile,
    
    // Menus store
    menus: menusStore.menus,
    setMenus: menusStore.setMenus,
    addMenu: menusStore.addMenu,
    updateMenu: menusStore.updateMenu,
    deleteMenu: menusStore.deleteMenu,
    
    // For backward compatibility
    currentUser: profileStore.profile, // Alias for profile
    setProfile: profileStore.updateProfile, // Alias for updateProfile
    
    // Include additional auth store properties (except those already defined)
    userId: authStore.userId,
    token: authStore.token,
    refreshToken: authStore.refreshToken,
    expiresAt: authStore.expiresAt,
    isTokenExpired: authStore.isTokenExpired,
    setAuthData: authStore.setAuthData,
    clearAuth: authStore.clearAuth
  };
};
