import { SessionProvider } from "next-auth/react";
import { ScrollArea } from "@/components/primitives/ScrollArea";
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
   const routesData = await prisma.route.findMany({
      where: {
         // userId: "mock-user",
         userId: session?.user.id,
      },
      orderBy: [{ createdAt: "desc" }],
   });
   const routeBars = routesData.map((route) => (
      <Link href={`/dashboard/routes/${route.id}`} key={route.id}>
         <RouteBar routeData={route} key={route.id} />
      </Link>
   ));

   return (
      <div className="grow overflow-hidden">
         <ScrollArea className="h-full">
            <div className="px-[12px] flex flex-col gap-[6px] justify-between pb-[500px]">
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
