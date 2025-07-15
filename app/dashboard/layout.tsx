// layout.tsx (server)
import React from "react";
import Nav from "@/components/main-layout/Nav";
import { RunConditionSection } from "@/components/main-layout/RunConditionSection";
import RunSummarySection from "@/components/main-layout/RunSummarySection";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { cn } from "@/lib/utils";
import { getRunSummary } from "@/lib/run-conditions/calculate-readiness";
import RunningManLogo from "@/components/icons/RunningManLogo";
import ViewConditionButton from "@/components/main-layout/ViewConditionButton";
import MobileNav from "@/components/main-layout/MobileNav";

const Layout = async ({
   children,
}: {
   children: React.ReactNode;
   searchParams: { mode?: string };
}) => {
   const session = await auth();

   if (!session?.user?.id) {
      return <div>Not authenticated</div>;
   }

   const userId = session.user.id;

   const [user, conditions] = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
         where: { id: userId },
         include: { schedules: { orderBy: { dayOfWeek: "asc" } } },
      });
      if (!user) return [null, []];

      const conditions = await tx.runCondition.findMany({
         where: { userId: "master", location: user.location ?? "bangkok" },
         orderBy: { range: "desc" },
      });

      return [user, conditions];
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
         <main
            className={cn(
               "w-full flex flex-col items-center gap-0 p-2 pb-0 pt-0",
               "md:h-full md:w-[1440px] md:flex-row md:p-4 md:pb-4 md:pt-4 md:gap-4"
            )}
         >
            <div className="flex justify-between items-center text-background md:hidden w-full px-2 h-[45px] shrink-0">
               <RunningManLogo className="w-[160px]" />
               <ViewConditionButton
                  conditionsData={conditions}
                  userData={user}
               />
            </div>
            <section
               className={cn(
                  "h-full md:flex flex-col gap-2 hidden",
                  "md:w-1/2 shrink-0",
                  "sm:w-full sm:hidden"
               )}
            >
               <RunSummarySection />
               <div
                  className={cn(
                     "md:h-1/2 w-full bg-foreground rounded-[23px]",
                     "sm:h-auto"
                  )}
               >
                  <RunConditionSection />
               </div>
            </section>
            <section
               className={cn(
                  cn(
                     "flex flex-col w-full max-sm:w-full h-[calc(100%-45px)] md:h-full bg-foreground rounded-[20px] rounded-bl-[0px] rounded-br-[0px] text-primary relative overflow-clip",
                     "md:w-1/2 md:rounded-bl-[23px] md:rounded-br-[23px] md:rounded-[23px]"
                  )
               )}
            >
               <div className="hidden md:flex">
                  <Nav />
               </div>
               {children}
            </section>
            <MobileNav />
         </main>
      </div>
   );
};

export default Layout;
