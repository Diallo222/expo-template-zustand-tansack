import axios, {
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';

import { useAuthStore } from '@/features/auth/store';
import { getPublicApiBaseUrl } from '@/lib/constants/env';
import { queryClient } from '@/lib/queryClient';

import { getRefreshToken, setRefreshToken } from './secureTokens';

type RetryableRequest = InternalAxiosRequestConfig & { _retry?: boolean };

const baseURL = getPublicApiBaseUrl();

/**
 * Single axios instance for the app. All feature `api.ts` modules use this — never call `fetch` from UI.
 * Attach access token, refresh on 401 once, then clear session + TanStack cache on hard failure.
 */
export const httpClient = axios.create({
  baseURL,
  timeout: 30_000,
  headers: { 'Content-Type': 'application/json' },
});

let refreshPromise: Promise<string | null> | null = null;

async function tryRefreshAccessToken(): Promise<string | null> {
  const refresh = await getRefreshToken();
  if (!refresh) {
    return null;
  }
  try {
    const { data } = await axios.post<{ accessToken: string; refreshToken?: string }>(
      `${baseURL}/auth/refresh`,
      { refreshToken: refresh },
      { headers: { 'Content-Type': 'application/json' } },
    );
    if (data.refreshToken) {
      await setRefreshToken(data.refreshToken);
    }
    return data.accessToken;
  } catch {
    return null;
  }
}

function logoutSession(): void {
  useAuthStore.getState().logout();
  void setRefreshToken(null);
  queryClient.clear();
}

httpClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const original = error.config as RetryableRequest | undefined;
    const status = error.response?.status;

    if (status !== 401 || !original || original._retry) {
      return Promise.reject(error);
    }

    // Avoid refresh loop for anonymous requests (no session yet).
    if (!useAuthStore.getState().accessToken) {
      return Promise.reject(error);
    }

    original._retry = true;

    if (!refreshPromise) {
      refreshPromise = tryRefreshAccessToken().finally(() => {
        refreshPromise = null;
      });
    }

    const newAccess = await refreshPromise;
    if (!newAccess) {
      logoutSession();
      return Promise.reject(error);
    }

    useAuthStore.getState().setSession({
      accessToken: newAccess,
      user: useAuthStore.getState().user,
    });

    original.headers.Authorization = `Bearer ${newAccess}`;
    return httpClient(original);
  },
);
