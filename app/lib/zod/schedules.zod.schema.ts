import { z } from "zod";
import { nullableStringField, nullableNumberField } from "@/lib/zod/helper";
import { routeSchema } from "@/lib/zod/routes.zod.schema";
import { userSchema } from "@/lib/zod/user.zod.schema";

export const scheduleItemSchema = z.object({
   id: z.string().uuid(),
   dayOfWeek: z.number().int().min(0),
   routeId: nullableStringField().optional(),
   route: routeSchema.nullable().optional(),
   user: userSchema.nullable().optional(),
   userId: z.string().uuid(),
});

export const createScheduleItemSchema = scheduleItemSchema.omit({
   id: true,
   route: true,
   user: true,
});

export const editScheduleItemSchema = scheduleItemSchema
   .omit({ route: true, user: true })
   .extend({ routeId: z.string().optional().nullable() })
   .partial()
   .extend({ id: z.string().uuid() });

export const scheduleItemFindOneResponse = scheduleItemSchema;

export const scheduleItemFindManyResponse = z.object({
   total: z.number().int(),
   items: z.array(scheduleItemSchema),
});

export type ScheduleItem = z.infer<typeof scheduleItemSchema>;
export type CreateScheduleItemDto = z.infer<typeof createScheduleItemSchema>;
export type EditScheduleItemDto = z.infer<typeof editScheduleItemSchema>;
export type ScheduleItemFindOneResponse = z.infer<
   typeof scheduleItemFindOneResponse
>;
export type ScheduleItemFindManyResponse = z.infer<
   typeof scheduleItemFindManyResponse
>;
