import { useAuthStore, type AuthState } from '../features/auth/store/useAuthStore';
import { useProfileStore } from '../features/profile/store/useProfileStore';

// Re-export store hooks
export { useAuthStore, useProfileStore };

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
