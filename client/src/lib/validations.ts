import { z } from "zod";

export const SignInSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const SignUpSchema = z
  .object({
    email: z.string().email(),
    username: z
      .string()
      .min(1)
      .max(20)
      .refine((s) => !s.includes(" "), "No Spaces!"),
    password: z.string(),
    confirmation: z.string(),
  })
  .refine((data) => data.password === data.confirmation, {
    message: "Passwords did not match!",
    path: ["match"],
  });

export const OnboardingSchema = z.object({
  username: z
    .string()
    .min(1)
    .max(20)
    .refine((s) => !s.includes(" "), "No Spaces!"),
  name: z.string().optional(),
  image: z.string().url().optional(),
  bio: z.string().optional(),
});
