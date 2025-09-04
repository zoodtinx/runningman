// layout.tsx (server)
import React, { Suspense } from "react";
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
import { User } from "@prisma/client";

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
         where: { location: user.location ?? "bangkok" },
         orderBy: { range: "desc" },
      });

      return [user, conditions];
   });

   const runConditions = await prisma.runCondition.findMany({
      where: {
         location: user?.location || "bangkok",
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
               "lg:p-2 lg:h-full lg:w-[1050px] lg:flex-row lg:gap-2",
               "xl:h-full xl:w-[1250px] xl:flex-row xl:p-4 xl:pb-4 xl:pt-4 xl:gap-4"
            )}
         >
            <div className="flex justify-between items-center text-background lg:hidden w-full px-2 h-[45px] shrink-0 z-50">
               <RunningManLogo
                  className={"h-auto w-[150px] " + "md:w-[200px] "}
               />
               <ViewConditionButton
                  conditionsData={conditions}
                  userData={user as User}
               />
               <Suspense>
                  <MobileNav />
               </Suspense>
            </div>
            <section
               className={cn(
                  "h-full hidden",
                  "hidden w-full",
                  "lg:flex lg:flex-col lg:gap-2 lg:w-1/2 lg:shrink-0"
               )}
            >
               <RunSummarySection />
               <div
                  className={cn(
                     "w-full bg-foreground rounded-[23px]",
                     "sm:h-auto",
                     "lg:h-1/2 lg:rounded-[14px]"
                  )}
               >
                  <RunConditionSection />
               </div>
            </section>
            <section
               className={cn(
                  "flex flex-col w-full grow h-[calc(100%-45px)] bg-foreground text-primary relative overflow-clip",
                  "rounded-[17px] rounded-bl-[0px] rounded-br-[0px]",
                  "max-sm:w-full",
                  "lg:h-full lg:w-1/2 lg:rounded-[14px]"
               )}
            >
               <div className="hidden lg:flex">
                  <Nav />
               </div>
               {children}
            </section>
         </main>
      </div>
   );
};

export default Layout;
