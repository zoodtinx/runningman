import RunningManLogo from "@/components/icons/RunningManLogo";
import { cn } from "@/lib/utils";
import React from "react";

interface ExportCardProps {
   runData: {
      distance: number;
      duration: number;
   };
}

const MorningRun = ({ runData }: ExportCardProps) => {
   const { distance, duration } = runData;
   const pace = (duration / distance).toFixed(2);
   const fixedDuration = duration.toFixed(2);

   const data = [
      { label: "DISTANCE", value: distance, unit: "KM" },
      { label: "PACE", value: pace, unit: "KM" },
      { label: "DURATION", value: fixedDuration, unit: "" },
   ];

   return (
      <div className="flex flex-col gap-[55px] items-end w-fit h-fit text-[#ed1c24]">
         {data.map(({ label, value, unit }, i) => (
            <div
               key={label}
               className={`flex flex-col items-end w-fit h-fit leading-[80px] ${
                  i === 2 ? "pb-9" : ""
               }`}
            >
               <p className="font-headline font-semibold text-[39px]">
                  {label}
               </p>
               <p className="font-semibold text-[110px]">{value}</p>
               {unit && <p className="font-headline text-[39px]">{unit}</p>}
            </div>
         ))}
         <RunningManLogo className="w-[357px] h-auto" />
      </div>
   );
};

const Dopaminization = ({ runData }: ExportCardProps) => {
   const { distance, duration } = runData;
   const pace = (duration / distance).toFixed(2);
   const fixedDuration = duration.toFixed(2);

   const data = [
      { label: "Distance", value: distance, unit: "KM" },
      { label: "Pace", value: pace, unit: "KM" },
      { label: "Duration", value: fixedDuration, unit: "KM" }, // Adjust if you want "MIN"
   ];

   return (
      <div className="flex flex-col gap-[30px] items-center h-fit text-white w-fit">
         <div className="flex gap-5 items-center w-[1000px]">
            {data.map((item, i) => (
               <React.Fragment key={item.label}>
                  <div className="flex flex-col items-center w-fit h-fit leading-[56px] flex-1">
                     <p className="font-semibold text-[24px]">{item.label}</p>
                     <p className="font-semibold font-headline text-[70px]">
                        {item.value}
                     </p>
                     <p className="text-[24px]">{item.unit}</p>
                  </div>
                  {i !== data.length - 1 && (
                     <div className="w-px h-40 bg-white transform rotate-45"></div>
                  )}
               </React.Fragment>
            ))}
         </div>
         <RunningManLogo className="w-[286px] h-auto" />
      </div>
   );
};

const FlowState = ({ runData }: ExportCardProps) => {
   const { distance, duration } = runData;
   const pace = (duration / distance).toFixed(2);
   const fixedDuration = duration.toFixed(2);

   const data = [
      {
         label: "Distance",
         value: distance,
         unit: "km",
      },
      {
         label: "Pace",
         value: pace,
         unit: "/km",
      },
      {
         label: "Duration",
         value: fixedDuration,
         unit: "min",
      },
   ];

   return (
      <div className="flex flex-col gap-[50px] items-center justify-between text-black w-[520px] h-[880px] bg-white pb-9">
         <div className="w-full p-[47px]">
            {data.map((dataPoint) => {
               return (
                  <div
                     key={dataPoint.label}
                     className="flex flex-col w-full h-fit"
                  >
                     <div className="flex items-center gap-3">
                        <p className="text-[28px]">{dataPoint.label}</p>
                        <span className="border-b opacity-35 w-full pt-2"></span>
                     </div>
                     <div className="flex gap-5 items-baseline leading-[116px]">
                        <p
                           className={cn(
                              "text-[110px] font-light",
                              dataPoint.label === "Distance" && "font-semibold"
                           )}
                        >
                           {dataPoint.value}
                        </p>
                        <p className="text-[50px]">{dataPoint.unit}</p>
                     </div>
                  </div>
               );
            })}
         </div>
         <RunningManLogo className="w-[406px] h-auto shrink-0" />
      </div>
   );
};

const FlyingSprint = ({ runData }: ExportCardProps) => {
   const { distance, duration } = runData;
   const pace = (duration / distance).toFixed(2);
   const fixedDuration = duration.toFixed(2);

   return (
      <div className="w-[1000px] h-fit">
         <div className="flex flex-col justify-center items-center text-black w-full gap-7 relative">
            <div className="w-full flex justify-end pr-[53px]">
               <RunningManLogo className="w-[410px] h-auto shrink-0 text-[#fffed9]" />
            </div>

            <div className="w-[500px] h-[600px] bg-[#fffed9] transform -skew-x-38"></div>

            <div className="pt-[60px] absolute flex flex-col items-end top-[65px] h-[605px] w-[967px] gap-[40px]">
               <div className="flex flex-col items-center h-fit w-[715px]">
                  <div className="flex items-center gap-3">
                     <p className="text-[26px]">Distance</p>
                  </div>
                  <div className="flex gap-5 items-baseline leading-[95px]">
                     <p className="text-[90px] font-semibold font-headline">
                        {distance}
                     </p>
                  </div>
               </div>

               <div className="flex flex-col items-center h-fit w-[715px] mr-[150px]">
                  <div className="flex items-center gap-3">
                     <p className="text-[26px]">Pace</p>
                  </div>
                  <div className="flex gap-5 items-baseline leading-[95px]">
                     <p className="text-[90px] font-semibold font-headline">
                        {pace}
                     </p>
                  </div>
               </div>

               <div className="flex flex-col items-center h-fit w-[715px] mr-[280px]">
                  <div className="flex items-center gap-3">
                     <p className="text-[26px]">Duration</p>
                  </div>
                  <div className="flex gap-5 items-baseline leading-[95px]">
                     <p className="text-[90px] font-semibold font-headline">
                        {fixedDuration}
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

const Zone4 = ({ runData }: ExportCardProps) => {
   const { distance, duration } = runData;
   const pace = (duration / distance).toFixed(2);
   const fixedDuration = duration.toFixed(2);

   const data = [
      {
         label: "Distance",
         value: distance,
         unit: "km",
      },
      {
         label: "Pace",
         value: pace,
         unit: "/km",
      },
      {
         label: "Duration",
         value: fixedDuration,
         unit: "min",
      },
   ];

   return (
      <div className="flex flex-col items-end gap-5">
         <div className="flex bg-[#0000ff] text-white w-[930px] h-[180px] px-[40px] rounded-[30px] items-center">
            {data.map((dataPoint, i) => {
               const isFirstElem = i === 0;
               return (
                  <div
                     key={dataPoint.label}
                     className="flex w-full h-fit flex-1 gap-[43px]"
                  >
                     {!isFirstElem && (
                        <div className="border-r border-white opacity-70" />
                     )}
                     <div className="flex flex-col gap-1">
                        <p className="text-[25px]">{dataPoint.label}</p>
                        <p className="text-[66px] font-semibold font-headline leading-[50px] text-[#fffcbb]">
                           {dataPoint.value}
                        </p>
                        <p className="text-[25px]">{dataPoint.unit}</p>
                     </div>
                  </div>
               );
            })}
         </div>
         <RunningManLogo className="w-[200px] text-white h-auto shrink-0 mr-[35px]" />
      </div>
   );
};

export { MorningRun, Dopaminization, FlowState, FlyingSprint, Zone4 };
