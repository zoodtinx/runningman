import { auth } from "@/auth";
import SettingsPageContent from "@/dashboard/settings/content";
import { prisma } from "@/lib/prisma";
import { User } from "@/lib/zod/user.zod.schema";

const SettingsPage = async () => {
   const session = await auth();
   if (!session?.user) {
      return;
   }

   const user = await prisma.user.findUnique({
      where: { id: session?.user.id },
   });

   return (
      <div className="grow overflow-hidden px-2 pt-2 md:p-[20px] md:pt-0">
         <SettingsPageContent userData={user as unknown as User} />
      </div>
   );
};

export default SettingsPage;
