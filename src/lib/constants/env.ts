import Constants from 'expo-constants';

/**
 * Public env vars (EXPO_PUBLIC_*) — never put secrets here; they ship in the client bundle.
 */
export function getPublicApiBaseUrl(): string {
  const fromEnv = process.env.EXPO_PUBLIC_API_URL;
  if (fromEnv && fromEnv.length > 0) {
    return fromEnv.replace(/\/$/, '');
  }
  const extra = Constants.expoConfig?.extra as { apiUrl?: string } | undefined;
  if (extra?.apiUrl) {
    return extra.apiUrl.replace(/\/$/, '');
  }
  // Demo auth API (returns a JWT-shaped token string)
  return 'https://reqres.in/api';
}
