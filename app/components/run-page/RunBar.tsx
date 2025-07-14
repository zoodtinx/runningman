import { toSentenceCase } from "@/components/form-elements/utils/helper";
import { cn } from "@/lib/utils";
import { Run } from "@prisma/client";
import { format } from "date-fns";

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

   const pace = runData.duration / distance;
   const formattedPace = formatPace(pace);

   return (
      <div
         className={cn(
            "flex flex-col justify-between h-[84px] rounded-base bg-background p-[10px]",
            "border border-transparent hover:border-primary transition-colors cursor-default"
         )}
      >
         <div className="flex justify-between items-baseline font-headline px-1">
            <div className="flex items-baseline gap-2 leading-9">
               <p className="text-[36px] font-bold">{runData.distance}</p>
               <p className="text-[22px]">{unit}</p>
            </div>
            <div className="flex gap-5">
               <span className="text-[30px]">{formattedPace}</span>
               <span className="hidden md:flex gap-2 items-baseline">
                  <p className="text-[30px]">{runData.duration}</p>
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
            runType === "easy" &&
               "bg-[linear-gradient(to_right,_#B2F2BB,_transparent_100%)]",
            runType === "recovery" &&
               "bg-[linear-gradient(to_right,_#D3F9D8,_transparent_100%)]",
            runType === "tempo" &&
               "bg-[linear-gradient(to_right,_#FFE8A1,_transparent_100%)]",
            runType === "progression" &&
               "bg-[linear-gradient(to_right,_#FFD6A5,_transparent_100%)]",
            runType === "interval" &&
               "bg-[linear-gradient(to_right,_#FFADAD,_transparent_100%)]",
            runType === "speed-work" &&
               "bg-[linear-gradient(to_right,_#FF85C1,_transparent_100%)]",
            runType === "race" &&
               "bg-[linear-gradient(to_right,_#F783AC,_transparent_100%)]",
            runType === "fartlek" &&
               "bg-[linear-gradient(to_right,_#A0C4FF,_transparent_100%)]",
            runType === "hill-training" &&
               "bg-[linear-gradient(to_right,_#99E9F2,_transparent_100%)]",
            runType === "long-run" &&
               "bg-[linear-gradient(to_right,_#D0BFFF,_transparent_100%)]",
            runType === "daily-miles" &&
               "bg-[linear-gradient(to_right,_#BDB2FF,_transparent_100%)]"
         )}
      >
         {toSentenceCase(runType)}
      </div>
   );
};

export default RunBar;
