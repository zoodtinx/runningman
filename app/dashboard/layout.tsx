// layout.tsx (server)
import React from "react";
import Nav from "@/components/main-layout/Nav";
import { RunConditionSection } from "@/components/main-layout/RunConditionSection";
import RunSummarySection from "@/components/main-layout/RunSummarySection";

const Layout = ({ children }: { children: React.ReactNode }) => {
   return (
      <div className="w-screen h-screen bg-theme-speed flex justify-center">
         <main className="w-[1440px] h-full flex items-center gap-4 p-4">
            <section className="w-1/2 h-full flex flex-col gap-2">
               <RunSummarySection />
               <div className="h-1/2 w-full bg-foreground rounded-[23px]">
                  <RunConditionSection />
               </div>
            </section>
            <section className="flex flex-col w-1/2 h-full bg-foreground rounded-[23px] text-primary relative overflow-clip">
               <Nav />
               {children}
            </section>
         </main>
      </div>
   );
};

export default Layout;
