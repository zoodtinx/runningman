import { SessionProvider } from "next-auth/react";
import { ScrollArea } from "@/components/primitives/ScrollArea";
import NewRunBar from "@/components/run-page/NewRunBar";
import RunBar from "@/components/run-page/RunBar";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

const RunsPage = async () => {
   const session = await auth();
   const runsData = await prisma.run.findMany({
      where: {
         userId: session.user.id,
      },
      orderBy: {
         dateTime: "desc",
      },
   });

   const runBars = runsData.map((run) => <RunBar runData={run} key={run.id} />);

   return (
      <div className="grow overflow-hidden">
         <ScrollArea className="h-full">
            <div className="px-[12px] flex flex-col gap-[6px] justify-between">
               <SessionProvider>
                  <NewRunBar />
               </SessionProvider>
               {runBars}
            </div>
         </ScrollArea>
         <div className="absolute pointer-events-none bottom-0 w-full h-1/3 bg-[linear-gradient(to_bottom,_transparent_0%,_#2d2d2d_90%,_#2d2d2d_100%)]" />
      </div>
   );
};

export default RunsPage;
