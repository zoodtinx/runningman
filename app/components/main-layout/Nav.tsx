"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import UserSettings from "@/components/icons/UserCard";

export default function Nav() {
   const pathname = usePathname();
   const currentPage = pathname?.split("/").pop() || "";

   return (
      <nav className="flex items-center pl-7 pr-5 h-24 font-headline text-xl text-primary justify-between shrink-0">
         <ul className="flex gap-6">
            <Link
               href="/dashboard/runs"
               className={cn("shrink-0", currentPage === "runs" && "font-bold")}
            >
               RUN
            </Link>
            <Link
               href="/dashboard/routes"
               className={cn(
                  "shrink-0",
                  currentPage === "routes" && "font-bold"
               )}
            >
               ROUTES
            </Link>
            <Link
               href="/dashboard/schedules"
               className={cn(
                  "shrink-0",
                  currentPage === "schedules" && "font-bold"
               )}
            >
               SCHEDULE
            </Link>
         </ul>
         <Link href="/dashboard/settings" className="">
            <UserSettings className="size-13 stroke-[1.4]" />
         </Link>
      </nav>
   );
}
