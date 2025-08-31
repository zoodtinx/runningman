import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
   const apiKey = req.headers.get("x-api-key");
   const expectedKey = process.env.CRON_SECRET;

   if (apiKey !== expectedKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }

   try {
      await prisma.user.deleteMany({});
      return NextResponse.json({
         success: true,
         message: "All users deleted.",
      });
   } catch (error) {
      return NextResponse.json(
         { success: false, error: error },
         { status: 500 }
      );
   }
}
