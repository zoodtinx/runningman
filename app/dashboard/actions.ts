"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function changeLocation(userId: string, location: string) {
   console.log("location", location);

   await prisma.user.update({
      where: { id: userId },
      data: {
         location: location,
      },
   });

   revalidatePath("/dashboard");
   revalidatePath("/dashboard/runs");
}
