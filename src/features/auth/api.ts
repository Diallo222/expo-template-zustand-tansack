import { httpClient } from '@/lib/api/httpClient';

import { loginResponseSchema, type LoginRequest } from './types';

/**
 * Thin HTTP wrapper — no TanStack here; query/mutation hooks call these functions only.
 */
export async function loginRequest(body: LoginRequest) {
  const { data } = await httpClient.post<unknown>('/login', {
    email: body.email,
    password: body.password,
  });
  return loginResponseSchema.parse(data);
}
