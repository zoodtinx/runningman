"use server";

import { prisma } from "@/lib/prisma";
import {
   CreateRouteDto,
   EditRouteDto,
   createRouteSchema,
   editRouteSchema,
} from "@/lib/zod/routes.zod.schema";
import { revalidatePath } from "next/cache";

export async function createRoute(input: CreateRouteDto) {
   const parsed = createRouteSchema.safeParse(input);
   if (!parsed.success) {
      throw new Error(
         "Invalid route data: " + JSON.stringify(parsed.error.format())
      );
   }

   await prisma.route.create({
      data: parsed.data,
   });

   revalidatePath("/dashboard/routes");
}

export async function editRoute(id: string, input: EditRouteDto) {
   const parsed = editRouteSchema.safeParse(input);
   if (!parsed.success) {
      throw new Error(
         "Invalid route data: " + JSON.stringify(parsed.error.format())
      );
   }

   await prisma.route.update({
      where: { id },
      data: parsed.data,
   });

   revalidatePath("/dashboard/routes");
   revalidatePath(`/dashboard/routes/${id}`);
}

export async function deleteRoute(id: string) {
   await prisma.route.delete({
      where: { id },
   });

   revalidatePath("/dashboard/routes");
}
