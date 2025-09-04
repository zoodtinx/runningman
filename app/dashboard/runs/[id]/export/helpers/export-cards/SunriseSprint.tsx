import { Run } from "@prisma/client";
import React from "react";

export const SunriseSprint = ({}: { runData?: Run }) => {
   const runData = {
      title: "Angry Tempo Rage",
      distance: 7.2,
      duration: 39,
      laps: 2,
      location: "Lumphini Park",
      runType: "tempo",
      mood: "electrifying",
      gear: "Asics Magic Speed 3",
      note: "Cleared my head.",
      dateTime: "2025-07-03T19:00:00Z",
   };

   // Format helpers
   const formatDate = (iso: string) =>
      new Date(iso).toLocaleDateString("en-US", {
         month: "short",
         day: "numeric",
         year: "numeric",
      });
   const formatTime = (iso: string) =>
      new Date(iso).toLocaleTimeString("en-US", {
         hour: "2-digit",
         minute: "2-digit",
      });

   return (
      <div className="w-[1080px] h-[1080px] bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-200 rounded-3xl shadow-2xl flex flex-col p-16 justify-between font-sans text-gray-900">
         {/* Header */}
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-5xl font-extrabold tracking-tight mb-2">
                  {runData.title}
               </h1>
               <p className="text-lg text-gray-600">
                  {formatDate(runData.dateTime)} •{" "}
                  {formatTime(runData.dateTime)}
               </p>
            </div>
            <div className="flex flex-col items-end">
               <span className="text-2xl font-bold text-orange-500">
                  {runData.runType.toUpperCase()}
               </span>
               <span className="text-base text-gray-500">
                  {runData.location}
               </span>
            </div>
         </div>

         {/* Main Stats */}
         <div className="flex flex-row justify-between items-center mt-12 mb-8">
            <div className="flex flex-col items-center">
               <span className="text-6xl font-extrabold">
                  {runData.distance}
               </span>
               <span className="text-xl text-gray-500">km</span>
            </div>
            <div className="flex flex-col items-center">
               <span className="text-6xl font-extrabold">
                  {runData.duration}
               </span>
               <span className="text-xl text-gray-500">min</span>
            </div>
            <div className="flex flex-col items-center">
               <span className="text-6xl font-extrabold">{runData.laps}</span>
               <span className="text-xl text-gray-500">laps</span>
            </div>
         </div>

         {/* Details Row */}
         <div className="flex flex-row justify-between items-center bg-white/70 rounded-xl px-8 py-6 shadow">
            <div className="flex flex-col">
               <span className="text-sm text-gray-500">Mood</span>
               <span className="text-lg font-semibold">{runData.mood}</span>
            </div>
            <div className="flex flex-col">
               <span className="text-sm text-gray-500">Gear</span>
               <span className="text-lg font-semibold">{runData.gear}</span>
            </div>
            <div className="flex flex-col">
               <span className="text-sm text-gray-500">Note</span>
               <span className="text-lg font-semibold max-w-[200px] truncate">
                  {runData.note}
               </span>
            </div>
         </div>

         {/* Footer */}
         <div className="flex flex-row items-center justify-between mt-8">
            <span className="text-base text-gray-400">#SunriseSprint</span>
            <span className="text-base text-gray-400">runningman.app</span>
         </div>
      </div>
   );
};

export default SunriseSprint;
