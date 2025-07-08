/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { prisma } from "@/lib/prisma";
import { CreateRunConditionDto } from "@/lib/zod/run-conditions.zod.schema";
import {
   fetchRealtimeWeatherData,
   fetchFutureWeatherData,
} from "@/lib/run-conditions/fetch-helpers";

function delay(ms: number) {
   return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function refreshConditions(location: string) {
   console.log("updating");
   await prisma.runCondition.deleteMany({
      where: {
         location: location,
      },
   });

   const newCurrentData = await fetchRealtimeWeatherData(location);
   await delay(400); // delay between requests
   const newfutureData = await fetchFutureWeatherData(location);

   const newConditions = await mapWeatherToRunConditionsWithFuture({
      currentData: newCurrentData,
      futureData: newfutureData,
      locationName: location,
   });

   await prisma.runCondition.createMany({
      data: newConditions,
   });

   return;
}

export async function refreshAllConditions() {
   const locations = ["bangkok", "chiangmai", "phuket", "khonkaen", "hatyai"];
   for (const loc of locations) {
      await refreshConditions(loc);
      await delay(1000); // wait 1 second before next call
   }
}

export async function mapWeatherToRunConditionsWithFuture(config: {
   currentData: any;
   futureData: any;
   locationName: string;
}): Promise<CreateRunConditionDto[]> {
   const { currentData, futureData, locationName } = config;

   const currentValues = currentData.values;
   const futureValues = futureData.values;

   const summaries: Record<string, string> = {
      temperature: "Current temperature.",
      "feels-like": "Feels like temperature.",
      "heat-index": "Heat index based on temp and humidity.",
      humidity: "Humidity level.",
      cloudiness: "Cloud cover percentage.",
      "uv-index": "UV index level.",
      visibility: "Visibility distance in km.",
      "wind-speed": "Wind speed in km/h.",
      "rain-chance": "Chance of rain percentage.",
      "sunset-time": "Sunset time.",
      "sunrise-time": "Sunrise time.",
   };

   const units: Record<string, string> = {
      temperature: "°C",
      "feels-like": "°C",
      "heat-index": "°C",
      humidity: "%",
      cloudiness: "%",
      "uv-index": "",
      visibility: "km",
      "wind-speed": "km/h",
      "rain-chance": "%",
      "sunset-time": "HH:mm",
      "sunrise-time": "HH:mm",
   };

   const keyMap: Record<string, keyof typeof currentValues | string> = {
      temperature: "temperature",
      "feels-like": "temperatureApparent",
      "heat-index": "temperatureApparent",
      humidity: "humidity",
      cloudiness: "cloudCover",
      "uv-index": "uvIndex",
      visibility: "visibility",
      "wind-speed": "windSpeed",
      "rain-chance": "precipitationProbability",
      "sunset-time": "sunsetTime",
      "sunrise-time": "sunriseTime",
   };

   const dummyTimes: Record<string, string> = {
      "sunset-time": "18:45",
      "sunrise-time": "06:03",
   };

   const conditions: CreateRunConditionDto[] = Object.keys(keyMap).map(
      (key) => {
         let currRaw = currentValues[keyMap[key]];
         let futRaw = futureValues[keyMap[key]];

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

         return {
            name: capitalize(key),
            type: key,
            value,
            valueType,
            range: calculateRange(key, currRaw),
            unit: units[key] || "",
            summary: summaries[key] || "",
            location: locationName,
            futureValue,
            userId: "master",
         };
      }
   );

   return conditions;
}

const capitalize = (s: string) =>
   s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, " ");

const calculateRange = (type: string, val: number | string): number => {
   if (
      type === "temperature" ||
      type === "feels-like" ||
      type === "heat-index"
   ) {
      if (typeof val === "number") {
         if (val < 10) return 0;
         if (val <= 25) return 2;
         return 1;
      }
   }

   if (type === "humidity") {
      if (typeof val === "number") {
         if (val < 30) return 1;
         if (val <= 60) return 2;
         return 0;
      }
   }

   if (type === "uv-index") {
      if (typeof val === "number") {
         if (val <= 2) return 2;
         if (val <= 5) return 1;
         return 0;
      }
   }

   if (type === "rain-chance") {
      if (typeof val === "number") {
         if (val < 20) return 2;
         if (val < 50) return 1;
         return 0;
      }
   }

   if (type === "cloudiness") {
      if (typeof val === "number") {
         if (val < 30) return 2;
         if (val < 70) return 1;
         return 0;
      }
   }

   if (type === "visibility") {
      if (typeof val === "number") {
         if (val > 10) return 2;
         if (val > 5) return 1;
         return 0;
      }
   }

   if (type === "wind-speed") {
      if (typeof val === "number") {
         if (val < 10) return 2;
         if (val < 20) return 1;
         return 0;
      }
   }

   if (type === "sunrise-time" || type === "sunset-time") {
      return 1;
   }

   return 1;
};
