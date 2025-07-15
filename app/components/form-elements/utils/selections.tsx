export const moodOptions = [
   {
      value: "low-energy",
      label: (
         <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span>Low Energy</span>
         </div>
      ),
   },
   {
      value: "standard",
      label: (
         <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-gray-500" />
            <span>Neutral</span>
         </div>
      ),
   },
   {
      value: "flowing",
      label: (
         <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span>Flowing</span>
         </div>
      ),
   },
   {
      value: "electrifying",
      label: (
         <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span>Electrifying</span>
         </div>
      ),
   },
   {
      value: "transcendent",
      label: (
         <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-purple-600" />
            <span>Transcendent</span>
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
