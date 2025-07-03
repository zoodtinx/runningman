import React from "react";
import { cn } from "@/lib/utils";
import {
   Select,
   SelectTrigger,
   SelectValue,
   SelectContent,
   SelectItem,
} from "./Select";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface SelectWithLabelProps {
   className?: string;
   label?: string;
   variant?: "light" | "dark" | "white";
   inputSize?: "base" | "md" | "2xl";
   options: { value: string; label: React.ReactNode }[];
   value?: string;
   onValueChange?: (value: string) => void;
   placeholder?: string;
}

export const SelectWithLabel = React.forwardRef<
   HTMLButtonElement,
   SelectWithLabelProps
>(
   (
      {
         className,
         label,
         variant,
         inputSize,
         options,
         placeholder = "Select",
         ...props
      },
      ref
   ) => {
      return (
         <div className="group w-full z-20">
            {label && <p className={cn("text-sm text-secondary")}>{label}</p>}
            <div className="flex w-full items-end">
               <Select
                  {...props}
                  value={props.value === null ? "" : props.value}
                  onValueChange={props.onValueChange}
               >
                  <SelectTrigger
                     ref={ref}
                     className={cn(
                        "focus:outline-none text-base font-medium grow p-0 h-auto flex items-center justify-between truncate",
                        variant === "light" && "text-primary",
                        variant === "dark" && "text-background",
                        variant === "white" && "text-primary bg-white",
                        inputSize === "md" && "text-md",
                        inputSize === "2xl" &&
                           "font-headline text-2xl leading-0",
                        className
                     )}
                  >
                     <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent className="max-h-[250px] max-w-[300px]">
                     {props.value === undefined && (
                        <SelectItem value="" disabled>
                           {placeholder}
                        </SelectItem>
                     )}
                     {options.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                           {opt.label}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
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
   }
);

SelectWithLabel.displayName = "SelectWithLabel";

type ControlledSelectProps<T extends FieldValues> = {
   fieldName: Path<T>;
   control: Control<T>;
   required?: boolean | string;
   errorMessage?: string;
   placeholder?: string;
} & Omit<SelectWithLabelProps, "name" | "value" | "onValueChange">;

export function ControlledSelect<T extends FieldValues>({
   fieldName,
   control,
   required,
   errorMessage,
   placeholder,
   ...rest
}: ControlledSelectProps<T>) {
   return (
      <Controller
         name={fieldName}
         control={control}
         rules={required ? { required } : undefined}
         render={({ field, fieldState }) => (
            <div>
               <SelectWithLabel
                  {...rest}
                  value={field.value}
                  onValueChange={field.onChange}
                  aria-invalid={!!fieldState.error}
                  placeholder={placeholder}
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
