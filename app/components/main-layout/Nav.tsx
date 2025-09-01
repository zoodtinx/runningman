"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import NiceSettings from "@/components/icons/Settings";

export default function Nav() {
   const pathname = usePathname();
   const currentPage = pathname?.split("/").pop() || "";

   return (
      <nav className="flex w-full items-center pr-5 pl-4 h-20 font-headline text-xl text-primary justify-between shrink-0">
         <ul className="flex gap-3">
            <Link
               href="/dashboard/runs"
               className={cn(
                  "shrink-0 active:bg-secondary p-1 px-3 rounded-md font-bold",
                  currentPage === "runs" && "bg-background"
               )}
            >
               RUN
            </Link>
            <Link
               href="/dashboard/routes"
               className={cn(
                  "shrink-0 active:bg-secondary p-1 px-3 rounded-md font-bold",
                  currentPage === "routes" && "bg-background"
               )}
            >
               ROUTES
            </Link>
            <Link
               href="/dashboard/schedules"
               className={cn(
                  "shrink-0 active:bg-secondary p-1 px-3 rounded-md font-bold",
                  currentPage === "schedules" && "bg-background"
               )}
            >
               SCHEDULE
            </Link>
         </ul>
         <Link href="/dashboard/settings" className="">
            <div
               className={cn(
                  "shrink-0 active:bg-secondary px-2 py-1 rounded-md font-bold",
                  currentPage === "settings" && "bg-background"
               )}
            >
               <NiceSettings className="size-8 stroke-[2.3px]" />
            </div>
         </Link>
      </nav>
   );
}
