"use client";

import { toSentenceCase } from "@/components/form-elements/utils/helper";
import { SelectWithLabel } from "@/components/primitives/SelectWithLabel";
import { editScheduleItem } from "@/dashboard/schedules/actions";
import { cn } from "@/lib/utils";
import { ScheduleItem } from "@/lib/zod/schedules.zod.schema";
import { XmarkCircle } from "iconoir-react";

export const DayBar = ({
   schedulesData,
   routes,
}: {
   schedulesData: ScheduleItem;
   routes: {
      value: string;
      label: string;
   }[];
}) => {
   const handleRouteChange = async (value: string) => {
      await editScheduleItem({ id: schedulesData.id, routeId: value });
   };

   const handleDiscardRoute = async () => {
      await editScheduleItem({ id: schedulesData.id, routeId: null });
   };

   const { dayOfWeek, route } = schedulesData;

   if (!route) {
      return (
         <div className="flex w-full h-[115px] rounded-base p-[10px] bg-[#262626]">
            <div className="pl-1 h-full w-[110px] font-headline font-semibold text-[27px] leading-tight">
               {getDayOfWeek(dayOfWeek)}
            </div>
            <div className="border-r border-primary" />
            <div className="flex flex-col md:flex-row grow">
               <div className="pl-4 w-[170px]">
                  <SelectWithLabel
                     options={routes}
                     noSelectionPlaceholder="Create a route first"
                     placeholder="Select Route"
                     value={schedulesData.routeId || ""}
                     onValueChange={handleRouteChange}
                  />
               </div>
               <div className="grow flex flex-col justify-end items-end p-1">
                  <div className="flex gap-[4px] leading-5 items-baseline font-headline text-primary">
                     <span className="md:text-[25px] opacity-10 text-[20px]">
                        Rest Day
                     </span>
                  </div>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className="flex w-full h-[115px] rounded-base p-[10px] bg-background">
         <div className="pl-1 h-full w-[110px] font-headline font-semibold text-[27px] leading-tight">
            {getDayOfWeek(dayOfWeek)}
         </div>
         <div className="border-r border-primary" />
         <div className="grow flex flex-col md:flex-row">
            <div className="flex pl-4 w-[170px]">
               <SelectWithLabel
                  options={routes}
                  placeholder="Select Route"
                  value={schedulesData.routeId || ""}
                  onValueChange={handleRouteChange}
               />
               <XmarkCircle
                  onClick={handleDiscardRoute}
                  className="size-5 text-primary opacity-15 shrink-0 mt-1 ml-1 hover:opacity-100 cursor-default transition-opacity z-10"
               />
            </div>
            <div className="grow flex flex-col justify-between items-end p-1">
               <div className="flex gap-[4px] leading-10 md:leading-8 items-baseline font-headline">
                  <span className="md:text-[45px] text-[30px] font-semibold">
                     {route.distance ? route.distance : route.duration}
                  </span>
                  <span className="text-[22px]">min</span>
               </div>
               <div className="flex flex-col items-end gap-1">
                  <p className="hidden md:block text-sm">{route.location}</p>
                  <RunTypeBar runType={route.runType} />
               </div>
            </div>
         </div>
      </div>
   );
};

const getDayOfWeek = (dayofWeek: number) => {
   const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
   return days[dayofWeek % 7] ?? "";
};

const RunTypeBar = ({ runType }: { runType: string }) => {
   return (
      <div
         className={cn(
            "text-sm text-right font-bold rounded-full text-background px-2 w-[160px]",
            runType === "easy" &&
               "bg-[linear-gradient(to_left,_#B2F2BB,_transparent_100%)]",
            runType === "recovery" &&
               "bg-[linear-gradient(to_left,_#D3F9D8,_transparent_100%)]",
            runType === "tempo" &&
               "bg-[linear-gradient(to_left,_#FFE8A1,_transparent_100%)]",
            runType === "progression" &&
               "bg-[linear-gradient(to_left,_#FFD6A5,_transparent_100%)]",
            runType === "interval" &&
               "bg-[linear-gradient(to_left,_#FFADAD,_transparent_100%)]",
            runType === "speed-work" &&
               "bg-[linear-gradient(to_left,_#FF85C1,_transparent_100%)]",
            runType === "race" &&
               "bg-[linear-gradient(to_left,_#F783AC,_transparent_100%)]",
            runType === "fartlek" &&
               "bg-[linear-gradient(to_left,_#A0C4FF,_transparent_100%)]",
            runType === "hill-training" &&
               "bg-[linear-gradient(to_left,_#99E9F2,_transparent_100%)]",
            runType === "long-run" &&
               "bg-[linear-gradient(to_left,_#D0BFFF,_transparent_100%)]",
            runType === "daily-miles" &&
               "bg-[linear-gradient(to_left,_#BDB2FF,_transparent_100%)]"
         )}
      >
         {toSentenceCase(runType)}
      </div>
   );
};
