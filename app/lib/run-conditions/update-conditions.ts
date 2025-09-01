"use server";

import fs from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";
import { CreateRunConditionDto } from "@/lib/zod/run-conditions.zod.schema";
import {
   fetchRealtimeWeatherData,
   fetchFutureWeatherData,
   fetchAQI,
} from "@/lib/run-conditions/fetch-helpers";
import {
   units,
   keyMap,
   dummyTimes,
   capitalize,
   calculateRange,
   getStatusMessage,
   runningConditionStatusMessages,
} from "./run-condition-utils";

// main function
export async function refreshAllConditions() {
   const locations = ["bangkok", "chiangmai", "phuket", "khonkaen", "hatyai"];
   for (const loc of locations) {
      await refreshConditions(loc);
      await delay(1000); // deplay to prevent rate limit
   }
}

export async function refreshConditions(location: string) {
   let newCurrentData, newfutureData, newConditions, aqi: number | null;

   await prisma.$transaction(async (tx) => {
      await tx.runCondition.deleteMany({
         where: { location },
      });

      try {
         // fetch current weather data
         newCurrentData = await fetchRealtimeWeatherData(location);
         await delay(400);
         // fetch future weather data
         newfutureData = await fetchFutureWeatherData(location);
         // fetch aqi data
         aqi = await fetchAQI(location);

         if (!newfutureData || !newCurrentData)
            throw new Error("No future data");
      } catch (error) {
         console.error(
            "Failed to fetch weather data, falling back to local file:",
            error
         );
         // fallbcak to mock data
         const fallbackFile = path.join(
            process.cwd(),
            "tmp",
            "run-conditions",
            "bangkok-2025-07-09T04-10-11-241Z.json"
         );
         const fileData = await fs.readFile(fallbackFile, "utf-8");
         const parsed = JSON.parse(fileData);
         newCurrentData = parsed.currentData;
         newfutureData = parsed.futureData;
      }

      // add aqi to current weather data object
      newCurrentData.values.aqi = aqi;

      // process current, future, and aqi data into one object
      newConditions = await mapWeatherToRunConditionsWithFuture({
         currentData: newCurrentData,
         futureData: newfutureData,
         locationName: location,
      });

      await tx.runCondition.createMany({
         data: newConditions,
      });
   });

   return;
}

export async function mapWeatherToRunConditionsWithFuture(config: {
   currentData: any;
   futureData: any;
   locationName: string;
}): Promise<CreateRunConditionDto[]> {
   const { currentData, futureData, locationName } = config;

   const currentValues = currentData.values;
   // futur value is in hourly property
   const futureValues = futureData.hourly.values;

   const conditions: CreateRunConditionDto[] = Object.keys(keyMap).map(
      (key) => {
         // currentValues & futureValues have keys that match keyMap key
         let currRaw = currentValues[keyMap[key]];
         let futRaw = futureValues[keyMap[key]];

         // sun times has no future value
         if (key === "sunrise-time" || key === "sunset-time") {
            currRaw = futureData.daily.values[keyMap[key]];
            futRaw = undefined;
         }

         // wind speed is in miles, convert to km
         if (key === "wind-speed") {
            if (typeof currRaw === "number")
               currRaw = +(currRaw * 3.6).toFixed(1);
            if (typeof futRaw === "number") futRaw = +(futRaw * 3.6).toFixed(1);
         }

         // fallback for undefined or null field
         const value =
            currRaw === undefined || currRaw === null
               ? dummyTimes[key] || ""
               : currRaw.toString();
         const futureValue =
            futRaw === undefined || futRaw === null
               ? dummyTimes[key] || ""
               : futRaw.toString();

         const valueType = typeof currRaw === "number" ? "number" : "string";

         // check if it's bad (1), okay (2), or good (3)
         const range = calculateRange(key, currRaw) as 1 | 2 | 3;
         const statusKey = key as keyof typeof runningConditionStatusMessages;
         const description = getStatusMessage(statusKey, range);

         return {
            type: key,
            name: capitalize(key),
            value: value,
            valueType: valueType,
            unit: units[key] !== undefined ? units[key] : "",
            range: range,
            summary: description,
            location: locationName,
            futureValue: futureValue,
            // userId: "master",
         };
      }
   );

   return conditions;
}

function delay(ms: number) {
   return new Promise((resolve) => setTimeout(resolve, ms));
}
