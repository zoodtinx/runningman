import { z } from "zod";
import { nullableStringField } from "@/lib/zod/helper";

export const runConditionSchema = z.object({
   id: z.string().uuid(),
   name: z.string(),
   location: z.string(),
   type: z.string(),
   value: z.string(),
   valueType: z.string(),
   range: z.number().int(),
   unit: z.string(),
   summary: z.string(),
   futureValue: nullableStringField().optional(),
   userId: z.string().uuid(),
});

export type RunCondition = z.infer<typeof runConditionSchema>;

export const createRunConditionSchema = runConditionSchema.omit({
   id: true,
});

export const editRunConditionSchema = runConditionSchema
   .partial()
   .extend({ id: z.string().uuid() });

export type CreateRunConditionDto = z.infer<typeof createRunConditionSchema>;
export type EditRunConditionDto = z.infer<typeof editRunConditionSchema>;
