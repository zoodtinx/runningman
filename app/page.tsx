import SunriseSprint from "@/dashboard/runs/[id]/export/export-cards/SunriseSprint";
import React from "react";

const page = () => {
   return (
      <div className="w-screen h-screen flex items-center justify-center">
         <div className="w-[1080px] h-[1080px] bg-white">
            <SunriseSprint />
         </div>
      </div>
   );
};

export default page;
