import { auth } from "@/auth";
import SettingsPageContent from "@/dashboard/settings/content";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";
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
      <div
         className={cn(
            "grow overflow-hidden",
            "px-2 pt-2",
            "lg:p-[20px] lg:pt-0"
         )}
      >
         <SettingsPageContent userData={user as unknown as User} />
      </div>
   );
};

export default SettingsPage;
