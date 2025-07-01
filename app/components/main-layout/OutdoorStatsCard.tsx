import { cn } from "@/lib/utils";
import { OutdoorStat } from "@prisma/client";
import {
   TemperatureHigh,
   Wind,
   SunLight,
   WarningTriangle,
   Ruler,
   Rain,
   Droplet,
   AirplaneHelix,
   Tree,
   Cloud,
   FillColor,
   Shirt,
} from "iconoir-react";

export const OutdoorStatsCard = ({ statData }: { statData: OutdoorStat }) => {
   return (
      <div
         className={cn(
            "flex basis-1/2 w-1/2 h-[100px] rounded-[12px] p-2 justify-between",
            statData.range === "good" &&
               "bg-[linear-gradient(to_bottom,_#dcfffe_0%,_#b4f0ef_100%)]",
            statData.range === "okay" &&
               "bg-[linear-gradient(to_bottom,_#fdffda_0%,_#f5f9aa_100%)]",
            statData.range === "bad" &&
               "bg-[linear-gradient(to_bottom,_#ffd4d4_0%,_#ffbebe_100%)]"
         )}
      >
         <div className="flex flex-col justify-between w-1/2">
            <StatIcon statType={statData.type} />
            <p
               className={cn(
                  "font-headline font-bold text-[24px] pl-1 leading-7",
                  statData.valueType === "number" && "text-[40px] leading-10"
               )}
            >
               {statData.value}
            </p>
         </div>
         <div className="flex flex-col justify-between w-1/3 items-end">
            <div className="flex flex-col gap-[2px] items-end">
               <p className="font-semibold text-[14px]">{statData.label}</p>
               <p className="text-[11px] text-right leading-tight">
                  {statData.detail}
               </p>
            </div>
         </div>
      </div>
   );
};

const StatIcon = ({ statType }: { statType: string }) => {
   const iconClass = "stroke-[1.7px]";
   switch (statType) {
      case "temperature":
         return <TemperatureHigh className={iconClass} />;
      case "humidity":
         return <Droplet className={iconClass} />;
      case "precipitation":
         return <Rain className={iconClass} />;
      case "wind":
         return <Wind className={iconClass} />;
      case "air":
         return <AirplaneHelix className={iconClass} />;
      case "visibility":
         return <Tree className={iconClass} />;
      case "sun":
         return <SunLight className={iconClass} />;
      case "cloud":
         return <Cloud className={iconClass} />;
      case "alerts":
         return <WarningTriangle className={iconClass} />;
      case "comfort":
         return <Shirt className={iconClass} />;
      case "hydration":
         return <FillColor className={iconClass} />;
      default:
         return <Ruler className={iconClass} />;
   }
};

// const outdoorStatsConfig =

export default OutdoorStatsCard;
