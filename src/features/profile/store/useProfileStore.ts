import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { UserProfile } from '../../../interfaces/user.interface';

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
              phone: state.profile.phone,
              address: state.profile.address,
              lastName: state.profile.lastName,
              membershipType: state.profile.membershipType,
              memberSince: state.profile.memberSince,
              street: state.profile.street,
              externalNumber: state.profile.externalNumber,
              internalNumber: state.profile.internalNumber,
              colony: state.profile.colony,
              zipCode: state.profile.zipCode,
              city: state.profile.city,
              state: state.profile.state,
              country: state.profile.country

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
