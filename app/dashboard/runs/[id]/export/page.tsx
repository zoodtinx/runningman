import { PageProps } from "@/types/page.types";
import ExportPageContent from "@/dashboard/runs/[id]/export/content";
import { SessionProvider } from "next-auth/react";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import {
   exportRunCard,
   exportRunCards,
} from "@/dashboard/runs/[id]/export/utils";

const ExportPage = async ({ params }: PageProps) => {
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
         <div
            className={cn(
               "rounded-base h-full w-full",
               "bg-transparent p-1 pt-4",
               "md:bg-background md:p-[20px] md:pt-0"
            )}
         >
            <SessionProvider>
               <ExportPageContent runData={runData} />
               {/* <SampleExportCard /> */}
            </SessionProvider>
         </div>
      </div>
   );
};

export default ExportPage;
