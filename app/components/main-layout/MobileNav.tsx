"use client";

import { cn } from "@/lib/utils";
import {
   Calendar,
   CloudSunny,
   ControlSlider,
   Map,
   Menu,
   Running,
} from "iconoir-react";
import { useRouter } from "next/navigation";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/primitives/DropdownMenu";

export default function MobileNav() {
   const router = useRouter();

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
         className="flex justify-center z-50 lg:hidden"
         onClick={(e) => {
            e.stopPropagation();
         }}
      >
         <DropdownMenu>
            <DropdownMenuTrigger>
               <div className="aspect-square rounded-full p-2 shadow-md bg-background">
                  <Menu className="mx-auto size-3 md:size-3 stroke-[2.5px] text-white" />
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
                        onClick={() => {
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

   const handleClick = () => {
      router.push(`?${searchParams.toString()}`);
   };

   return (
      <button onClick={handleClick} className="font-medium flex gap-1">
         <CloudSunny />
         VIBE CHECK
      </button>
   );
};
