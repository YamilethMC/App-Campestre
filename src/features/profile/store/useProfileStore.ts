import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserProfile } from '../../auth/services/authService';

interface ProfileState {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile | null) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,
      
      setProfile: (profile) => set({ profile }),
      
      updateProfile: (updates) => 
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...updates } : null
        })),
        
      clearProfile: () => set({ profile: null }),
    }),
    { 
      name: 'profile-storage',
      storage: createJSONStorage(() => localStorage),
      // Solo persistir los datos necesarios del perfil
      partialize: (state) => ({
        profile: state.profile 
          ? { 
              id: state.profile.id,
              name: state.profile.name,
              email: state.profile.email,
              role: state.profile.role,
              avatar: state.profile.avatar
            } 
          : null
      })
    }
  )
);

// Hook de conveniencia para acceder al store
export const useProfile = () => {
  const { profile, ...actions } = useProfileStore();
  return { profile, ...actions };
};
