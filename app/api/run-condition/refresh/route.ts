// app/api/hello/route.ts
import { NextResponse } from "next/server";
import { refreshAllConditions } from "@/lib/run-conditions/update-conditions";

export async function GET() {
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
