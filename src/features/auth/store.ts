import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { mmkvStorage } from '@/lib/stores/mmkvStorage';

export type AuthUser = {
  email: string;
};

type AuthState = {
  accessToken: string | null;
  user: AuthUser | null;
  setSession: (payload: { accessToken: string; user: AuthUser | null }) => void;
  logout: () => void;
};

/**
 * Client-only auth/session flags. Form fields stay in react-hook-form, not here.
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      setSession: ({ accessToken, user }) =>
        set({
          accessToken,
          user,
        }),
      logout: () =>
        set({
          accessToken: null,
          user: null,
        }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => mmkvStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
      }),
    },
  ),
);

export const selectIsAuthenticated = (s: AuthState): boolean =>
  s.accessToken != null && s.accessToken.length > 0;
