import { toSentenceCase } from "@/components/form-elements/utils/helper";
import { cn } from "@/lib/utils";
import { Run } from "@prisma/client";
import { format } from "date-fns";
import { MapPin } from "iconoir-react";

const RouteBar = ({ routeData }: { routeData: Run }) => {
   const distance = routeData.laps
      ? routeData.distance * routeData.laps
      : routeData.distance;

   const userData = {
      unit: "metric",
   };

   const unit = userData.unit === "metric" ? "km" : "mi";

   console.log("routeData", routeData);

   return (
      <div
         className={cn(
            "flex flex-col gap-1 justify-between h-[100px] rounded-base bg-background p-[10px] pt-1 text-primary",
            "border border-transparent hover:border-primary transition-colors cursor-default"
         )}
      >
         <div className="flex items-starts justify-between">
            <span className="text-md font-semibold">{routeData.title}</span>
            {routeData.location && (
               <div className="flex items-center gap-1 text-sm font-medium">
                  <MapPin className="size-3" />
                  <span>{routeData.location}</span>
               </div>
            )}
         </div>
         <div className="flex justify-between items-end grow">
            <div className="flex items-center px-2 border-[1.5px] border-foreground h-full w-[140px] rounded-[7px] font-headline">
               <div className="flex items-baseline leading-none align-middle justify-between w-full">
                  <span className="text-[35px]">
                     {routeData.distance
                        ? routeData.distance
                        : routeData.duration}
                  </span>
                  <span>{routeData.distance ? unit : "min"}</span>
               </div>
            </div>
            <RunTypeBar runType={routeData.runType} />
         </div>
      </div>
   );
};

const RunTypeBar = ({ runType }: { runType: string }) => {
   return (
      <div
         className={cn(
            "text-base font-semibold rounded-full text-background px-3 w-fit",
            runType === "easy" && "bg-[#B2F2BB]",
            runType === "recovery" && "bg-[#D3F9D8]",
            runType === "tempo" && "bg-[#FFE8A1]",
            runType === "progression" && "bg-[#FFD6A5]",
            runType === "interval" && "bg-[#FFADAD]",
            runType === "speed-work" && "bg-[#FF85C1]",
            runType === "race" && "bg-[#F783AC]",
            runType === "fartlek" && "bg-[#A0C4FF]",
            runType === "hill-training" && "bg-[#99E9F2]",
            runType === "long-run" && "bg-[#D0BFFF]",
            runType === "daily-miles" && "bg-[#BDB2FF]"
         )}
      >
         {toSentenceCase(runType)}
      </div>
   );
};

export default RouteBar;
