"use client";

import {
   DndContext,
   useDraggable,
   useDroppable,
   DragEndEvent,
   DragOverlay,
} from "@dnd-kit/core";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
   MoreVert,
   TemperatureHigh,
   Droplet,
   Cloud,
   SunLight,
   Tree,
   Wind,
   Rain,
   AirplaneHelix,
   DotsGrid3x3,
   Flower,
   CheckCircle,
} from "iconoir-react";
import { ConditionPriority } from "@/lib/zod/user.zod.schema";

type Item = {
   id: string;
   label: string;
   icon: typeof Droplet;
};

const items: Item[] = [
   { id: "temperature", label: "Temperature", icon: TemperatureHigh },
   { id: "feels-like", label: "Feels Like", icon: TemperatureHigh },
   { id: "heat-index", label: "Heat Index", icon: TemperatureHigh },
   { id: "humidity", label: "Humidity", icon: Droplet },
   { id: "cloudiness", label: "Cloudiness", icon: Cloud },
   { id: "uv-index", label: "UV Index", icon: SunLight },
   { id: "visibility", label: "Visibility", icon: Tree },
   { id: "wind-speed", label: "Wind Speed", icon: Wind },
   { id: "rain-chance", label: "Rain Chance", icon: Rain },
   { id: "aqi", label: "AQI", icon: AirplaneHelix },
];

type ItemKey = keyof ConditionPriority;

const sectionValues: Record<string, number> = {
   low: 1,
   medium: 2,
   high: 3,
};

export interface DragBoardProps {
   itemLocation: ConditionPriority;
   setItemLocation: React.Dispatch<React.SetStateAction<ConditionPriority>>;
}

export default function DragBoard({
   itemLocation,
   setItemLocation,
}: DragBoardProps) {
   const [activeId, setActiveId] = useState<string | null>(null);

   const handleDragEnd = (event: DragEndEvent) => {
      const { over, active } = event;
      if (!over) return;

      const section = over.id as string;
      const value = sectionValues[section] ?? 0;

      setItemLocation((prev) => ({
         ...prev,
         [active.id]: value,
      }));
      setActiveId(null);
   };

   const activeItem = items.find((item) => item.id === activeId);

   return (
      <DndContext
         onDragEnd={handleDragEnd}
         onDragStart={(e) => setActiveId(e.active.id as string)}
      >
         <div
            className={cn(
               "flex flex-col gap-2 w-full border border-secondary py-2 px-3 pb-3 rounded-xl"
            )}
         >
            {[3, 2, 1].map((value) => (
               <Section key={value} id={value}>
                  {items
                     .filter(
                        (item) => itemLocation[item.id as ItemKey] === value
                     )
                     .map((item) => (
                        <Draggable key={item.id} item={item} />
                     ))}
               </Section>
            ))}
         </div>

         <DragOverlay>
            {activeId && activeItem ? (
               <div
                  className={cn(
                     "p-2 pl-1 bg-primary cursor-grabbing rounded-lg text-background flex justify-between items-center gap-2"
                  )}
               >
                  <div className="flex items-center">
                     <MoreVert className="size-5" />
                     <span className="font-medium">{activeItem.label}</span>
                  </div>
                  <activeItem.icon className="size-5" />
               </div>
            ) : null}
         </DragOverlay>
      </DndContext>
   );
}

function Section({ id, children }: { id: number; children: React.ReactNode }) {
   const labels: Record<number, string> = {
      1: "low",
      2: "medium",
      3: "high",
   };
   const label = labels[id] || "unknown";

   const { setNodeRef, isOver } = useDroppable({ id: label });

   return (
      <div className="flex flex-col gap-2">
         <div className="flex justify-between items-center border-b border-b-secondary pb-2">
            <h2 className={cn("font-medium capitalize")}>{label}</h2>
            {isOver && <CheckCircle className="size-5 text-sky-300" />}
         </div>
         <div
            ref={setNodeRef}
            className={cn(
               "flex-1 min-h-[80px] h-fit transition-colors rounded-lg"
            )}
            style={{
               display: "grid",
               gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
               gap: "0.5rem",
               alignItems: "start",
               padding: "0.25rem 0",
            }}
         >
            {children}
         </div>
      </div>
   );
}

function Draggable({ item }: { item: Item }) {
   const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: item.id,
   });

   return (
      <div
         ref={setNodeRef}
         {...attributes}
         {...listeners}
         style={{
            transform: transform
               ? `translate(${transform.x}px, ${transform.y}px)`
               : undefined,
         }}
         className={cn(
            "p-2 pl-1 bg-primary cursor-grab rounded-lg text-background flex justify-between items-center gap-2"
         )}
      >
         <div className="flex items-center">
            <MoreVert className="size-5" />
            <span className="font-medium">{item.label}</span>
         </div>
         <item.icon className="size-5" />
      </div>
   );
}
