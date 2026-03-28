import { useMutation } from '@tanstack/react-query';

import { loginRequest } from '@/features/auth/api';
import { useAuthStore } from '@/features/auth/store';
import type { LoginRequest } from '@/features/auth/types';

const loginMutationKey = ['auth', 'login'] as const;

export function useLoginMutation() {
  const setSession = useAuthStore((s) => s.setSession);

  return useMutation({
    mutationKey: loginMutationKey,
    mutationFn: (variables: LoginRequest) => loginRequest(variables),
    onSuccess: (data, variables) => {
      setSession({
        accessToken: data.token,
        user: { email: variables.email },
      });
    },
  });
}
