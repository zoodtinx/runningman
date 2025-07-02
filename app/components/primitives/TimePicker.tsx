import { useEffect, useMemo, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../primitives/Popover";
import { setHours, setMinutes, format } from "date-fns";
import { Xmark as XIcon } from "iconoir-react";
import { Controller, Control, Path, FieldValues } from "react-hook-form";

type ControlledTimePickerProps<T extends FieldValues> = {
   fieldName: Path<T>;
   control: Control<T>;
   required?: boolean | string;
   errorMessage?: string;
   enableTime?: boolean;
};

export function ControlledTimePicker<T extends FieldValues>({
   fieldName,
   control,
   required,
   errorMessage,
   enableTime = false,
}: ControlledTimePickerProps<T>) {
   return (
      <Controller
         name={fieldName}
         control={control}
         rules={required ? { required } : undefined}
         render={({ field, fieldState }) => (
            <div className="flex flex-col">
               <TimePicker
                  value={field.value}
                  handleChange={field.onChange}
                  enableTime={enableTime}
               />
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

type TimePickerProps = {
   value: string;
   handleChange: (newValue: string) => void;
   enableTime?: boolean;
};

const TimePicker: React.FC<TimePickerProps> = ({ value, handleChange }) => {
   const dateObject = useMemo(() => new Date(value as string), [value]);

   const hours = Array.from({ length: 12 }, (_, i) =>
      String(i + 1).padStart(2, "0")
   );
   const minutes = Array.from({ length: 12 }, (_, i) =>
      String(i * 5).padStart(2, "0")
   );

   const [selectedHour, setSelectedHour] = useState("00");
   const [selectedMinute, setSelectedMinute] = useState("00");
   const [selectedPeriod, setSelectedPeriod] = useState("AM");
   const [isPopoverOpen, setIsPopoverOpen] = useState(false);

   useEffect(() => {
      if (!value || !value.includes("T")) return;

      const formattedDate = format(dateObject, "hh:mm a");
      const [time, period] = formattedDate.split(" ");
      const [hour, minute] = time.split(":");
      setSelectedHour(hour);
      setSelectedMinute(minute);
      setSelectedPeriod(period);
   }, []);

   useEffect(() => {
      if (!value || !value.includes("T")) return;

      const currentHour = dateObject.getHours();
      const currentMinute = dateObject.getMinutes();

      let hour = Number(selectedHour);
      if (selectedPeriod === "AM" && hour === 12) hour = 0;
      else if (selectedPeriod === "PM" && hour !== 12) hour += 12;

      if (hour === currentHour && Number(selectedMinute) === currentMinute)
         return;

      const updatedDate = setMinutes(
         setHours(dateObject, hour),
         Number(selectedMinute)
      );
      handleChange(updatedDate.toISOString());
   }, [
      selectedHour,
      selectedMinute,
      selectedPeriod,
      dateObject,
      handleChange,
      value,
   ]);

   const togglePeriod = () => {
      setSelectedPeriod((prev) => (prev === "AM" ? "PM" : "AM"));
   };

   if (!value) return <></>;

   return (
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
         <PopoverTrigger asChild>
            <div
               className="text-secondary cursor-pointer"
               onClick={() => setIsPopoverOpen(true)}
            >
               <div className="flex items-center gap-1 font-semibold">
                  <p className="text-background font-medium">
                     {`${selectedHour}:${selectedMinute} ${selectedPeriod}`}
                  </p>
               </div>
            </div>
         </PopoverTrigger>

         <PopoverContent className="w-[150px] p-2 flex bg-foreground rounded-xl">
            <div className="flex gap-1 w-full">
               <div className="w-1/2">
                  <label className="block text-sm text-secondary font-medium mb-1 text-center">
                     Hours
                  </label>
                  <select
                     className="w-full border border-tertiary rounded-md p-1 appearance-none text-md text-center"
                     value={selectedHour}
                     onChange={(e) => setSelectedHour(e.target.value)}
                  >
                     {hours.map((hour) => (
                        <option key={hour} value={hour}>
                           {hour}
                        </option>
                     ))}
                  </select>
               </div>

               <div className="w-1/2">
                  <label className="block text-sm text-secondary mb-1 text-center">
                     Minutes
                  </label>
                  <select
                     className="w-full border border-tertiary rounded-md p-1 appearance-none text-md text-center"
                     value={selectedMinute}
                     onChange={(e) => setSelectedMinute(e.target.value)}
                  >
                     {minutes.map((minute) => (
                        <option key={minute} value={minute}>
                           {minute}
                        </option>
                     ))}
                  </select>
               </div>
            </div>
            <button
               className="px-4 py-1 bg-tertiary rounded-md mt-2 w-full"
               onClick={togglePeriod}
            >
               {selectedPeriod}
            </button>
         </PopoverContent>
      </Popover>
   );
};
