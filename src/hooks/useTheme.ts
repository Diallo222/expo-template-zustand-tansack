import { useColorScheme } from 'react-native';

import { useThemeStore } from '@/lib/stores/themeStore';

/**
 * Resolves effective color scheme from device + persisted user preference (`system` follows OS).
 */
export function useResolvedColorScheme(): 'light' | 'dark' {
  const system = useColorScheme();
  const preference = useThemeStore((s) => s.preference);

  if (preference === 'system') {
    return system === 'dark' ? 'dark' : 'light';
  }
  return preference;
}
