"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RunConditionCard } from "@/components/main-layout/RunConditionCard";
import { ScrollArea } from "@/components/primitives/ScrollArea";
import { getRunSummary } from "@/lib/run-conditions/calculate-readiness";
import { cn } from "@/lib/utils";
import { RunCondition, User } from "@prisma/client";
import { format } from "date-fns";
import { HighlightedStats } from "@/components/main-layout/RunSummaryPanel";
import NiceSettings from "@/components/icons/Settings";
import { ControlSlider } from "iconoir-react";
import Link from "next/link";

interface ViewConditionButtonProps {
   userData: User;
   conditionsData: RunCondition[];
}

const ViewConditionButton = ({
   userData,
   conditionsData,
}: ViewConditionButtonProps) => {
   const searchParams = useSearchParams();
   const conditionIsOpen = searchParams.get("condition");

   if (!userData || !conditionsData) {
      return;
   }

   const runSummary = getRunSummary(
      userData.conditionPriority as Record<string, number>,
      conditionsData
   );

   const updatedAt = format(
      conditionsData[0].updatedAt,
      "hh.mm a, d MMM"
   ).toUpperCase();

   const getBgColorClass = () => {
      switch (runSummary.readinessScore) {
         case 1:
            return "bg-theme-bad";
         case 2:
            return "bg-theme-okay";
         case 3:
            return "bg-theme-good";
         case 4:
            return "bg-theme-great";
         case 5:
            return "bg-theme-perfect";
         default:
            return "";
      }
   };

   if (conditionIsOpen === "open") {
      return (
         <div
            className={`absolute flex flex-col top-[44px] h-[calc(100%-45px)] inset-0 w-full z-10 px-2 ${getBgColorClass()}`}
         >
            <div
               className={cn(
                  "flex flex-col gap-1 w-full font-headline font-semibold pl-4 pr-4 pt-1",
                  "h-[130px] md:h-[200px] md:w-3/5"
               )}
            >
               <HighlightedStats data={runSummary.keyCondition} mode="mobile" />
               <p
                  className={cn(
                     "text-[35px] leading-9 md:text-[50px] md:leading-12"
                  )}
               >
                  {runSummary.headline}
               </p>
               <p className="hidden  md:block font-sans text-base font-normal leading-snug">
                  {runSummary.detail}
               </p>
            </div>
            <div
               className={cn(
                  "flex flex-col w-full max-sm:w-full h-[calc(100%-130px)] bg-foreground rounded-[20px]",
                  "rounded-bl-[0px] rounded-br-[0px] text-primary relative overflow-clip"
               )}
            >
               <div className="flex justify-between items-center pt-2 px-4 text-sm text-primary opacity-50">
                  <div className="flex justify-between w-full items-center gap-3">
                     <span>Updated: {updatedAt}</span>
                     <Link href="/dashboard/settings">
                        <NiceSettings className="size-5 cursor-pointer" />
                     </Link>
                  </div>
               </div>

               <ScrollArea className="w-full h-full overflow-hidden rounded-2xl rounded-bl-none rounded-br-none px-2 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-background pb-[100px]">
                     {conditionsData.map((stat) => (
                        <RunConditionCard key={stat.id} statData={stat} />
                     ))}
                  </div>
               </ScrollArea>
            </div>
         </div>
      );
   }
};

export default ViewConditionButton;
