import { CheckCircle } from "iconoir-react";

export const moodOptions = [
   {
      value: "terrible",
      label: (
         <div className="flex items-center gap-1">
            <CheckCircle className="text-red-500" />
            <span>Terrible</span>
         </div>
      ),
   },
   {
      value: "low",
      label: (
         <div className="flex items-center gap-1">
            <CheckCircle className="text-orange-500" />
            <span>Low</span>
         </div>
      ),
   },
   {
      value: "tired",
      label: (
         <div className="flex items-center gap-1">
            <CheckCircle className="text-yellow-500" />
            <span>Tired</span>
         </div>
      ),
   },
   {
      value: "okay",
      label: (
         <div className="flex items-center gap-1">
            <CheckCircle className="text-gray-500" />
            <span>Okay</span>
         </div>
      ),
   },
   {
      value: "good",
      label: (
         <div className="flex items-center gap-1">
            <CheckCircle className="text-green-500" />
            <span>Good</span>
         </div>
      ),
   },
   {
      value: "great",
      label: (
         <div className="flex items-center gap-1">
            <CheckCircle className="text-emerald-600" />
            <span>Great</span>
         </div>
      ),
   },
   {
      value: "energetic",
      label: (
         <div className="flex items-center gap-1">
            <CheckCircle className="text-blue-500" />
            <span>Energetic</span>
         </div>
      ),
   },
];

export const runTypeOptions = [
   { value: "easy", label: "Easy" },
   { value: "recovery", label: "Recovery" },
   { value: "tempo", label: "Tempo" },
   { value: "interval", label: "Interval" },
   { value: "fartlek", label: "Fartlek" },
   { value: "long-run", label: "Long Run" },
   { value: "hill-training", label: "Hill Training" },
   { value: "speed-work", label: "Speed Work" },
   { value: "progression", label: "Progression" },
   { value: "race", label: "Race" },
   { value: "daily-miles", label: "Daily Miles" },
];
