import RunningManLogo from "@/dashboard/icons/RunningManLogo";
import { cn } from "@/lib/utils";
import React from "react";

const layout = ({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) => {
   const currentPage: string = "runs";

   return (
      <div className="w-screen h-screen bg-background flex justify-center">
         <main className="w-[1440px] h-full flex items-center gap-4 p-4">
            <section className="w-1/2 h-full flex flex-col gap-2">
               <div className="flex-1 w-full">
                  <div className="p-2">
                     <RunningManLogo className="text-primary" />
                  </div>
               </div>
               <div className="flex-1 w-full bg-foreground rounded-2xl" />
            </section>
            <section className="flex flex-col w-1/2 h-full bg-foreground rounded-2xl">
               <nav className="flex items-center pl-7 pr-5 h-24 font-headline text-xl text-primary justify-between">
                  <ul className="flex gap-6">
                     <a
                        href="#"
                        className={cn(currentPage === "runs" && "font-bold")}
                     >
                        RUN
                     </a>
                     <a
                        href="#"
                        className={cn(currentPage === "routes" && "font-bold")}
                     >
                        ROUTES
                     </a>
                     <a
                        href="#"
                        className={cn(
                           currentPage === "schedule" && "font-bold"
                        )}
                     >
                        SCHEDULE
                     </a>
                  </ul>
                  <div className="w-[60px] h-[60px] bg-primary rounded-full"></div>
               </nav>
               {children}
            </section>
         </main>
      </div>
   );
};

export default layout;
