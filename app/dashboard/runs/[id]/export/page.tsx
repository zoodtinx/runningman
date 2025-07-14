import { PageProps } from "@/types/page.types";
import ExportPageContent from "@/dashboard/runs/[id]/export/content";
import { SessionProvider } from "next-auth/react";
import { prisma } from "@/lib/prisma";

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
         <div className="rounded-base h-full w-full bg-background p-[20px]">
            <SessionProvider>
               <ExportPageContent runData={runData} />
               {/* <SampleExportCard /> */}
            </SessionProvider>
         </div>
      </div>
   );
};

export default ExportPage;
