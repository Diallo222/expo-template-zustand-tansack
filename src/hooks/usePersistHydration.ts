import { useSyncExternalStore } from 'react';

import { useAuthStore } from '@/features/auth/store';

/** Waits until Zustand `persist` (MMKV) has rehydrated for the auth store. */
export function useAuthPersistHydration(): boolean {
  return useSyncExternalStore(
    (onStoreChange) => useAuthStore.persist.onFinishHydration(onStoreChange),
    () => useAuthStore.persist.hasHydrated(),
    () => false,
  );
}
