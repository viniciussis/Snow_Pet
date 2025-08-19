import { z } from "zod";

export const SignInBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const TokenResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
  expiresIn: z.number().optional(),
});

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
});

export type TokenResponse = z.infer<typeof TokenResponseSchema>;
export type SignInBody = z.infer<typeof SignInBodySchema>;
export type User = z.infer<typeof UserSchema>;
