"use server";

import { prisma } from "@/lib/prisma";
import { createUserSchema, editUserSchema } from "@/lib/zod/user.zod.schema";
import type { CreateUserDto, EditUserDto } from "@/lib/zod/user.zod.schema";
import { revalidatePath } from "next/cache";

export async function createUser(input: CreateUserDto) {
   const parsed = createUserSchema.safeParse(input);
   if (!parsed.success) {
      throw new Error(
         "Invalid user data: " + JSON.stringify(parsed.error.format())
      );
   }

   await prisma.user.create({
      data: parsed.data,
   });

   revalidatePath("/dashboard/settings");
}

export async function editUser(id: string, input: EditUserDto) {
   console.log("input", input);
   const parsed = editUserSchema.safeParse(input);
   if (!parsed.success) {
      throw new Error(
         "Invalid user data: " + JSON.stringify(parsed.error.format())
      );
   }

   await prisma.user.update({
      where: { id },
      data: parsed.data,
   });

   revalidatePath("/dashboard/settings");
}

export async function deleteUser(id: string) {
   await prisma.user.delete({
      where: { id },
   });

   revalidatePath("/dashboard/settings");
}
