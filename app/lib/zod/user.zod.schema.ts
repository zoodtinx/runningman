import { nullableStringField } from "@/lib/zod/helper";
import { z } from "zod";

const conditionPriority = z.object({
   temperature: z.number().int().min(0).max(2),
   "feels-like": z.number().int().min(0).max(2),
   "heat-index": z.number().int().min(0).max(2),
   humidity: z.number().int().min(0).max(2),
   cloudiness: z.number().int().min(0).max(2),
   "uv-index": z.number().int().min(0).max(2),
   visibility: z.number().int().min(0).max(2),
   "wind-speed": z.number().int().min(0).max(2),
   "rain-chance": z.number().int().min(0).max(2),
   "sunset-time": z.number().int().min(0).max(2),
   "sunrise-time": z.number().int().min(0).max(2),
   aqi: z.number().int().min(0).max(2),
   "pm2.5": z.number().int().min(0).max(2),
   pollen: z.number().int().min(0).max(2),
});

export const userSchema = z.object({
   id: z.string(),
   email: z.string().email(),
   name: nullableStringField(),
   theme: z.string(),
   location: nullableStringField(),
   notificationEnabled: z.boolean(),
   weight: z.number().nullable().optional(),
   age: z.number().nullable().optional(),
   gender: nullableStringField(),
   height: z.number().nullable().optional(),
   conditionPriority: conditionPriority,
});

export type ConditionPriority = z.infer<typeof conditionPriority>;

export const createUserSchema = userSchema.omit({ id: true });

export const editUserSchema = userSchema.partial().extend({ id: z.string() });

export type User = z.infer<typeof userSchema>;
export type CreateUserDto = z.infer<typeof createUserSchema>;
export type EditUserDto = z.infer<typeof editUserSchema>;
