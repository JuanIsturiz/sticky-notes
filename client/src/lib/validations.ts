import { z } from "zod";

// User Validations
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

export const UserProfileSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  image: z.any().optional(),
  bio: z.string().optional(),
});

// Note Validations
export const NewNoteSchema = z.object({
  body: z.string(),
  private: z.boolean().default(false),
});

// Team Validations
export const TeamSearchSchema = z.object({
  query: z.string(),
});

export const NewTeamSchema = z
  .object({
    name: z
      .string()
      .min(1)
      .refine((s) => !s.includes(" "), "No Spaces!"),
    description: z.string().optional(),
    is_private: z.boolean().default(false),
    password: z.string().min(8).optional(),
    confirmation: z.string().min(8).optional(),
  })
  .refine((data) => data.password === data.confirmation, {
    message: "Passwords did not match!",
    path: ["confirmation"],
  });

export const JoinTeamSchema = z.object({
  password: z.string().min(8),
});

export const LeaveTeamSchema = z.object({
  admin: z.number(),
});
