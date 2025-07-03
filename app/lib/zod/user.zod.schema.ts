import { nullableStringField } from "@/lib/zod/helper";
import { z } from "zod";

export const userSchema = z.object({
   id: z.string().uuid(),
   email: z.string().email(),
   name: nullableStringField(),
   theme: z.string(),
   preferredUnits: z.string(),
   location: nullableStringField(),
   notificationEnabled: z.boolean(),
});

export const createUserSchema = userSchema.omit({ id: true });

export const editUserSchema = userSchema
   .partial()
   .extend({ id: z.string().uuid() });

export type User = z.infer<typeof userSchema>;
export type CreateUserDto = z.infer<typeof createUserSchema>;
export type EditUserDto = z.infer<typeof editUserSchema>;
