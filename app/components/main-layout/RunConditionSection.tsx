import { auth } from "@/auth";
import NiceSettings from "@/components/icons/Settings";
import { ConditionDate } from "@/components/main-layout/ConditionDate";
import { RunConditionCard } from "@/components/main-layout/RunConditionCard";
import { ScrollArea } from "@/components/primitives/ScrollArea";
import { prisma } from "@/lib/prisma";
import { getRunSummary } from "@/lib/run-conditions/calculate-readiness";
import Link from "next/link";

export const RunConditionSection = async () => {
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

   const conditionsData = await prisma.runCondition.findMany({
      where: {
         location: user.location || "bangkok",
      },
      orderBy: {
         range: "desc",
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
      conditionsData
   );

   if (runSummary.readinessScore < 3) {
      conditionsData.reverse();
   }

   const statChunks = [];
   const statsList = conditionsData;

   if (!statsList) {
      return;
   }

   for (let i = 0; i < statsList.length; i += 2) {
      statChunks.push(statsList.slice(i, i + 2));
   }

   // const updatedAt =

   return (
      <div className="flex flex-col w-full p-[12px] pt-0 overflow-hidden h-full">
         <div className="flex justify-between shrink-0 text-primary px-0 items-center py-2">
            <p className="font-headline font-bold text-base">
               RUNNING CONDITIONS
            </p>
            <div className="flex items-center gap-2">
               <div className="w-fit text-primary rounded-full text-sm font-medium opacity-30">
                  <span>Updated: </span>
                  <ConditionDate
                     date={conditionsData[0]?.updatedAt.toISOString()}
                  />
               </div>
               <Link href="/dashboard/settings">
                  <NiceSettings className="size-4 cursor-pointer" />
               </Link>
            </div>
         </div>
         <ScrollArea className="w-full h-full overflow-hidden rounded-2xl lg:rounded-[10px]">
            <div className="flex flex-col gap-2 pb-[100px]">
               {statChunks.map((pair, index) => (
                  <div key={index} className="flex gap-2">
                     {pair.map((stat) => (
                        <RunConditionCard key={stat.id} statData={stat} />
                     ))}
                  </div>
               ))}
            </div>
         </ScrollArea>
      </div>
   );
};
