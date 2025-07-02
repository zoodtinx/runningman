import React from "react";
import RunPageContent from "@/dashboard/runs/[id]/content";
import { SessionProvider } from "next-auth/react";
import { prisma } from "@/lib/prisma";

interface PageProps {
   params: Promise<{ [key: string]: string }>;
   searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const RunPageLayout = async ({ params }: PageProps) => {
   const { id } = await params;

   const runData = await prisma.run.findUnique({
      where: {
         id,
      },
   });

   if (!runData) {
      return "Boo!";
   }

   return (
      <div className="grow overflow-hidden px-[12px] pb-[12px] ">
         <div className="rounded-base h-full w-full bg-background p-[20px]">
            <SessionProvider>
               <RunPageContent runData={runData} />
            </SessionProvider>
         </div>
      </div>
   );
};

export default RunPageLayout;
