"use client";
// layout.tsx (server)
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
   Check,
   HeatingSquare,
   CircleSpark,
} from "iconoir-react";
import RunningManLogo from "@/components/icons/RunningManLogo";
import React, { JSX } from "react";
import { Calendar } from "iconoir-react";
import { LocationSelect } from "@/components/main-layout/LocationSelect";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Adjust these types as needed for your actual data structures
interface RunSummaryPanelProps {
   user: any; // Replace 'any' with your actual user type if available
   runSummary: {
      headline: string;
      detail: string;
      keyCondition: any; // Replace with actual type
   };
   scheduledRun: string | undefined;
}

export default function RunSummaryPanel({
   user,
   runSummary,
   scheduledRun,
}: RunSummaryPanelProps) {
   const pathName = usePathname();

   const segments = pathName.split("/").filter(Boolean);
   const lastSegment = segments[segments.length - 1];
   if (lastSegment !== "dashboard") {
      return null;
   }

   return (
      <div
         className={cn(
            "h-1/2 w-full flex flex-1 flex-col justify-between text-background",
            "sm:flex-col sm:h-fit"
         )}
      >
         <div>
            <div
               className={cn(
                  "md:flex justify-between p-3 items-center",
                  "sm:hidden"
               )}
            >
               <RunningManLogo
                  className={cn("sm:w-[160px] md:w-auto h-auto")}
               />
               <LocationSelect user={user} />
            </div>
            <div
               className={cn(
                  "md:pl-7 md:pr-9 md:pt-7",
                  "sm:p-0 sm:py-1 sm:px-5"
               )}
            >
               <p
                  className={cn(
                     "md:text-[70px] font-headline md:leading-18 md:font-normal",
                     "sm:text-[30px] sm:font-bold sm:leading-tight"
                  )}
               >
                  {runSummary.headline}
               </p>
               <p className={cn("text-[23px] pt-1 w-4/5 md:flex", "sm:hidden")}>
                  {runSummary.detail}
               </p>
            </div>
         </div>
         <div className={cn("flex justify-between p-3", "sm:py-2")}>
            <HighlightedStats data={runSummary.keyCondition} />
            <div className={cn("flex gap-2")}>
               <span className={cn("flex gap-1 items-center")}>
                  <Calendar
                     className={cn("stroke-[1.7px] md:block", "sm:hidden")}
                  />
                  <p>Scheduled Run:</p>
               </span>
               <span className={cn("font-bold")}>{scheduledRun}</span>
            </div>
         </div>
      </div>
   );
}

export const HighlightedStats = ({
   data,
   mode = "base",
}: {
   data: string[];
   mode?: "base" | "mobile";
}) => {
   const iconClass = `stroke-[1.7px] ${mode === "mobile" && "size-4"}`;

   const icon: Record<string, JSX.Element> = {
      temperature: <TemperatureHigh className={iconClass} />,
      "feels-like": <CircleSpark className={iconClass} />,
      "heat-index": <HeatingSquare className={iconClass} />,
      humidity: <Droplet className={iconClass} />,
      cloudiness: <Cloud className={iconClass} />,
      "uv-index": <Sun className={iconClass} />,
      visibility: <Tree className={iconClass} />,
      "wind-speed": <Wind className={iconClass} />,
      "rain-chance": <Rain className={iconClass} />,
      "sunset-time": <Sunset className={iconClass} />,
      "sunrise-time": <Sunrise className={iconClass} />,
      aqi: <AirQuality className={iconClass} />,
      "pm2.5": <Pm25 className={iconClass} />,
      pollen: <Pollen className={iconClass} />,
      default: <Thermometer className={iconClass} />,
   };

   const icons = data.map((stat, key) =>
      React.cloneElement(icon[stat], { key })
   );

   return (
      <div className="flex gap-[5px] md:flex sm:hidden">
         {icons}
         <Check className={iconClass} />
         {/* {isOk ? (
            <Check className={iconClass} />
         ) : (
            <Xmark className={iconClass} />
         )} */}
      </div>
   );
};
