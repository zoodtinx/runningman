// layout.tsx (server)
import RunningManLogo from "@/components/icons/RunningManLogo";
import DayBar from "@/components/main-layout/DayBar";
import OutdoorStatsCard from "@/components/main-layout/OutdoorStatsCard";
import React from "react";
import Nav from "@/components/main-layout/Nav";
import { OutdoorStat } from "@prisma/client";
import { MainPageData } from "@/types/payload.types";
import { OutdoorStatsSection } from "@/components/main-layout/OutdoorStatsSection";

const Layout = ({ children }: { children: React.ReactNode }) => {
   const mainPageData = {
      userData: {
         email: "alex.taylor@gmail.com",
         name: "Alex Taylor",
         theme: "speed",
         preferredUnits: "km",
         notificationEnabled: true,
      },
      headline: "Perfect Day To Run",
      subHead: "Sun is nice, weather is clear",
      stats: {
         ok: ["temperature", "humidity", "wind", "precipitation"],
         notOk: ["temperature", "humidity", "wind"],
         statsList: [
            {
               type: "temperature",
               label: "Temperature",
               valueType: "number",
               value: "29.5",
               range: "good",
               details: "Feels like 33°C, partly cloudy",
            },
            {
               type: "humidity",
               label: "Humidity",
               valueType: "number",
               value: "78",
               range: "bad",
               details: "High humidity, hydrate well",
            },
            {
               type: "aqi",
               label: "AQI",
               valueType: "text",
               value: "Good",
               range: "good",
               details: "Good air quality",
            },
            {
               type: "sunrise",
               label: "Sunrise",
               valueType: "number",
               value: "5:34",
               range: "good",
               details: "Sun rises at 5:34 AM",
            },
            {
               type: "sunset",
               label: "Sunset",
               valueType: "text",
               value: "18:14",
               range: "good",
               details: "Sun sets at 6:14 PM",
            },
         ],
      },
   };

   return (
      <div className="w-screen h-screen bg-theme-speed flex justify-center">
         <main className="w-[1440px] h-full flex items-center gap-4 p-4">
            <section className="w-1/2 h-full flex flex-col gap-2">
               <div className="flex-1 w-full">
                  <div className="p-2">
                     <RunningManLogo className="text-background" />
                  </div>
               </div>
               <div className="flex-1 w-full bg-foreground rounded-[23px]">
                  <OutdoorStatsSection />
               </div>
            </section>
            <section className="flex flex-col w-1/2 h-full bg-foreground rounded-[23px] text-primary">
               <Nav />
               {children}
            </section>
         </main>
      </div>
   );
};

export default Layout;
