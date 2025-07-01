import DayBar from "@/components/main-layout/DayBar";
import OutdoorStatsCard from "@/components/main-layout/OutdoorStatsCard";

export const OutdoorStatsSection = () => {
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
               id: "stat-1",
               userId: "user-1",
               type: "temperature",
               label: "Temperature",
               valueType: "number",
               value: "29.5",
               range: "good",
               detail: "Feels like 33°C, partly cloudy",
            },
            {
               id: "stat-2",
               userId: "user-1",
               type: "humidity",
               label: "Humidity",
               valueType: "number",
               value: "78",
               range: "bad",
               detail: "High humidity, hydrate well",
            },
            {
               id: "stat-3",
               userId: "user-1",
               type: "air",
               label: "AQI",
               valueType: "text",
               value: "Good",
               range: "good",
               detail: "Good air quality",
            },
            {
               id: "stat-4",
               userId: "user-1",
               type: "sun",
               label: "Sunrise",
               valueType: "text",
               value: "5:34",
               range: "good",
               detail: "Sun rises at 5:34 AM",
            },
            {
               id: "stat-5",
               userId: "user-1",
               type: "sun",
               label: "Sunset",
               valueType: "text",
               value: "18:14",
               range: "good",
               detail: "Sun sets at 6:14 PM",
            },
         ],
      },
   };

   const statChunks = [];
   const statsList = mainPageData.stats.statsList;

   for (let i = 0; i < statsList.length; i += 2) {
      statChunks.push(statsList.slice(i, i + 2));
   }

   return (
      <div className="flex flex-col gap-3 w-full p-[12px] overflow-hidden">
         <DayBar />

         <div className="flex flex-col gap-2">
            {statChunks.map((pair, index) => (
               <div key={index} className="flex gap-2">
                  {pair.map((stat) => (
                     <OutdoorStatsCard key={stat.id} statData={stat} />
                  ))}
               </div>
            ))}
         </div>
      </div>
   );
};
