"use client";

import { Plus, Trash } from "iconoir-react";
import { addWeek, removeWeek } from "@/dashboard/schedules/actions";
import { useRouter, useSearchParams } from "next/navigation";

interface SchedulePageNavBarProps {
   userId: string;
   totalCount: number; // total number of schedule items
}

const SchedulePageNavBar = ({
   totalCount,
   userId,
}: SchedulePageNavBarProps) => {
   const router = useRouter();
   const searchParams = useSearchParams();
   const currentPage = parseInt(searchParams.get("page") || "1");

   const weekCount = Math.ceil(totalCount / 7);

   const handlePageClick = (page: number) => {
      router.push(`?page=${page}`);
   };

   const handleAddWeek = async () => {
      await addWeek(userId);
      const newWeekCount = Math.ceil((totalCount + 7) / 7);
      router.push(`?page=${newWeekCount}`);
      router.refresh();
   };

   const handleRemoveWeek = async () => {
      await removeWeek(userId);
      router.push(`?page=1`);
      router.refresh();
   };

   const weekButtons = Array.from({ length: weekCount }).map((_, i) => (
      <div
         className={`cursor-pointer ${
            currentPage === i + 1
               ? "text-background font-bold"
               : "text-tertiary"
         }`}
         key={i}
         onClick={() => handlePageClick(i + 1)}
      >
         {i + 1}
      </div>
   ));

   return (
      <div className="flex justify-between items-center w-full h-[25px] bg-primary rounded-full font-headline font-semibold px-4">
         <div className="flex items-center gap-3 text-[14px]">
            <div className="text-background">WEEK</div>
            {weekButtons}
            <Plus
               onClick={handleAddWeek}
               className="text-background opacity-35 hover:opacity-100 transition-opacity cursor-pointer"
            />
         </div>
         {totalCount !== 7 && (
            <div
               onClick={handleRemoveWeek}
               className="flex gap-1 opacity-35 hover:opacity-100 items-center cursor-pointer"
            >
               <span className="font-sans font-medium text-background text-sm">
                  Remove Week
               </span>
               <Trash className="text-background transition-opacity size-[13px]" />
            </div>
         )}
      </div>
   );
};

export default SchedulePageNavBar;
