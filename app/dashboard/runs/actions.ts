"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createRun(input: {
   title: string;
   userId: string;
   dateTime: string;
   distance: string;
   duration: string;
   laps: string;
   location: string;
   runType: string;
   mood: string;
   gear: string;
   routeId: string;
   note: string;
}) {
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

   revalidatePath("/dashboard");
}
