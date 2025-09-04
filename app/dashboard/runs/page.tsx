import Link from "next/link";
import { SessionProvider } from "next-auth/react";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import { ScrollArea } from "@/components/primitives/ScrollArea";
import NewRunBar from "@/components/run-page/NewRunBar";
import RunBar from "@/components/run-page/RunBar";
import { cn } from "@/lib/utils";

const RunsPage = async () => {
   const session = await auth();
   if (!session?.user) {
      return;
   }
   const runsData = await prisma.run.findMany({
      where: {
         userId: session.user.id,
      },
      orderBy: [{ dateTime: "desc" }],
   });
   const runBars = runsData.map((run) => (
      <Link href={`/dashboard/runs/${run.id}`} key={run.id}>
         <RunBar runData={run} key={run.id} />
      </Link>
   ));

   const routesData = await prisma.route.findMany({
      where: {
         userId: session?.user.id,
      },
      orderBy: [{ createdAt: "desc" }],
   });

   const routeOptions = routesData.map((route) => ({
      value: route.id,
      label: route.title,
   }));

   return (
      <div className="grow overflow-hidden">
         <ScrollArea className="h-full">
            <div
               className={cn(
                  "px-2 pt-2 lg:pt-0 flex flex-col gap-[6px] justify-between pb-[200px]",
                  "lg:pt-0 lg:px-[12px]"
               )}
            >
               <SessionProvider>
                  <NewRunBar routeOptions={routeOptions} />
               </SessionProvider>
               {runBars}
            </div>
         </ScrollArea>
         <div className="absolute pointer-events-none bottom-0 w-full h-1/3 bg-[linear-gradient(to_bottom,_transparent_0%,_#2d2d2d_90%,_#2d2d2d_100%)]" />
      </div>
   );
};

export default RunsPage;
