import { cn } from "@/lib/utils";
import { Run } from "@prisma/client";
import { format } from "date-fns";
import { MapPin } from "iconoir-react";

const RunBar = ({ runData }: { runData: Run }) => {
   const distance = runData.laps
      ? runData.distance * runData.laps
      : runData.distance;

   const userData = {
      unit: "metric",
   };

   const unit = userData.unit === "metric" ? "km" : "mi";

   const formatPace = (pace: number) => {
      const minutes = Math.floor(pace);
      const seconds = Math.round((pace - minutes) * 60);
      return `${minutes}'${seconds.toString().padStart(2, "0")}"`;
   };

   const pace = runData.duration / 60 / distance;
   const formattedPace = formatPace(pace);
   const formattedDuration = Math.floor(runData.duration / 60);

   return (
      <div className="flex flex-col justify-between h-[84px] rounded-base bg-background p-[10px]">
         <div className="flex justify-between w-full items-baseline font-headline px-1">
            <div className="flex items-baseline gap-2 leading-9">
               <p className="text-[36px] font-bold">{runData.distance}</p>
               <p className="text-[22px]">{unit}</p>
            </div>
            <div className="flex gap-5">
               <span className="text-[30px]">{formattedPace}</span>
               <span className="flex gap-2 items-baseline">
                  <p className="text-[30px]">{formattedDuration}</p>
                  <p className="text-[22px]">min</p>
               </span>
            </div>
         </div>
         <div className="flex justify-between items-center">
            <RunTypeBar runType={runData.runType} />
            <div className="flex gap-3 opacity-30">
               <span className="text-sm">
                  {format(
                     new Date(runData.dateTime),
                     "EEEE, MMMM d 'at' h.mmaa"
                  )}
               </span>
               <span className="flex gap-[2px] items-center text-sm">
                  <MapPin className="size-3" />
                  <p>{runData.location}</p>
               </span>
            </div>
         </div>
      </div>
   );
};

const RunTypeBar = ({ runType }: { runType: string }) => {
   return (
      <div
         className={cn(
            "text-sm font-semibold rounded-full text-background px-2 w-1/3",
            runType === "Easy" &&
               "bg-[linear-gradient(to_right,_#B2F2BB,_transparent_100%)]",
            runType === "Recovery" &&
               "bg-[linear-gradient(to_right,_#D3F9D8,_transparent_100%)]",
            runType === "Tempo" &&
               "bg-[linear-gradient(to_right,_#FFE8A1,_transparent_100%)]",
            runType === "Progression" &&
               "bg-[linear-gradient(to_right,_#FFD6A5,_transparent_100%)]",
            runType === "Interval" &&
               "bg-[linear-gradient(to_right,_#FFADAD,_transparent_100%)]",
            runType === "Speed Work" &&
               "bg-[linear-gradient(to_right,_#FF85C1,_transparent_100%)]",
            runType === "Race" &&
               "bg-[linear-gradient(to_right,_#F783AC,_transparent_100%)]",
            runType === "Fartlek" &&
               "bg-[linear-gradient(to_right,_#A0C4FF,_transparent_100%)]",
            runType === "Hill Training" &&
               "bg-[linear-gradient(to_right,_#99E9F2,_transparent_100%)]",
            runType === "Long Run" &&
               "bg-[linear-gradient(to_right,_#D0BFFF,_transparent_100%)]",
            runType === "Daily Miles" &&
               "bg-[linear-gradient(to_right,_#BDB2FF,_transparent_100%)]"
         )}
      >
         {runType}
      </div>
   );
};

export default RunBar;
