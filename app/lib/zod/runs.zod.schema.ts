import { nullableStringField } from "@/lib/zod/helper";
import { z } from "zod";

export const runSchema = z.object({
   id: z.string().uuid(),
   title: z.string(),
   distance: z.number(),
   duration: z.number(),
   laps: z.number(),
   location: nullableStringField(),
   runType: z.string(),
   mood: nullableStringField(),
   gear: nullableStringField(),
   note: nullableStringField(),
   routeId: nullableStringField(),
   dateTime: z.string(),
   userId: z.string().uuid(),
});

export const runCreateDto = runSchema.omit({ id: true });
export const runEditDto = runSchema.partial().extend({ id: z.string().uuid() });

export const runFindOneResponse = runSchema;
export const runFindManyResponse = z.object({
   total: z.number().int(),
   items: z.array(runSchema),
});

export type Run = z.infer<typeof runSchema>;
export type CreateRunDto = z.infer<typeof runCreateDto>;
export type EditRunDto = z.infer<typeof runEditDto>;
export type RunFindOneResponse = z.infer<typeof runFindOneResponse>;
export type RunFindManyResponse = z.infer<typeof runFindManyResponse>;
