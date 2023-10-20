import { z } from "zod";

export const SignInSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(8),
});

export const SignUpSchema = z
  .object({
    email: z.string().email(),
    username: z
      .string()
      .min(4)
      .max(20)
      .refine((s) => !s.includes(" "), "No Spaces!"),
    password: z.string().min(8),
    confirmation: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmation, {
    message: "Passwords did not match!",
    path: ["confirmation"],
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
