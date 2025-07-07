import { auth } from "@/auth";
import SettingsPageContent from "@/dashboard/settings/content";
import { prisma } from "@/lib/prisma";

const SettingsPage = async () => {
   const session = await auth();
   if (!session?.user) {
      return;
   }

   const user = await prisma.user.findUnique({
      where: { id: session?.user.id },
   });

   return (
      <div className="grow overflow-hidden p-[20px] pt-0">
         <SettingsPageContent userData={user} />
      </div>
   );
};

export default SettingsPage;
