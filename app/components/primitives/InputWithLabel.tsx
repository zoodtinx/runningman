import { cn } from "@/lib/utils";
import React from "react";

interface InputWithLabelProps {
   label?: string;
   unit?: string;
   variant?: "base" | "md" | "2xl";
}

export const Input: React.FC<
   React.InputHTMLAttributes<HTMLInputElement> & InputWithLabelProps
> = ({ className, label, unit, variant, ...props }) => {
   return (
      <div className="w-fit group">
         {label && <p className="text-sm opacity-30">{label}</p>}
         <div className="flex w-full items-end">
            <input
               {...props}
               className={cn(
                  "focus:outline-none text-base font-medium inline-block grow w-full",
                  variant === "md" && "text-md",
                  variant === "2xl" && "font-headline text-2xl",
                  className
               )}
            />
            {unit && (
               <p
                  className={cn(
                     "text-sm opacity-30 pb-[1px] font-semibold",
                     variant === "2xl" &&
                        "font-normal font-headline text-[27px]"
                  )}
               >
                  {unit}
               </p>
            )}
         </div>
         <div className="border-b opacity-30 pt-[1px] group-focus-within:opacity-100" />
      </div>
   );
};
