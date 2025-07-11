// layout.tsx (server)
import React from "react";
import Nav from "@/components/main-layout/Nav";
import { RunConditionSection } from "@/components/main-layout/RunConditionSection";
import RunSummarySection from "@/components/main-layout/RunSummarySection";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { cn } from "@/lib/utils";
import { getRunSummary } from "@/lib/run-conditions/calculate-readiness";

const Layout = async ({ children }: { children: React.ReactNode }) => {
   const session = await auth();

   if (!session?.user?.id) {
      return <div>Not authenticated</div>;
   }

   const userId = session.user.id;

   const user = await prisma.user.findUnique({
      where: {
         id: userId,
      },
      include: {
         schedules: {
            orderBy: {
               dayOfWeek: "asc",
            },
         },
      },
   });

   if (!user) {
      return <div className="text-red-500 p-4">User not found.</div>;
   }

   const runConditions = await prisma.runCondition.findMany({
      where: {
         userId: "master",
         location: user.location || "bangkok",
      },
   });

   let conditionPriority = user!.conditionPriority;
   if (typeof conditionPriority === "string") {
      try {
         conditionPriority = JSON.parse(conditionPriority);
      } catch {
         conditionPriority = {};
      }
   }

   const runSummary = getRunSummary(
      conditionPriority as Record<string, number>,
      runConditions
   );

   return (
      <div
         className={cn(
            "w-screen h-screen flex justify-center",
            runSummary.readinessScore === 1 && "bg-theme-bad",
            runSummary.readinessScore === 2 && "bg-theme-okay",
            runSummary.readinessScore === 3 && "bg-theme-good",
            runSummary.readinessScore === 4 && "bg-theme-great",
            runSummary.readinessScore === 5 && "bg-theme-perfect"
         )}
      >
         <main className="w-[1440px] h-full flex items-center gap-4 p-4">
            <section className="w-1/2 h-full flex flex-col gap-2">
               <RunSummarySection />
               <div className="h-1/2 w-full bg-foreground rounded-[23px]">
                  <RunConditionSection />
               </div>
            </section>
            <section className="flex flex-col w-1/2 h-full bg-foreground rounded-[23px] text-primary relative overflow-clip">
               <Nav />
               {children}
            </section>
         </main>
      </div>
   );
};

export default Layout;
