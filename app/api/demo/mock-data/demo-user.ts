import { conditionPreference } from "@/lib/constants/default-values";

export const demoUser = {
   email: `user-${crypto.randomUUID()}@runningman.com`,
   name: "Tinnakorn Cortez",
   age: 32,
   height: 172.3,
   gender: "male",
   weight: 70.8,
   location: "bangkok",
   notificationEnabled: false,
   conditionPriority: conditionPreference,
};
