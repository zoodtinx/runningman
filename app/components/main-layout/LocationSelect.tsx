"use client";

import {
   Select,
   SelectTrigger,
   SelectContent,
   SelectItem,
   SelectValue,
} from "@/components/primitives/Select";
import { cn } from "@/lib/utils";
import { changeLocation } from "@/dashboard/actions";
import { useState } from "react";
import Loader from "@/components/icons/Loader";
import { UserWithSchedules } from "@/lib/zod/user.zod.schema";

export const LocationSelect = ({ user }: { user: UserWithSchedules }) => {
   const [isLoading, setIsLoading] = useState(false);

   const handleSelect = async (value: string) => {
      setIsLoading(true);
      await changeLocation(user.id, value);
      setIsLoading(false);
   };

   return (
      <div className="flex gap-1 items-center">
         {isLoading && <Loader className="animate-spin size-4" />}
         <div className="flex gap-2 items-baseline">
            <span className="text-sm pt-1 md:block sm:hidden">Location</span>
            <div className="w-[110px]">
               <Select value={user.location || ""} onValueChange={handleSelect}>
                  <SelectTrigger
                     className={cn(
                        "focus:outline-none text-base font-bold grow p-0 h-auto flex items-center justify-between w-full"
                     )}
                  >
                     <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                     {locationSelect.map((location) => (
                        <SelectItem key={location.value} value={location.value}>
                           {location.label}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
            </div>
         </div>
      </div>
   );
};

const locationSelect = [
   { label: "Bangkok", value: "bangkok" },
   { label: "Chiang Mai", value: "chiangmai" },
   { label: "Phuket", value: "phuket" },
   { label: "Khon Kaen", value: "khonkaen" },
   { label: "Hat Yai", value: "hatyai" },
];
