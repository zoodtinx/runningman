import { getDemoRoutes } from "@/api/demo/mock-data/demo-routes";
import { getDemoRuns } from "@/api/demo/mock-data/demo-runs";
import { getDemoUser } from "@/api/demo/mock-data/demo-user";
import { prisma } from "@/lib/prisma";

export function createDemoSession() {
   return prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
         data: getDemoUser(),
      });

      const demoRuns = getDemoRuns(user.id);

      const runs = await tx.run.createMany({
         data: demoRuns,
      });

      const demoRoutes = getDemoRoutes(user.id);

      const routes = await tx.route.createMany({
         data: demoRoutes,
      });

      const allRoutes = await tx.route.findMany({
         where: { userId: user.id },
      });

      const baseSchedule = Array.from({ length: 7 }).map((_, i) => ({
         userId: user.id,
         dayOfWeek: i,
         routeId: null as string | null,
      }));

      baseSchedule.forEach((day, i) => {
         if (i % 2 === 0 && allRoutes.length > 0) {
            const randomIndex = Math.floor(Math.random() * allRoutes.length);
            day.routeId = allRoutes[randomIndex].id;
         }
      });

      const schedule = await tx.scheduleItem.createMany({
         data: baseSchedule,
      });

      return { user, runs, routes, schedule };
   });
}
