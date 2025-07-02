"use server";

import { prisma } from "@/lib/prisma";
import { CreateRunDto, EditRunDto } from "@/lib/zod/runs.zod.schema";
import { revalidatePath } from "next/cache";
import { createRunSchema, editRunSchema } from "@/lib/zod/runs.zod.schema";

export async function createRun(input: CreateRunDto) {
   const parsed = createRunSchema.safeParse(input);
   if (!parsed.success) {
      throw new Error(
         "Invalid run data: " + JSON.stringify(parsed.error.format())
      );
   }

   await prisma.run.create({
      data: parsed.data,
   });

   revalidatePath("/dashboard/runs");
}

export async function editRun(id: string, input: EditRunDto) {
   const parsed = editRunSchema.safeParse(input);
   if (!parsed.success) {
      throw new Error(
         "Invalid run data: " + JSON.stringify(parsed.error.format())
      );
   }

   await prisma.run.update({
      where: { id },
      data: parsed.data,
   });

   revalidatePath("/dashboard/runs");
   revalidatePath(`/dashboard/runs/${id}`);
}

export async function deleteRun(id: string) {
   await prisma.run.delete({
      where: { id },
   });

   revalidatePath("/dashboard/runs");
}
