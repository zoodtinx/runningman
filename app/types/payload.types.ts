import { OutdoorStat } from "@prisma/client";

export interface MainPageData {
   userData: {
      email: string;
      name: string;
      theme: string;
      preferredUnits: string;
      notificationEnabled: boolean;
   };
   headline: string;
   subHead: string;
   stats: {
      ok: string[];
      notOk: string[];
      statsList: OutdoorStat[];
   };
}
