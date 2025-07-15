import { Controller, Control, Path, FieldValues } from "react-hook-form";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "iconoir-react";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/primitives/Popover";
import { Calendar } from "@/components/primitives/Calendar";
import { cn } from "@/lib/utils";

type ControlledDatePickerProps<T extends FieldValues> = {
   fieldName: Path<T>;
   control: Control<T>;
   required?: boolean | string;
   errorMessage?: string;
};

export function ControlledDatePicker<T extends FieldValues>({
   fieldName,
   control,
   required,
   errorMessage,
}: ControlledDatePickerProps<T>) {
   return (
      <Controller
         name={fieldName}
         control={control}
         rules={required ? { required } : undefined}
         render={({ field, fieldState }) => (
            <div className="flex items-center w-fit cursor-pointer">
               <Popover>
                  <PopoverTrigger asChild>
                     <div
                        data-empty={!field.value}
                        className={cn(
                           "data-[empty=true]:text-background w-fit justify-start text-left font-normal",
                           "text-background flex gap-1 items-center justify-end font-medium"
                        )}
                     >
                        <CalendarIcon />
                        {field.value ? (
                           format(field.value as Date, "MMM d").toUpperCase()
                        ) : (
                           <span>Pick a date</span>
                        )}
                     </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 pb-2 bg-background rounded-2xl border-0">
                     <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                           const isoDate = date ? date.toISOString() : "";
                           field.onChange(isoDate);
                        }}
                     />
                  </PopoverContent>
               </Popover>
               {fieldState.error && (
                  <p className="text-xs text-red-500 mt-1 font-medium">
                     {errorMessage ||
                        fieldState.error?.message ||
                        "This field is required"}
                  </p>
               )}
            </div>
         )}
      />
   );
}
