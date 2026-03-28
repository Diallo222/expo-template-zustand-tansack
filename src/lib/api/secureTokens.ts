import * as SecureStore from 'expo-secure-store';

const REFRESH_TOKEN_KEY = 'auth_refresh_token_v1';

/**
 * Long-lived refresh token — kept out of MMKV. Prefer this over plain MMKV for secrets.
 */
export async function getRefreshToken(): Promise<string | null> {
  return SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
}

export async function setRefreshToken(token: string | null): Promise<void> {
  if (token) {
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token);
  } else {
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
  }
}
