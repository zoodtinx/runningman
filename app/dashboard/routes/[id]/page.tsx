import React from "react";
import RunPageContent from "@/dashboard/runs/[id]/content";
import { SessionProvider } from "next-auth/react";
import { prisma } from "@/lib/prisma";
import RoutePageContent from "@/dashboard/routes/[id]/content";

interface PageProps {
   params: Promise<{ [key: string]: string }>;
   searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const RunPageLayout = async ({ params }: PageProps) => {
   const { id } = await params;

   const routeData = await prisma.route.findUnique({
      where: {
         id,
      },
   });

   console.log("id", id);
   console.log("routeData", routeData);

   if (!routeData) {
      return "Boo!";
   }

   return (
      <div className="grow overflow-hidden px-[12px] pb-[12px] ">
         <div className="rounded-base h-full w-full bg-background p-[20px]">
            <SessionProvider>
               <RoutePageContent routeData={routeData} />
            </SessionProvider>
         </div>
      </div>
   );
};

export default RunPageLayout;
