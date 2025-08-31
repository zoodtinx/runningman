// app/api/hello/route.ts
import { NextRequest, NextResponse } from "next/server";
import { refreshAllConditions } from "@/lib/run-conditions/update-conditions";

export async function GET(req: NextRequest) {
   const apiKey = req.headers.get("x-api-key");
   const expectedKey = process.env.CRON_SECRET;

   if (apiKey !== expectedKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }
   try {
      await refreshAllConditions();
   } catch (error) {
      console.error("Failed to refresh all conditions:", error);
      return NextResponse.json(
         { error: "Failed to refresh conditions" },
         { status: 500 }
      );
   }
   return NextResponse.json({ message: "Run conditions refreshed" });
}

export async function POST(req: Request) {
   const data = await req.json();
   return NextResponse.json({ received: data });
}
