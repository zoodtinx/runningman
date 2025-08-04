"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
   Calendar,
   CloudSunny,
   ControlSlider,
   Map,
   Menu,
   Running,
} from "iconoir-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/primitives/DropdownMenu";

export default function MobileNav() {
   const pathname = usePathname();
   const router = useRouter();
   const current = pathname?.split("/").pop() || "";

   const nav = [
      { href: "/dashboard/runs", label: "RUNS", key: "runs", Icon: Running },
      {
         href: "/dashboard/routes",
         label: "ROUTES",
         key: "routes",
         Icon: Map,
      },
      {
         href: "/dashboard/schedules",
         label: "SCHEDULES",
         key: "schedules",
         Icon: Calendar,
      },
      {
         href: "/dashboard/settings",
         label: "SETTINGS",
         key: "settings",
         Icon: ControlSlider,
      },
   ];

   return (
      <div
         className="absolute bottom-5 w-full flex justify-center z-50 lg:hidden"
         onClick={(e) => {
            e.stopPropagation();
         }}
      >
         <DropdownMenu>
            <DropdownMenuTrigger>
               <div className="aspect-square bg-white rounded-full p-2 shadow-md">
                  <Menu className="mx-auto size-5 md:size-7 stroke-[2.5px]" />
               </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border-transparent rounded-xl">
               <DropdownMenuItem>
                  <ViewConditionButton />
               </DropdownMenuItem>
               {nav.map(({ href, label, key, Icon }) => (
                  <DropdownMenuItem key={key}>
                     <button
                        className={cn(
                           "flex gap-1 font-medium"
                           // current === key ? "font-bold" : "font-medium"
                        )}
                        onClick={(e) => {
                           router.replace(href);
                        }}
                     >
                        <Icon />
                        {label}
                     </button>
                  </DropdownMenuItem>
               ))}
            </DropdownMenuContent>
         </DropdownMenu>
      </div>
   );
}

const ViewConditionButton = () => {
   const router = useRouter();
   const searchParams = new URLSearchParams(window.location.search);
   searchParams.set("condition", "open");

   const handleClick = (e: React.MouseEvent) => {
      router.push(`?${searchParams.toString()}`);
   };

   return (
      <button onClick={handleClick} className="font-medium flex gap-1">
         <CloudSunny />
         VIBE CHECK
      </button>
   );
};
