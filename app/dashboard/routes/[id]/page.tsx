import { SessionProvider } from "next-auth/react";
import { prisma } from "@/lib/prisma";
import RoutePageContent from "@/dashboard/routes/[id]/content";
import { cn } from "@/lib/utils";

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
         <div
            className={cn(
               "rounded-base h-full w-full",
               "bg-transparent p-1 pt-4",
               "md:bg-background md:p-[20px] md:pt-3"
            )}
         >
            <SessionProvider>
               <RoutePageContent routeData={routeData} />
            </SessionProvider>
         </div>
      </div>
   );
};

export default RunPageLayout;
