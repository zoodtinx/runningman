import { cn } from "@/lib/utils";
import React from "react";

interface InputWithLabelProps {
   label?: string;
   unit?: string;
   variant?: "base" | "md";
}

export const Input: React.FC<
   React.InputHTMLAttributes<HTMLInputElement> & InputWithLabelProps
> = ({ className, label, unit, variant, ...props }) => {
   return (
      <div className="w-fit group min-w-[100px]">
         {label && <p className="text-sm opacity-30 ">{label}</p>}
         <div className="flex w-full items-end">
            <input
               {...props}
               className={cn(
                  "focus:outline-none text-base font-medium inline-block grow",
                  variant === "md" && "text-md",
                  className
               )}
            />
            {unit && (
               <p className="text-sm opacity-30 pb-[1px] font-semibold">
                  {unit}
               </p>
            )}
         </div>
         <div className="border-b opacity-30 pt-[1px] group-focus-within:opacity-100" />
      </div>
   );
};
