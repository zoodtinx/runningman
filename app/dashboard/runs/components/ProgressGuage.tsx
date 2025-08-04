"use client";

type RunGaugeProps = {
   progress: number; // 0 to 1
   goal: number;
   distance: number;
};

import React, { useState, useMemo } from "react";

export const RunningGauge = ({ progress = 50, goal = 100 }) => {
   const radius = 90;
   const circumference = Math.PI * radius;
   const normalizedProgress = Math.min(progress, goal);
   const progressPercentage = (normalizedProgress / goal) * 100;

   // Calculate the rotation angle for the needle (0 to 180 degrees for a half circle)
   const angle = useMemo(
      () => (normalizedProgress / goal) * 180,
      [normalizedProgress, goal]
   );

   // Data for the tick marks
   const ticks = Array.from({ length: 11 }, (_, i) => {
      const tickAngle = i * 18; // 180 degrees / 10 intervals
      const isMajor = i % 2 === 0;
      const tickLength = isMajor ? 15 : 8;

      const angleInRadians = (tickAngle * Math.PI) / 180;
      const startX = 100 + (radius - 10) * Math.cos(angleInRadians + Math.PI);
      const startY = 100 + (radius - 10) * Math.sin(angleInRadians + Math.PI);
      const endX =
         100 + (radius - 10 - tickLength) * Math.cos(angleInRadians + Math.PI);
      const endY =
         100 + (radius - 10 - tickLength) * Math.sin(angleInRadians + Math.PI);

      return { id: i, startX, startY, endX, endY, isMajor };
   });

   return (
      <div className="flex flex-col items-center py-4">
         <div className="relative w-[200px] h-[140px]">
            <svg
               className="absolute inset-0"
               width="200"
               height="100"
               viewBox="0 0 200 100"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
            >
               {/* Gauge background arc */}
               <path
                  d={`M 10 100 A ${radius} ${radius} 0 0 1 190 100`}
                  strokeWidth="2"
                  className="stroke-gray-700"
                  fill="none"
               />

               {/* Ticks along the arc */}
               {ticks.map((tick) => (
                  <line
                     key={tick.id}
                     x1={tick.startX}
                     y1={tick.startY}
                     x2={tick.endX}
                     y2={tick.endY}
                     stroke="white"
                     strokeWidth={tick.isMajor ? 2 : 1}
                     strokeLinecap="round"
                  />
               ))}

               {/* Needle element */}
               <g
                  style={{
                     transformOrigin: "100px 100px",
                     transition: "transform 0.5s ease-in-out",
                     transform: `rotate(${angle}deg)`,
                  }}
               >
                  <path
                     d="M 100 100 L 96 100 L 100 20 L 104 100 Z"
                     fill="#ef4444"
                     className="drop-shadow-lg"
                  />
               </g>
            </svg>

            {/* Display progress and goal */}
            {/* <div className="absolute top-3/4 left-1/2 -translate-x-1/2 w-full text-center">
               <p className="text-3xl font-extrabold font-mono text-blue-400">
                  {progress}
                  <span className="text-gray-400 text-lg font-sans">
                     {" "}
                     / {goal} KM
                  </span>
               </p>
            </div> */}
         </div>
      </div>
   );
};
