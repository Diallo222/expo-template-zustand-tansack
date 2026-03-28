import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { mmkvStorage } from './mmkvStorage';

export type ThemePreference = 'light' | 'dark' | 'system';

type ThemeState = {
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
};

/**
 * Global UI: theme preference only. Server state never belongs here.
 */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      preference: 'system',
      setPreference: (preference) => set({ preference }),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
