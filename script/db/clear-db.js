import "dotenv/config";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function main() {
   // Delete all records from all tables, respecting relations
   await prisma.scheduleItem.deleteMany({});
   await prisma.outdoorStat.deleteMany({});
   await prisma.run.deleteMany({});
   await prisma.route.deleteMany({});
   await prisma.overallCondition.deleteMany({});
   await prisma.runCondition.deleteMany({});
   await prisma.user.deleteMany({});
   console.log("Cleared all data from the database");
}

main()
   .catch((e) => {
      console.error(e);
      process.exit(1);
   })
   .finally(async () => {
      await prisma.$disconnect();
   });
