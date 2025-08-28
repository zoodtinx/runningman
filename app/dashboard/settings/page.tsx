import { auth } from "@/auth";
import SettingsPageContent from "@/dashboard/settings/content";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { User } from "@/lib/zod/user.zod.schema";
import { SessionProvider } from "next-auth/react";

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
         <SessionProvider>
            <SettingsPageContent userData={user as unknown as User} />
         </SessionProvider>
      </div>
   );
};

export default SettingsPage;
