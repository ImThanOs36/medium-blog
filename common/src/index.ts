import { z } from "zod";

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export const signupInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export const blogInput = z.object({
  title: z.string(),
  content: z.string(),
});
export const updateblog = z.object({
  title: z.string(),
  content: z.string(),
  id: z.number(),
});

export type signinInput = z.infer<typeof signinInput>;
export type signupInput = z.infer<typeof signupInput>;
export type blogInput = z.infer<typeof blogInput>;
export type updateblog = z.infer<typeof updateblog>;
