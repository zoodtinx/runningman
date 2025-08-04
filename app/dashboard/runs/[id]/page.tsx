import React from "react";
import RunPageContent from "@/dashboard/runs/[id]/content";
import { SessionProvider } from "next-auth/react";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";

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
      <div className="grow overflow-hidden px-[12px] pb-[12px]">
         <div
            className={cn(
               "rounded-base h-full w-full",
               "bg-transparent p-1 pt-4",
               "lg:bg-background lg:p-[20px] lg:pt-3"
            )}
         >
            <SessionProvider>
               <RunPageContent runData={runData} />
            </SessionProvider>
         </div>
      </div>
   );
};

export default RunPageLayout;
