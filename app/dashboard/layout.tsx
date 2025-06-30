import RunningManLogo from "@/components/icons/RunningManLogo";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const layout = ({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) => {
   const currentPage: string = "runs";

   return (
      <div className="w-screen h-screen bg-theme-speed flex justify-center">
         <main className="w-[1440px] h-full flex items-center gap-4 p-4">
            <section className="w-1/2 h-full flex flex-col gap-2">
               <div className="flex-1 w-full">
                  <div className="p-2">
                     <RunningManLogo className="text-background" />
                  </div>
               </div>
               <div className="flex-1 w-full bg-foreground rounded-[23px]" />
            </section>
            <section className="flex flex-col w-1/2 h-full bg-foreground rounded-[23px] text-primary">
               <nav className="flex items-center pl-7 pr-5 h-24 font-headline text-xl text-primary justify-between">
                  <ul className="flex gap-6">
                     <Link
                        href="/dashboard/runs"
                        className={cn(currentPage === "runs" && "font-bold")}
                     >
                        RUN
                     </Link>
                     <Link
                        href="/dashboard/routes"
                        className={cn(currentPage === "routes" && "font-bold")}
                     >
                        ROUTES
                     </Link>
                     <Link
                        href="/dashboard/schedules"
                        className={cn(
                           currentPage === "schedule" && "font-bold"
                        )}
                     >
                        SCHEDULE
                     </Link>
                  </ul>
                  <Link
                     href="/dashboard/settings"
                     className="w-[60px] h-[60px] bg-primary rounded-full"
                  ></Link>
               </nav>
               {children}
            </section>
         </main>
      </div>
   );
};

export default layout;
