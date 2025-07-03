import { z } from "zod";
import { nullableStringField, nullableNumberField } from "@/lib/zod/helper";

export const routeSchema = z.object({
   id: z.string().uuid(),
   title: z.string(),
   distance: nullableNumberField(),
   duration: nullableNumberField(),
   laps: z.number().int().optional(),
   location: nullableStringField(),
   note: nullableStringField(),
   runType: z.string(),
   userId: z.string().uuid(),
   createdAt: z.string(),
   updatedAt: z.string(),
});

export const createRouteSchema = routeSchema.omit({
   id: true,
   createdAt: true,
   updatedAt: true,
});
export const editRouteSchema = routeSchema
   .partial()
   .extend({ id: z.string().uuid() });

export const routeFindOneResponse = routeSchema;
export const routeFindManyResponse = z.object({
   total: z.number().int(),
   items: z.array(routeSchema),
});

export type Route = z.infer<typeof routeSchema>;
export type CreateRouteDto = z.infer<typeof createRouteSchema>;
export type EditRouteDto = z.infer<typeof editRouteSchema>;
export type RouteFindOneResponse = z.infer<typeof routeFindOneResponse>;
export type RouteFindManyResponse = z.infer<typeof routeFindManyResponse>;
