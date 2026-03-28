import { Redirect } from 'expo-router';

import { selectIsAuthenticated, useAuthStore } from '@/features/auth/store';
import { useAuthPersistHydration } from '@/hooks/usePersistHydration';

/**
 * Entry: wait for MMKV persist rehydration, then route to login or main app.
 */
export default function Index() {
  const hydrated = useAuthPersistHydration();
  const isAuthed = useAuthStore(selectIsAuthenticated);

  if (!hydrated) {
    return null;
  }

  if (isAuthed) {
    return <Redirect href="/products" />;
  }

  return <Redirect href="/login" />;
}
