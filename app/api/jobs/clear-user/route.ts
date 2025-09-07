import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
   const apiKey = req.headers.get("x-api-key");
   const expectedKey = process.env.CRON_SECRET;

   if (apiKey !== expectedKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }

   try {
      const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);

      const deleted = await prisma.user.deleteMany({
         where: {
            createdAt: { lt: threeHoursAgo },
         },
      });

      console.log(
         `${deleted.count} users deleted at ${new Date().toISOString()}`
      );

      return NextResponse.json({
         success: true,
         message: `${deleted.count} users deleted.`,
      });
   } catch (error) {
      return NextResponse.json({ success: false, error }, { status: 500 });
   }
}
