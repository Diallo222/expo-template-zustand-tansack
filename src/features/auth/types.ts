import { z } from 'zod';

/** Login form + API body (reqres.in demo expects `email` + `password`). */
export const loginRequestSchema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;

/** Validated auth/login API response (reqres returns `{ token: string }`). */
export const loginResponseSchema = z.object({
  token: z.string(),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;
