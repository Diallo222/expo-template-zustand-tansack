import type { StateStorage } from 'zustand/middleware';

import { appMmkv } from './mmkv';

/** Zustand `persist` adapter backed by MMKV (synchronous, fast on mobile). */
export const mmkvStorage: StateStorage = {
  setItem: (name, value) => {
    appMmkv.set(name, value);
  },
  getItem: (name) => {
    const value = appMmkv.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    appMmkv.remove(name);
  },
};
