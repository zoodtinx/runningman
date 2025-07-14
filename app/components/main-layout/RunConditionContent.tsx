"use client";

import NiceSettings from "@/components/icons/Settings";
import { RunConditionCard } from "@/components/main-layout/RunConditionCard";
import { ScrollArea } from "@/components/primitives/ScrollArea";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type RunCondition = {
   id: string;
   updatedAt: string; // not used here, only passed as `updatedAt` prop
   range: number;
   [key: string]: any; // for additional fields used by RunConditionCard
};

type RunConditionSectionClientProps = {
   statChunks: RunCondition[][];
   updatedAt: string;
};

export default function RunConditionContent({
   statChunks,
   updatedAt,
}: RunConditionSectionClientProps) {
   const pathName = usePathname();
   const segments = pathName.split("/").filter(Boolean);
   const lastSegment = segments[segments.length - 1];
   if (lastSegment !== "dashboard") {
      return null;
   }
   return (
      <div
         className={cn(
            "flex flex-col gap-3 w-full p-[12px] overflow-hidden h-full md:grow-0",
            "sm:grow sm:h-auto"
         )}
      >
         <div className="flex justify-between shrink-0 text-primary px-1 items-center">
            <p className="font-headline font-bold">RUNNING CONDITIONS</p>
            <div className="flex items-center gap-3">
               <span className="w-fit text-primary rounded-full text-sm font-medium opacity-30">
                  Updated: {updatedAt}
               </span>
               <Link href="/dashboard/settings">
                  <NiceSettings className="size-5 cursor-pointer" />
               </Link>
            </div>
         </div>

         <ScrollArea className="w-full h-full overflow-hidden rounded-2xl">
            <div className="flex flex-col gap-2 pb-[100px]">
               {statChunks.map((pair, idx) => (
                  <div key={idx} className="flex gap-2">
                     {pair.map((stat) => (
                        <RunConditionCard key={stat.id} statData={stat} />
                     ))}
                  </div>
               ))}
            </div>
         </ScrollArea>
      </div>
   );
}
