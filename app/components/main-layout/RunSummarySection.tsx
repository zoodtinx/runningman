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
   Xmark,
} from "iconoir-react";
import React, { JSX } from "react";
import { Calendar } from "iconoir-react";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { getRunSummary } from "@/lib/run-conditions/calculate-readiness";
import { LocationSelect } from "@/components/main-layout/LocationSelect";
import { LogoPopover } from "@/dashboard/components/LogoPopover";

const RunSummarySection = async () => {
   const session = await auth();

   if (!session?.user?.id) {
      return <div>Not authenticated</div>;
   }

   const userId = session.user.id;

   const user = await prisma.user.findUnique({
      where: {
         id: userId,
      },
      include: {
         schedules: {
            orderBy: {
               dayOfWeek: "asc",
            },
         },
      },
   });

   if (!user) {
      return <div className="text-red-500 p-4">User not found.</div>;
   }

   const runConditions = await prisma.runCondition.findMany({
      where: {
         location: user.location || "bangkok",
      },
   });

   let conditionPriority = user!.conditionPriority;
   if (typeof conditionPriority === "string") {
      try {
         conditionPriority = JSON.parse(conditionPriority);
      } catch {
         conditionPriority = {};
      }
   }

   const runSummary = getRunSummary(
      conditionPriority as Record<string, number>,
      runConditions
   );

   const scheduledRun = async () => {
      const todayIndex = new Date().getDay();

      if (!user?.schedules[todayIndex].routeId) {
         return "No Run Scheduled";
      }

      const scheduled = await prisma.route.findUnique({
         where: {
            id: user!.schedules[todayIndex].routeId,
         },
      });
      return scheduled?.title;
   };

   return (
      <div className="h-1/2 w-full flex flex-1  flex-col justify-between text-background">
         <div>
            <div className="sm:hidden md:flex justify-between p-2 items-center">
               <LogoPopover />
               <LocationSelect user={user as any} />
            </div>
            <div className="pr-9 pt-4 pl-2 w-[90%]">
               <p className="text-[52px] xl:text-[67px] font-headline leading-14 xl:leading-18 mb-2">
                  {runSummary.headline}
               </p>
               <p className="text-md w-4/5 mb-2">{runSummary.detail}</p>
               <HighlightedStats
                  data={runSummary.keyCondition}
                  score={runSummary.readinessScore}
               />
            </div>
         </div>
         <div className="flex justify-between pb-1 pr-4 pl-2">
            <div className="flex gap-2 text-base">
               <span className="flex gap-1 items-center">
                  <Calendar className="stroke-[1.7px]" />
                  <span>Scheduled Run: </span>
                  <span className="font-bold">{scheduledRun()}</span>
               </span>
            </div>
         </div>
      </div>
   );
};

const HighlightedStats = ({
   data,
   score,
}: {
   data: string[];
   score: number;
}) => {
   const iconClass = "stroke-[1.7px] size-5";

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
      <div className="flex items-center gap-1 rounded-full w-fit">
         {icons}
         {score > 3 ? (
            <Check className="stroke-[1.7px] size-6" />
         ) : (
            <Xmark className="stroke-[1.7px] size-6" />
         )}
         {/* <div className="border-r border-r-background" /> */}
      </div>
   );
};

export default RunSummarySection;
