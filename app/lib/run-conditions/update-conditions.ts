/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

// Imports
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
} from "./run-condition-utils";

// Utility Functions
function delay(ms: number) {
   return new Promise((resolve) => setTimeout(resolve, ms));
}

// Main Functions

/**
 * Refreshes run conditions for a specific location.
 * Fetches current and future weather data, maps them to run conditions,
 * and stores them in the database. Falls back to local file if fetch fails.
 */
export async function refreshConditions(location: string) {
   console.log("updating");
   let newCurrentData, newfutureData, newConditions, aqi: number | null;

   await prisma.$transaction(async (tx) => {
      // Remove old conditions for this location
      await tx.runCondition.deleteMany({
         where: { location },
      });

      try {
         // Fetch new weather data
         newCurrentData = await fetchRealtimeWeatherData(location);
         await delay(400); // delay between requests
         newfutureData = await fetchFutureWeatherData(location);
         aqi = await fetchAQI(location);

         // Optionally write to local file in development
         if (process.env.NODE_ENV === "development") {
            const fs = await import("fs/promises");
            const path = await import("path");
            const outDir = path.join(process.cwd(), "tmp", "run-conditions");
            await fs.mkdir(outDir, { recursive: true });
            const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
            const outFile = path.join(outDir, `${location}-${timestamp}.json`);
            const outData = {
               location,
               fetchedAt: new Date().toISOString(),
               currentData: newCurrentData,
               futureData: newfutureData,
            };
            await fs.writeFile(
               outFile,
               JSON.stringify(outData, null, 2),
               "utf-8"
            );
         }

         if (!newfutureData || !newCurrentData)
            throw new Error("No future data");
      } catch (error) {
         // Fallback to local file if fetch fails
         console.error(
            "Failed to fetch weather data, falling back to local file:",
            error
         );
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

      newCurrentData.values.aqi = aqi;

      // Map weather data to run conditions
      newConditions = await mapWeatherToRunConditionsWithFuture({
         currentData: newCurrentData,
         futureData: newfutureData,
         locationName: location,
      });

      // Store new conditions in the database
      await tx.runCondition.createMany({
         data: newConditions,
      });
   });

   return;
}

/**
 * Refreshes run conditions for all supported locations.
 */
export async function refreshAllConditions() {
   const locations = ["bangkok", "chiangmai", "phuket", "khonkaen", "hatyai"];
   for (const loc of locations) {
      await refreshConditions(loc);
      await delay(1000); // wait 1 second before next call
   }

   // await refreshConditions("bangkok");
}

/**
 * Maps weather data to an array of run condition DTOs.
 */
export async function mapWeatherToRunConditionsWithFuture(config: {
   currentData: any;
   futureData: any;
   locationName: string;
}): Promise<CreateRunConditionDto[]> {
   const { currentData, futureData, locationName } = config;

   const currentValues = currentData.values;
   const futureValues = futureData.hourly.values;
   console.log("daily values", futureData.daily.values);

   const conditions: CreateRunConditionDto[] = Object.keys(keyMap).map(
      (key) => {
         let currRaw = currentValues[keyMap[key]];
         let futRaw = futureValues[keyMap[key]];

         // sunrise/set time only avaialble in futureValues payload object
         if (key === "sunrise-time" || key === "sunset-time") {
            currRaw = futureData.daily.values[keyMap[key]];
            console.log("currRaw", currRaw);
            futRaw = undefined;
         }

         // Wind speed conversion m/s to km/h
         if (key === "wind-speed") {
            if (typeof currRaw === "number")
               currRaw = +(currRaw * 3.6).toFixed(1);
            if (typeof futRaw === "number") futRaw = +(futRaw * 3.6).toFixed(1);
         }

         const value =
            currRaw === undefined ? dummyTimes[key] || "" : currRaw.toString();
         const futureValue =
            futRaw === undefined ? dummyTimes[key] || "" : futRaw.toString();

         const valueType = typeof currRaw === "number" ? "number" : "string";

         const range = calculateRange(key, currRaw) as 1 | 2 | 3;
         const description = getStatusMessage(
            key as keyof typeof import("./run-condition-utils").runningConditionStatusMessages,
            range
         );

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
            userId: "master",
         };
      }
   );

   return conditions;
}
