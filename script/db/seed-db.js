import "dotenv/config";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

import { mockUser } from "./mock-data/mock-user.js";
import { mockRuns } from "./mock-data/mock-run.js";
import { mockRoutes } from "./mock-data/mock-route.js";
import { mockOutdoorStats } from "./mock-data/mock-stats.js";
import { mockSchedule } from "./mock-data/mock-schedule.js";

const prisma = new PrismaClient();

async function main() {
   const user = await prisma.user.create({
      data: mockUser,
   });

   await prisma.run.createMany({
      data: mockRuns.map((run) => ({
         ...run,
         userId: user.id,
      })),
   });

   await prisma.route.createMany({
      data: mockRoutes.map((route) => ({
         ...route,
         userId: user.id,
      })),
   });

   await prisma.outdoorStat.createMany({
      data: mockOutdoorStats.map((stat) => ({
         ...stat,
         userId: user.id,
      })),
   });

   await prisma.scheduleItem.createMany({
      data: mockSchedule.map((item) => ({
         ...item,
         userId: user.id,
      })),
   });

   console.log("Seeded user, runs, routes, outdoor stats, and schedule");
}

main()
   .catch((e) => {
      console.error(e);
      process.exit(1);
   })
   .finally(async () => await prisma.$disconnect());
