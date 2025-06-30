import React from "react";
import { SunLight, TemperatureHigh } from "iconoir-react";

interface StatData {
   type: string;
   header: string;
   details: string;
   value: string;
   label: string;
}

const OutdoorStatsCard = ({}: { statData: StatData }) => {
   const statData = {
      type: "temperature",
      header: "Temperature",
      details: "A bit hot but doable in parks with shades",
      value: "bad",
      label: "Too Hot",
   };

   return (
      <div className="flex w-1/2 h-[100px] bg-amber-100 rounded-[12px] p-2 justify-between">
         <div className="flex flex-col justify-between w-1/2">
            <StatIcon statType={statData.type} />
            <p className="font-headline font-bold text-[24px]">
               {statData.label}
            </p>
         </div>
         <div className="flex flex-col gap-[2px] w-1/3 items-end">
            <p className="font-semibold text-[14px]">{statData.header}</p>
            <p className="text-[11px] text-right leading-tight">
               {statData.details}
            </p>
         </div>
      </div>
   );
};

const StatIcon = ({ statType }: { statType: string }) => {
   return <TemperatureHigh className="stroke-[2px]" />;
};

export default OutdoorStatsCard;
