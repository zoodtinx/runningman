import { cn } from "@/lib/utils";
import { RunCondition } from "@prisma/client";
import { format } from "date-fns";
import {
   TemperatureHigh,
   Droplet,
   Cloud,
   SunLight as Sun,
   Wind,
   Rain,
   SeaAndSun as Sunset,
   SeaAndSun as Sunrise,
   AirplaneHelix as AirQuality,
   DotsGrid3x3 as Pm25,
   Flower as Pollen,
   TemperatureHigh as Thermometer,
   Tree,
   HeatingSquare,
} from "iconoir-react";

export const RunConditionCard = ({ statData }: { statData: RunCondition }) => {
   const getValue = () => {
      if (statData.type === "sunrise-time" || statData.type === "sunset-time") {
         return format(statData.value, "h:mm aaa");
      } else {
         return statData.value;
      }
   };

   const getFutureValue = () => {
      const noFuture = ["sunrise-time", "sunset-time", "aqi"];
      if (noFuture.includes(statData.type)) {
         return;
      } else {
         return (
            <>
               <div>
                  <span>{statData.futureValue}</span>
               </div>
               <span className="text-sm">in 1 hour</span>
            </>
         );
      }
   };

   return (
      <div
         className={cn(
            "flex flex-col w-full h-[90px] shrink-0 md:shrink rounded-base lg:rounded-[10px] p-2 justify-between",
            // "md:basis-1/2 md:w-1/2 md:h-[100px]",
            "lg:basis-1/2 lg:w-1/2 lg:h-[84px]",
            statData.range === 3 &&
               "bg-[linear-gradient(to_bottom,_#dcfffe_0%,_#b4f0ef_100%)]",
            statData.range === 2 &&
               "bg-[linear-gradient(to_bottom,_#fdffda_0%,_#f5f9aa_100%)]",
            statData.range === 1 &&
               "bg-[linear-gradient(to_bottom,_#ffd4d4_0%,_#ffbebe_100%)]"
         )}
      >
         <div className="flex justify-between w-full items-start">
            <div className="flex gap-1 items-center">
               <StatIcon statType={statData.type} />
               <p className="font-semibold text-left lg:text-[12px] xl:text-base uppercase">
                  {statData.name}
               </p>
            </div>
            <div className="flex flex-col gap-[2px] items-end w-1/2">
               <p className="lg:text-[12px] xl:text-[13px] text-right leading-tight pr-1 line-clamp-3">
                  {statData.summary}
               </p>
            </div>
         </div>
         <div className="flex justify-between w-full items-baseline">
            <p
               className={cn(
                  "font-headline font-bold text-[24px] pl-1 leading-7",
                  statData.valueType === "number" && "text-[30px] leading-9"
               )}
            >
               <span className="leading-7">{getValue()}</span>
               <span className="text-[19px] leading-7"> {statData.unit}</span>
            </p>
            <div className="flex gap-1 justify-end items-baseline font-medium opacity-40">
               {getFutureValue()}
            </div>
         </div>
      </div>
   );
};

const StatIcon = ({ statType }: { statType: string }) => {
   const iconClass = "stroke-[1.7px] size-[13px] xl:size-4";

   switch (statType.toLowerCase()) {
      case "temperature":
         return <TemperatureHigh className={iconClass} />;
      case "feels-like":
         return <HeatingSquare className={iconClass} />;
      case "heat-index":
         return <HeatingSquare className={iconClass} />;
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
