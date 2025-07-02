// layout.tsx (server)
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
   Check,
   Xmark,
} from "iconoir-react";
import RunningManLogo from "@/components/icons/RunningManLogo";
import React, { JSX } from "react";
import Nav from "@/components/main-layout/Nav";
import { OutdoorStatsSection } from "@/components/main-layout/OutdoorStatsSection";
import { Calendar } from "iconoir-react";
import { MainPageData } from "@/types/payload.types";
import {
   Select,
   SelectTrigger,
   SelectContent,
   SelectItem,
   SelectValue,
} from "@/components/primitives/Select";
import { cn } from "@/lib/utils";

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
               detail: "Feels like 33°C, partly cloudy",
            },
            {
               type: "humidity",
               label: "Humidity",
               valueType: "number",
               value: "78",
               range: "bad",
               detail: "High humidity, hydrate well",
            },
            {
               type: "aqi",
               label: "Air Quality",
               valueType: "text",
               value: "Good",
               range: "good",
               detail: "Good air quality",
            },
            {
               type: "sunrise",
               label: "Sunrise",
               valueType: "number",
               value: "5:34",
               range: "good",
               detail: "Sun rises at 5:34 AM",
            },
            {
               type: "sunset",
               label: "Sunset",
               valueType: "text",
               value: "18:14",
               range: "good",
               detail: "Sun sets at 6:14 PM",
            },
         ],
      },
   };

   return (
      <div className="w-screen h-screen bg-theme-speed flex justify-center">
         <main className="w-[1440px] h-full flex items-center gap-4 p-4">
            <section className="w-1/2 h-full flex flex-col gap-2">
               <div className="flex flex-1  flex-col justify-between w-full">
                  <div>
                     <div className="flex justify-between p-3 items-center">
                        <RunningManLogo className="text-background" />
                        <div className="flex gap-2 items-baseline">
                           <span className="text-sm">Location</span>
                           <LocationSelect />
                        </div>
                     </div>
                     <div className="pl-7 pr-9 pt-7">
                        <p className="text-[70px] text-background font-headline leading-18">
                           {mainPageData.headline.toUpperCase()}
                        </p>
                        <p className="text-[23px] pt-1">
                           {mainPageData.subHead}
                        </p>
                     </div>
                  </div>
                  <div className="flex justify-between p-3">
                     <HighlightedStats data={mainPageData as any} />
                     <div className="flex gap-2">
                        <span className="flex gap-1 items-center">
                           <Calendar className="stroke-[1.7px]" />
                           <p>Scheduled Run:</p>
                        </span>
                        <span className="font-bold">Long Run</span>
                     </div>
                  </div>
               </div>
               <div className="flex-1 w-full bg-foreground rounded-[23px]">
                  <OutdoorStatsSection />
               </div>
            </section>
            <section className="flex flex-col w-1/2 h-full bg-foreground rounded-[23px] text-primary relative overflow-clip">
               <Nav />
               {children}
            </section>
         </main>
      </div>
   );
};

const LocationSelect = () => {
   return (
      <Select value="bangkok">
         <SelectTrigger
            className={cn(
               "focus:outline-none text-base font-bold grow p-0 h-auto flex items-center justify-between"
            )}
         >
            <SelectValue placeholder="Select" />
         </SelectTrigger>
         <SelectContent>
            <SelectItem value="bangkok">Bangkok</SelectItem>
            <SelectItem value="tokyo">Tokyo</SelectItem>
            <SelectItem value="nyc">New York</SelectItem>
         </SelectContent>
      </Select>
   );
};

const HighlightedStats = ({ data }: { data: MainPageData }) => {
   const isOk = data.stats.ok.length >= data.stats.notOk.length;
   const stats = isOk ? data.stats.ok : data.stats.notOk;

   const iconClass = "stroke-[1.7px]";

   const icon: Record<string, JSX.Element> = {
      temperature: <TemperatureHigh className={iconClass} />,
      humidity: <Droplet className={iconClass} />,
      precipitation: <Rain className={iconClass} />,
      wind: <Wind className={iconClass} />,
      air: <AirplaneHelix className={iconClass} />,
      visibility: <Tree className={iconClass} />,
      sun: <SunLight className={iconClass} />,
      cloud: <Cloud className={iconClass} />,
      alerts: <WarningTriangle className={iconClass} />,
      comfort: <Shirt className={iconClass} />,
      hydration: <FillColor className={iconClass} />,
      default: <Ruler className={iconClass} />,
   };

   const icons = stats.map((stat, key) =>
      React.cloneElement(icon[stat], { key })
   );

   return (
      <div className="flex gap-[4px]">
         {icons}
         {isOk ? (
            <Check className={iconClass} />
         ) : (
            <Xmark className={iconClass} />
         )}
      </div>
   );
};

export default Layout;
