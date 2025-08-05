import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { DayBar } from "@/dashboard/schedules/components/DayBar";
import SchedulePageNavBar from "@/dashboard/schedules/components/SchedulePageNavBar";
import { redirect } from "next/navigation";
import { ScrollArea } from "@/components/primitives/ScrollArea";
import { cn } from "@/lib/utils";

const SchedulePage = async ({ searchParams }: any) => {
   const session = await auth();
   if (!session?.user) {
      return;
   }

   // paginae based on searchParam
   const page = parseInt(searchParams.page || "1");
   if (isNaN(page) || page < 1) redirect("?page=1");

   const take = 7;
   const skip = (page - 1) * take;

   const [schedules, totalCount] = await Promise.all([
      prisma.scheduleItem.findMany({
         where: { userId: session?.user.id },
         include: { route: true, user: true },
         orderBy: { dayOfWeek: "asc" },
         take,
         skip,
      }),
      prisma.scheduleItem.count({ where: { userId: session?.user.id } }),
   ]);

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

   const days = schedules.map((day) => (
      <DayBar schedulesData={day as any} key={day.id} routes={routeOptions} />
   ));

   return (
      <div className="grow overflow-hidden">
         <ScrollArea className="h-full">
            <div
               className={cn(
                  "flex flex-col justify-between gap-[6px]",
                  "pt-2 px-2 pb-[200px]",
                  "lg:pt-0 lg:px-[12px]"
               )}
            >
               <SchedulePageNavBar
                  totalCount={totalCount}
                  userId={session.user!.id!}
               />
               {days}
            </div>
         </ScrollArea>
      </div>
   );
};

export default SchedulePage;
