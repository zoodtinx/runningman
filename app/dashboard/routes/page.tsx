import { SessionProvider } from "next-auth/react";
import { ScrollArea } from "@/components/primitives/ScrollArea";
import NewRunBar from "@/components/run-page/NewRunBar";
import RunBar from "@/components/run-page/RunBar";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import Link from "next/link";
import RouteBar from "@/dashboard/routes/components/RouteBar";
import NewRouteBar from "@/dashboard/routes/components/NewRouteBar";

const RoutesPage = async () => {
   const session = await auth();
   if (!session?.user) {
      return;
   }
   const runsData = await prisma.route.findMany({
      where: {
         // userId: "mock-user",
         userId: session?.user.id,
      },
      orderBy: [{ createdAt: "desc" }],
   });
   const routeBars = runsData.map((run) => (
      <Link href={`/dashboard/runs/${run.id}`} key={run.id}>
         <RouteBar routeData={run} key={run.id} />
      </Link>
   ));

   console.log("runsData", runsData);

   return (
      <div className="grow overflow-hidden">
         <ScrollArea className="h-full">
            <div className="px-[12px] flex flex-col gap-[6px] justify-between">
               <SessionProvider>
                  <NewRouteBar />
               </SessionProvider>
               {routeBars}
            </div>
         </ScrollArea>
         <div className="absolute pointer-events-none bottom-0 w-full h-1/3 bg-[linear-gradient(to_bottom,_transparent_0%,_#2d2d2d_90%,_#2d2d2d_100%)]" />
      </div>
   );
};

export default RoutesPage;
