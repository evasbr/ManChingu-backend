import { z } from "zod";

export const UserSchema = z.object({
  email: z.string().email("Email is required with a correct format"),
  password: z
    .string()
    .min(8, "Password has to be atleast 8 digit")
    .max(100, "Max password digit is 100"),
  username: z.string().min(1, "Username had to be atleast 2 character"),
  id_user: z.string(),
  deleted_at: z.date().nullable().optional(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const userCreate = UserSchema.omit({
  id_user: true,
  deleted_at: true,
  created_at: true,
  updated_at: true,
});
export const userResponse = UserSchema.omit({ password: true });
export const userLogin = UserSchema.pick({ email: true, password: true });

export type UserCreate = z.infer<typeof UserSchema>;
export type UserResponse = z.infer<typeof userResponse>;
export type UserLogin = z.infer<typeof userLogin>;
