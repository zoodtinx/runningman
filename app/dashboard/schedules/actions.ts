"use server";

import { prisma } from "@/lib/prisma";
import {
   CreateScheduleItemDto,
   EditScheduleItemDto,
} from "@/lib/zod/schedules.zod.schema";
import {
   createScheduleItemSchema,
   editScheduleItemSchema,
} from "@/lib/zod/schedules.zod.schema";
import { revalidatePath } from "next/cache";

export async function createScheduleItem(input: CreateScheduleItemDto) {
   const parsed = createScheduleItemSchema.safeParse(input);
   if (!parsed.success) {
      throw new Error(
         "Invalid schedule item data: " + JSON.stringify(parsed.error.format())
      );
   }

   await prisma.scheduleItem.create({
      data: parsed.data,
   });

   revalidatePath("/dashboard/schedule");
}

export async function editScheduleItem(input: EditScheduleItemDto) {
   const parsed = editScheduleItemSchema.safeParse(input);
   if (!parsed.success) {
      throw new Error(
         "Invalid schedule item data: " + JSON.stringify(parsed.error.format())
      );
   }

   await prisma.scheduleItem.update({
      where: { id: parsed.data.id },
      data: parsed.data,
   });

   revalidatePath("/dashboard/schedule");
}

export async function deleteScheduleItem(id: string) {
   await prisma.scheduleItem.delete({
      where: { id },
   });

   revalidatePath("/dashboard/schedule");
}

export async function addWeek(userId: string) {
   const existingItems = await prisma.scheduleItem.findMany({
      where: { userId },
      orderBy: { dayOfWeek: "asc" },
      select: { dayOfWeek: true },
   });

   const startDay = existingItems.length + 1;

   const newItemsData = Array.from({ length: 7 }).map((_, i) => ({
      userId,
      dayOfWeek: startDay + i,
      routeId: null,
   }));

   await prisma.scheduleItem.createMany({
      data: newItemsData,
   });

   revalidatePath("/dashboard/schedule");
}
