import { cn } from "@/lib/utils";
import { RunCondition } from "@prisma/client";
import {
   TemperatureHigh,
   Droplet,
   Cloud,
   SunLight as Sun,
   Eye,
   Wind,
   Rain,
   SeaAndSun as Sunset,
   SeaAndSun as Sunrise,
   AirplaneHelix as AirQuality,
   DotsGrid3x3 as Pm25,
   Flower as Pollen,
   TemperatureHigh as Thermometer,
   Tree,
} from "iconoir-react";

export const RunConditionCard = ({ statData }: { statData: RunCondition }) => {
   return (
      <div
         className={cn(
            "flex basis-1/2 w-1/2 h-[100px] rounded-base p-2 justify-between",
            statData.range === 1 &&
               "bg-[linear-gradient(to_bottom,_#dcfffe_0%,_#b4f0ef_100%)]",
            statData.range === 2 &&
               "bg-[linear-gradient(to_bottom,_#fdffda_0%,_#f5f9aa_100%)]",
            statData.range === 3 &&
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
               <p className="font-semibold text-[14px] text-right">
                  {statData.name}
               </p>
               <p className="text-[11px] text-right leading-tight">
                  {statData.summary}
               </p>
            </div>
         </div>
      </div>
   );
};

const StatIcon = ({ statType }: { statType: string }) => {
   const iconClass = "stroke-[1.7px]";

   switch (statType.toLowerCase()) {
      case "temperature":
         return <TemperatureHigh className={iconClass} />;
      case "feels-like":
      case "heat-index":
         return <Thermometer className={iconClass} />;
      case "humidity":
         return <Droplet className={iconClass} />;
      case "cloudiness":
         return <Cloud className={iconClass} />;
      case "uv-index":
         return <Sun className={iconClass} />;
      case "visibility":
         return <Tree className={iconClass} />;
      case "wind-speed":
         return <Wind className={iconClass} />;
      case "rain-chance":
         return <Rain className={iconClass} />;
      case "sunset-time":
         return <Sunset className={iconClass} />;
      case "sunrise-time":
         return <Sunrise className={iconClass} />;
      case "aqi":
         return <AirQuality className={iconClass} />;
      case "pm2.5":
         return <Pm25 className={iconClass} />;
      case "pollen":
         return <Pollen className={iconClass} />;
      default:
         return <Thermometer className={iconClass} />;
   }
};

// const outdoorStatsConfig =
