import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().min(5).max(50).email().trim(),
  password: z.string().min(8).max(50).trim(),
  name: z.string().optional(),
});

export const signinSchema = z.object({
  email: z.string().min(5).max(50).email().trim(),
  password: z.string().min(8).max(50).trim(),
  name: z.string().optional(),
});

export const createBlogSchema = z.object({
  title: z.string().min(5),
  content: z.string().min(10),
  authorId: z.string(),
});

export const updateBlogSchema = z.object({
  title: z.string().min(5),
  content: z.string().min(10),
  id: z.string(),
});

export type signupInputs = z.infer<typeof signupSchema>;
export type signinInputs = z.infer<typeof signinSchema>;
export type createBlogInput = z.infer<typeof createBlogSchema>;
export type updateBlogInput = z.infer<typeof updateBlogSchema>;
