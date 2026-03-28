import { QueryClient } from '@tanstack/react-query';

/**
 * Single QueryClient for the app. Import this only from providers and httpClient (logout clears cache).
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 24 * 60 * 60 * 1000,
      retry: 2,
      networkMode: 'online',
    },
    mutations: {
      retry: 0,
      networkMode: 'online',
    },
  },
});
