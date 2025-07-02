"use server";

import { prisma } from "@/lib/prisma";
import { CreateRunDto } from "@/lib/zod/runs.zod.schema";
import { revalidatePath } from "next/cache";

export async function createRun(input: CreateRunDto) {
   console.log("input", input);

   const distance = Number(input.distance);
   const duration = Number(input.duration);
   const laps = Number(input.laps);

   if (!input.title || isNaN(distance) || isNaN(duration)) {
      throw new Error("Missing required fields");
   }

   await prisma.run.create({
      data: {
         ...input,
         distance,
         duration,
         laps,
      },
   });

   revalidatePath("/dashboard/runs");
}
