export interface Run {
   id: string;
   title: string;
   distance: number;
   time: number;
   laps?: number;
   location?: string;
   runType?: string;
   mood?: string;
   gear?: string;
   note?: string;
   route?: Route;
}

export interface OutdoorStat {
   id: string;
   type: string;
   title: string;
   value: number;
   detail?: string;
}

export interface Route {
   title: string;
   distance?: number;
   time?: number;
   laps?: number;
   location?: string;
   note?: string;
}

export interface UserSettings {
   preferredUnits: "km" | "mi";
   defaultRouteId?: string;
   notificationEnabled: boolean;
}

export interface ScheduleItem {
   id: string;
   dayOfWeek: number;
   distance?: number;
   time?: number;
   route?: Route;
   runType?: string;
}
