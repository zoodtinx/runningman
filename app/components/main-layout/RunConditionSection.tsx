import { auth } from "@/auth";
import { RunConditionCard } from "@/components/main-layout/RunConditionCard";
import { ScrollArea } from "@/components/primitives/ScrollArea";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { Settings } from "iconoir-react";

export const RunConditionSection = async () => {
   const session = await auth();

   if (!session?.user?.id) {
      return <div>Not authenticated</div>;
   }

   const userId = session.user.id;

   const conditionsData = await prisma.runCondition.findMany({
      where: {
         location: "bangkok",
      },
      orderBy: {
         range: "asc",
      },
   });

   const statChunks = [];
   const statsList = conditionsData;

   if (!statsList) {
      return;
   }

   for (let i = 0; i < statsList.length; i += 2) {
      statChunks.push(statsList.slice(i, i + 2));
   }

   const updatedAt = format(
      conditionsData[0].updatedAt,
      "hh.mm a, d MMM"
   ).toUpperCase();

   return (
      <div className="flex flex-col gap-3 w-full p-[12px] overflow-hidden h-full">
         <div className="flex justify-between shrink-0 text-primary px-1 items-center">
            <p className="font-headline font-bold">RUNNING CONDITIONS</p>
            <div className="flex items-center gap-2">
               <div className="w-fit text-primary rounded-full text-base font-medium">
                  <span>Last Updated: </span>
                  <span>{updatedAt}</span>
               </div>
               <Settings className="size-5 cursor-pointer" />
            </div>
         </div>
         <ScrollArea className="w-full h-full overflow-hidden rounded-2xl">
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
