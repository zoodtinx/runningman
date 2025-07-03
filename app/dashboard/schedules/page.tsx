import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { DayBar } from "@/dashboard/schedules/components/DayBar";
import { Plus } from "iconoir-react";
import { addWeek } from "@/dashboard/schedules/actions";

const SchedulePage = async () => {
   const session = await auth();
   if (!session?.user) {
      return;
   }
   const schedules = await prisma.scheduleItem.findMany({
      where: {
         userId: "mock-user",
         // userId: session.user.id,
      },
      include: {
         route: true,
         user: true,
      },
      orderBy: {
         dayOfWeek: "asc",
      },
   });

   const routesData = await prisma.route.findMany({
      where: {
         userId: "mock-user",
         // userId: session?.user.id,
      },
      orderBy: [{ createdAt: "desc" }],
   });

   const routeOptions = routesData.map((route) => ({
      value: route.id,
      label: route.title,
   }));

   const days = schedules.map((day) => (
      <DayBar schedulesData={day} key={day.id} routes={routeOptions} />
   ));

   return (
      <div className="grow overflow-hidden">
         <div className="px-[12px] flex flex-col gap-[6px] justify-between">
            <div className="flex items-center w-full h-[30px] bg-primary rounded-full font-headline font-bold px-4 cursor-pointer gap-2">
               <Plus className="text-background opacity-35 hover:opacity-100 transition-opacity" />
            </div>
            {days}
         </div>
      </div>
   );
};

export default SchedulePage;
