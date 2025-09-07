"use client";

import RunningManLogo from "@/components/icons/RunningManLogo";
import { LogOut } from "iconoir-react";
import Loader from "@/components/icons/Loader";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/primitives/Popover";
import { signOut } from "next-auth/react";
import React, { useState } from "react";

export const LogoPopover = () => {
   const [loading, setLoading] = useState(false);

   const handleSignOut = async () => {
      setLoading(true);
      try {
         await signOut();
      } catch (e) {
         setLoading(false);
      }
   };

   return (
      <Popover>
         <PopoverTrigger asChild>
            <span>
               <RunningManLogo
                  className={
                     "cursor-pointer h-auto w-[150px] " + "md:w-[170px] "
                  }
               />
            </span>
         </PopoverTrigger>
         <PopoverContent
            align="start"
            className="p-1 pr-2 w-fit bg-background border-none text-white"
         >
            <button
               className="flex gap-1 items-center font-medium focus:outline-none"
               onClick={handleSignOut}
               disabled={loading}
               type="button"
            >
               {loading ? (
                  <Loader className="size-5 w-6 animate-spin" />
               ) : (
                  <LogOut className="size-5 w-6" />
               )}
               <p>Leave Demo</p>
            </button>
         </PopoverContent>
      </Popover>
   );
};
