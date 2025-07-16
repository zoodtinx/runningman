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
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { getRunSummary } from "@/lib/run-conditions/calculate-readiness";
import { LocationSelect } from "@/components/main-layout/LocationSelect";

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
         userId: "master",
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
            <div className="sm:hidden md:flex justify-between p-3 items-center">
               <RunningManLogo className="" />
               <LocationSelect user={user as any} />
            </div>
            <div className="pl-7 pr-9 pt-7">
               <p className="text-[70px] font-headline leading-18">
                  {runSummary.headline}
               </p>
               <p className="text-[23px] pt-1 w-4/5">{runSummary.detail}</p>
            </div>
         </div>
         <div className="flex justify-between p-3">
            <HighlightedStats data={runSummary.keyCondition} />
            <div className="flex gap-2">
               <span className="flex gap-1 items-center">
                  <Calendar className="stroke-[1.7px]" />
                  <p>Scheduled Run:</p>
               </span>
               <span className="font-bold">{scheduledRun()}</span>
            </div>
         </div>
      </div>
   );
};

const HighlightedStats = ({ data }: { data: string[] }) => {
   const iconClass = "stroke-[1.7px]";

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
      <div className="flex gap-[5px]">
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

export default RunSummarySection;
