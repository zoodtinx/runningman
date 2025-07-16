import { nullableStringField } from "@/lib/zod/helper";
import { scheduleItemSchema } from "@/lib/zod/schedules.zod.schema";
import { z } from "zod";

const conditionPriority = z.object({
   temperature: z.number().int().min(0).max(3),
   "feels-like": z.number().int().min(0).max(3),
   "heat-index": z.number().int().min(0).max(3),
   humidity: z.number().int().min(0).max(3),
   cloudiness: z.number().int().min(0).max(3),
   "uv-index": z.number().int().min(0).max(3),
   visibility: z.number().int().min(0).max(3),
   "wind-speed": z.number().int().min(0).max(3),
   "rain-chance": z.number().int().min(0).max(3),
   "sunset-time": z.number().int().min(0).max(3),
   "sunrise-time": z.number().int().min(0).max(3),
   aqi: z.number().int().min(0).max(3),
   "pm2.5": z.number().int().min(0).max(3),
   pollen: z.number().int().min(0).max(3),
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

export type UserWithSchedules = z.infer<typeof userSchema> & {
   schedules: z.infer<typeof scheduleItemSchema>[];
};

export type ConditionPriority = z.infer<typeof conditionPriority>;

export const createUserSchema = userSchema.omit({ id: true });

export const editUserSchema = userSchema.partial().extend({ id: z.string() });

export type User = z.infer<typeof userSchema>;
export type CreateUserDto = z.infer<typeof createUserSchema>;
export type EditUserDto = z.infer<typeof editUserSchema>;
