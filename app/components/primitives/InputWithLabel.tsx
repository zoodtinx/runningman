import { cn } from "@/lib/utils";
import React from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface InputWithLabelProps {
   label?: string;
   unit?: string;
   inputSize?: "base" | "md" | "2xl";
   variant?: "light" | "dark" | "white";
}

export const InputWithLabel = React.forwardRef<
   HTMLInputElement,
   React.InputHTMLAttributes<HTMLInputElement> & InputWithLabelProps
>(({ className, label, unit, variant, inputSize, ...props }, ref) => {
   return (
      <div className="w-full group">
         {label && <p className={cn("text-sm text-secondary")}>{label}</p>}
         <div className="flex w-full items-end gap-2">
            <input
               {...props}
               ref={ref}
               className={cn(
                  "focus:outline-none text-base font-medium inline-block grow w-full",
                  variant === "light" && "text-primary",
                  variant === "dark" && "text-background",
                  variant === "white" && "text-primary bg-white",
                  inputSize === "md" && "text-md",
                  inputSize === "2xl" &&
                     "font-headline text-2xl leading-0 font-light",
                  className
               )}
            />
            {unit && (
               <p
                  className={cn(
                     "text-sm text-tertiary pb-[1px] font-semibold",
                     inputSize === "2xl" &&
                        "font-normal font-headline text-[27px]"
                  )}
               >
                  {unit}
               </p>
            )}
         </div>
         <div
            className={cn(
               "border-b pt-[1px]",
               variant === "light" &&
                  "border-secondary group-focus-within:border-primary",
               variant === "dark" &&
                  "border-tertiary group-focus-within:border-background",
               variant === "white" &&
                  "border-secondary group-focus-within:border-primary"
            )}
         />
      </div>
   );
});

InputWithLabel.displayName = "InputWithLabel";

type ControlledInputProps<T extends FieldValues> = {
   filedName: Path<T>;
   control: Control<T>;
   required?: boolean | string;
   errorMessage?: string;
} & Omit<
   React.InputHTMLAttributes<HTMLInputElement> & InputWithLabelProps,
   "name"
>;

export function ControlledInput<T extends FieldValues>({
   filedName,
   control,
   required,
   errorMessage,
   ...rest
}: ControlledInputProps<T>) {
   return (
      <Controller
         name={filedName}
         control={control}
         rules={required ? { required } : undefined}
         render={({ field, fieldState }) => (
            <div>
               <InputWithLabel
                  {...field}
                  {...rest}
                  aria-invalid={!!fieldState.error}
               />
               {fieldState.error && (
                  <p className="text-xs text-red-500 mt-1 font-medium">
                     {errorMessage ||
                        fieldState.error.message ||
                        "This field is required"}
                  </p>
               )}
            </div>
         )}
      />
   );
}
