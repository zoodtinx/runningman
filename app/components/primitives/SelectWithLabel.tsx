import TriangleDown from "@/components/icons/TriangleDown";
import { cn } from "@/lib/utils";
import {
   Select,
   SelectTrigger,
   SelectValue,
   SelectContent,
   SelectItem,
} from "./Select";

interface SelectWithLabelProps {
   className?: string;
   label?: string;
   variant?: "base" | "md";
   options: { value: string; label: React.ReactNode }[];
}

export const SelectWithLabel: React.FC<SelectWithLabelProps> = ({
   className,
   label,
   variant,
   options,
   ...props
}) => {
   return (
      <div className="w-fit group min-w-[100px]">
         {label && <p className="text-sm opacity-30">{label}</p>}
         <div className="flex w-full items-end">
            <Select {...props}>
               <SelectTrigger
                  className={cn(
                     "focus:outline-none text-base font-medium grow p-0 h-auto flex items-center justify-between",
                     variant === "md" && "text-md",
                     className
                  )}
               >
                  <SelectValue placeholder="Select" />
               </SelectTrigger>
               <SelectContent>
                  {options.map((opt) => (
                     <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                     </SelectItem>
                  ))}
               </SelectContent>
            </Select>
         </div>
         <div className="border-b opacity-30 pt-[1px]" />
      </div>
   );
};
