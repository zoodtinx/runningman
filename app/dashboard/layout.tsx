// layout.tsx (server)
import RunningManLogo from "@/components/icons/RunningManLogo";
import DayBar from "@/components/main-layout/DayBar";
import OutdoorStatsCard from "@/components/main-layout/OutdoorStatsCard";
import Link from "next/link";
import React from "react";
import Nav from "@/components/main-layout/Nav";

const Layout = ({ children }: { children: React.ReactNode }) => {
   return (
      <div className="w-screen h-screen bg-theme-speed flex justify-center">
         <main className="w-[1440px] h-full flex items-center gap-4 p-4">
            <section className="w-1/2 h-full flex flex-col gap-2">
               <div className="flex-1 w-full">
                  <div className="p-2">
                     <RunningManLogo className="text-background" />
                  </div>
               </div>
               <div className="flex-1 w-full bg-foreground rounded-[23px]">
                  <OutdoorStatsSection />
               </div>
            </section>
            <section className="flex flex-col w-1/2 h-full bg-foreground rounded-[23px] text-primary">
               <Nav />
               {children}
            </section>
         </main>
      </div>
   );
};

const OutdoorStatsSection = () => (
   <div className="flex flex-col gap-3 w-full p-[12px] overflow-hidden">
      <DayBar />
      <div className="flex gap-2 w-full">
         <OutdoorStatsCard />
         <OutdoorStatsCard />
      </div>
   </div>
);

export default Layout;
