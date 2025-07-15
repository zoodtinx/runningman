"use client";

import { RunConditionCard } from "@/components/main-layout/RunConditionCard";
import { ScrollArea } from "@/components/primitives/ScrollArea";
import NiceSettings from "@/components/icons/Settings";
import { getRunSummary } from "@/lib/run-conditions/calculate-readiness";
import { cn } from "@/lib/utils";
import { RunCondition, User } from "@prisma/client";
import { Xmark } from "iconoir-react";
import { format } from "date-fns";
import Link from "next/link";
import { useState } from "react";
import { HighlightedStats } from "@/components/main-layout/RunSummaryPanel";

interface ViewConditionButtonProps {
   userData: User;
   conditionsData: RunCondition[];
}

const ViewConditionButton = ({
   userData,
   conditionsData,
}: ViewConditionButtonProps) => {
   // Remove useSearchParams and search param logic
   // const router = useRouter();
   const [isOpen, setIsOpen] = useState(false);

   const handleClick = () => {
      setIsOpen(true);
   };

   const handleClose = () => {
      setIsOpen(false);
   };

   const runSummary = getRunSummary(
      userData.conditionPriority as Record<string, number>,
      conditionsData
   );

   const updatedAt = format(
      conditionsData[0].updatedAt,
      "hh.mm a, d MMM"
   ).toUpperCase();

   return (
      <>
         <button
            onClick={handleClick}
            className="text-sm border rounded-full px-2 font-semibold"
         >
            View Conditions
         </button>

         {isOpen && (
            <div className="absolute top-[45px] h-[calc(100%-45px)] inset-0 w-full z-10 px-2">
               <div
                  className={cn(
                     "flex flex-col w-full max-sm:w-full h-full bg-foreground rounded-[20px]",
                     "rounded-bl-[0px] rounded-br-[0px] text-primary relative overflow-clip"
                  )}
               >
                  <div className="flex justify-between items-start">
                     <div className="flex flex-col gap-1 text-[30px] font-headline leading-8 font-semibold pl-4 pr-2 pt-3">
                        <HighlightedStats
                           data={runSummary.keyCondition}
                           mode="mobile"
                        />
                        <p>{runSummary.headline}</p>
                     </div>
                     <Xmark
                        onClick={handleClose}
                        className="h-[22px] absolute top-3 right-3 shrink-0 w-auto cursor-pointer"
                     />
                  </div>

                  <div className="flex justify-between items-center pt-2 px-4 text-sm text-primary opacity-50">
                     <div className="flex justify-between w-full items-center gap-3">
                        <span>Updated: {updatedAt}</span>
                        <Link
                           href="/dashboard/settings"
                           onClick={() => setIsOpen(false)}
                        >
                           <NiceSettings className="size-5 cursor-pointer" />
                        </Link>
                     </div>
                  </div>

                  {/* Stats */}
                  <ScrollArea className="w-full h-full overflow-hidden rounded-2xl rounded-bl-none rounded-br-none px-2 pt-2">
                     <div className="flex flex-col gap-2 text-background pb-[100px]">
                        {conditionsData.map((stat) => (
                           <RunConditionCard key={stat.id} statData={stat} />
                        ))}
                     </div>
                  </ScrollArea>
               </div>
            </div>
         )}
      </>
   );
};

export default ViewConditionButton;
