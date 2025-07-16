"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu } from "iconoir-react";
import { useState, useRef, useEffect } from "react";

export default function MobileNav() {
   const pathname = usePathname();
   const current = pathname?.split("/").pop() || "";
   const [open, setOpen] = useState(false);
   const navRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (!open) return;
      function handleClickOutside(event: MouseEvent) {
         if (navRef.current && !navRef.current.contains(event.target as Node)) {
            setOpen(false);
         }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, [open]);

   const nav = [
      { href: "/dashboard/runs", label: "RUNS", key: "runs" },
      { href: "/dashboard/routes", label: "ROUTES", key: "routes" },
      { href: "/dashboard/schedules", label: "SCHEDULES", key: "schedules" },
      { href: "/dashboard/settings", label: "SETTINGS", key: "settings" },
   ];

   return (
      <div
         className="absolute bottom-5 w-full flex justify-center z-20 md:hidden"
         onClick={(e) => {
            e.stopPropagation();
         }}
      >
         <div
            ref={navRef}
            onClick={() => setOpen(!open)}
            className={cn(
               "flex items-center bg-primary rounded-full h-[50px] transition-all duration-200 overflow-hidden shadow-md",
               open ? "w-[340px] h-[37px]" : "w-[50px]"
            )}
         >
            {!open && <Menu className="mx-auto size-7 stroke-[2.5px]" />}
            {open && (
               <ul className="flex w-full justify-between font-semibold text-sm px-4">
                  {nav.map(({ href, label, key }) => (
                     <Link
                        key={key}
                        href={href}
                        onClick={(e) => {
                           e.stopPropagation();
                           setOpen(false);
                        }}
                        className={cn(
                           current === key ? "font-bold" : "font-medium"
                        )}
                     >
                        {label}
                     </Link>
                  ))}
               </ul>
            )}
         </div>
      </div>
   );
}
