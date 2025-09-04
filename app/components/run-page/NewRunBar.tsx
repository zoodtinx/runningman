"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, ReactNode } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { PlusSquare } from "iconoir-react";

import { FormFooter } from "@/components/form-elements/FormFooter";
import {
   moodOptions,
   runTypeOptions,
} from "@/components/form-elements/utils/selections";

import { ControlledInput } from "@/components/primitives/InputWithLabel";
import {
   ControlledSelect,
   SelectWithLabel,
} from "@/components/primitives/SelectWithLabel";
import { ControlledDatePicker } from "@/components/primitives/DatePicker";
import { ControlledTimePicker } from "@/components/primitives/TimePicker";

import { createRun, getRouteData } from "@/dashboard/runs/actions";
import { CreateRunDto } from "@/lib/zod/runs.zod.schema";
import { cn } from "@/lib/utils";

// Extended DTO to include pace string
type CreateRunDtoWithPace = CreateRunDto & { pace?: string };

const NewRunBar = ({
   routeOptions,
}: {
   routeOptions: { value: string; label: ReactNode }[];
}) => {
   const [selectedRoute, setSelectedRoute] = useState("");
   const [mode, setMode] = useState<"base" | "add">("base");
   const { data: session, status } = useSession();

   const { control, handleSubmit, watch, setValue, reset, getValues } =
      useForm<CreateRunDtoWithPace>({
         defaultValues: {
            title: "",
            distance: 1,
            duration: 1,
            laps: 1,
            location: "",
            routeId: "",
            runType: "daily-miles",
            pace: "",
            mood: "",
            gear: "",
            dateTime: new Date().toISOString(),
            note: "",
            userId: "",
         },
      });

   if (status === "authenticated" && session?.user?.id) {
      setValue("userId", session.user.id);
   }

   // Calculate pace and generate title dynamically
   useEffect(() => {
      const subscription = watch((values) => {
         const distance = values.distance ?? 0;
         const laps = values.laps ?? 1;
         const totalDistance = distance * (laps > 0 ? laps : 1);
         const duration = values.duration ?? 0;

         if (totalDistance > 0 && duration > 0) {
            const pace = duration / totalDistance;
            const paceMinutes = Math.floor(pace);
            const paceSeconds = Math.round((pace - paceMinutes) * 60);
            const formattedSeconds = paceSeconds.toString().padStart(2, "0");
            const formattedPace = `${paceMinutes}'${formattedSeconds}"`;

            if (formattedPace !== values.pace) {
               setValue("pace", formattedPace);
            }
         }
      });

      const values = getValues();
      const dateTime = values.dateTime ? new Date(values.dateTime) : new Date();

      // Auto-generate title based on day + time of day
      const days = [
         "Sunday",
         "Monday",
         "Tuesday",
         "Wednesday",
         "Thursday",
         "Friday",
         "Saturday",
      ];
      const dayName = days[dateTime.getDay()];
      const hour = dateTime.getHours();
      let timeOfDay = "Morning";
      if (hour >= 12 && hour < 17) timeOfDay = "Afternoon";
      else if (hour >= 17 || hour < 5) timeOfDay = "Evening";
      const autoTitle = `${dayName} ${timeOfDay} Run`;

      if (!values.title || values.title.endsWith("Run")) {
         setValue("title", autoTitle);
      }

      return () => subscription.unsubscribe();
   }, [watch, setValue, getValues]);

   // Escape key cancels the form
   useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
         if (e.key === "Escape") {
            setMode("base");
         }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
         window.removeEventListener("keydown", handleKeyDown);
      };
   }, []);

   const pace = watch("pace");

   // Form submit handler
   const onSubmit: SubmitHandler<CreateRunDto> = async (data) => {
      Object.assign(data, {
         userId: data.userId ?? session?.user?.id,
         distance:
            data.distance !== undefined
               ? +Number(data.distance).toFixed(2)
               : data.distance,
         duration:
            data.duration !== undefined
               ? +Number(data.duration).toFixed(2)
               : data.duration,
         laps:
            data.laps !== undefined ? +Number(data.laps).toFixed(1) : data.laps,
      });

      try {
         await createRun(data);
      } catch (error) {
         console.error(error);
      }

      setMode("base");
      reset();
   };

   const handleDestructive = () => {
      setMode("base");
      reset();
   };

   // Preload fields from selected route
   const handleRouteSelect = async (value: string) => {
      setSelectedRoute(value);
      const route = await getRouteData(value);

      if (route) {
         setValue("title", route.title!);
         setValue("note", route.note!);
         setValue("location", route.location!);
         setValue("runType", route.runType!);
         setValue("distance", route.distance!);
         setValue("duration", route.duration!);
         setValue("laps", route.laps!);
      }
   };

   return (
      <div className="relative h-fit flex w-full">
         {/* Collapsed button */}
         <div
            className={cn(
               "flex gap-2 items-center justify-center font-headline text-[22px] font-bold h-[73px] rounded-base bg-background cursor-pointer w-full",
               "border border-transparent hover:bg-primary hover:text-background transition-colors"
            )}
            onClick={() => setMode("add")}
         >
            <span>NEW RUN</span>
            <PlusSquare className="size-6" />
         </div>

         {/* Expanded form */}
         <form
            onSubmit={handleSubmit(onSubmit)}
            className={cn(
               "flex absolute w-full flex-col justify-between rounded-base bg-primary p-3 box-border overflow-hidden origin-top",
               "transition-all duration-170 ease-in-out z-10",
               mode === "add"
                  ? "scale-y-100 opacity-100"
                  : "scale-y-0 opacity-0"
            )}
         >
            {/* Header: Title + Date/Time + Route */}
            <div>
               <div className="flex flex-col md:flex-row justify-between mb-1">
                  <div className="flex gap-1 h-fit items-center shrink-0">
                     <PlusSquare className="size-5 text-background " />
                     <span className="font-headline font-semibold text-[20px] text-background ">
                        NEW RUN
                     </span>
                     <div className="w-[120px] md:w-[150px] ml-1">
                        <SelectWithLabel
                           options={routeOptions}
                           onValueChange={handleRouteSelect}
                           value={selectedRoute}
                           placeholder="Select from route"
                           className="text-background"
                        />
                     </div>
                  </div>
                  <div className="flex items-center gap-4 pb-3 pt-1 md:pb-0 md:pt-0 justify-between">
                     <div className="flex gap-2 shrink-0 w-fit">
                        <ControlledDatePicker
                           fieldName="dateTime"
                           control={control}
                        />
                        <ControlledTimePicker
                           control={control}
                           fieldName="dateTime"
                        />
                     </div>
                  </div>
               </div>

               {/* Input: Title, Distance, Duration, Laps, Pace */}
               <div className="flex flex-col gap-3 ">
                  <ControlledInput
                     fieldName="title"
                     control={control}
                     label="Title"
                     variant="dark"
                     className="w-full"
                     inputSize="md"
                     required={true}
                     placeholder="Name your run"
                     errorMessage="Please enter run title"
                  />
                  <div className="flex gap-2 justify-between">
                     <div className="flex-1 md:w-[200px] shrink-0">
                        <ControlledInput
                           fieldName="distance"
                           control={control}
                           label="Distance"
                           variant="dark"
                           inputSize="2xl"
                           className="font-bold"
                           unit="km"
                           mode="number"
                        />
                     </div>
                     <div className="flex-1 md:w-[200px]">
                        <ControlledInput
                           fieldName="duration"
                           control={control}
                           label="Duration"
                           variant="dark"
                           inputSize="2xl"
                           unit="min"
                           mode="number"
                        />
                     </div>
                     <div className="w-[50px]">
                        <ControlledInput
                           fieldName="laps"
                           control={control}
                           label="Laps"
                           variant="dark"
                           inputSize="2xl"
                           mode="number"
                        />
                     </div>
                  </div>
                  <div className="w-[245px] flex flex-col">
                     <p className="text-sm text-secondary">Pace</p>
                     <p className="font-headline text-[35px] md:text-[46px] leading-none pt-2 text-secondary h-fit pb-2 md:pb-0 md:h-[70px]">
                        {pace}
                     </p>
                  </div>
               </div>
            </div>

            {/* Input: Location, RunType, Mood, Gear, Note */}
            <div className="flex flex-col gap-4 md:gap-5 text-background">
               <div className="flex-1">
                  <ControlledInput
                     fieldName="location"
                     control={control}
                     label="Location"
                     variant="dark"
                     className="font-bold"
                     placeholder="Where did you run?"
                  />
               </div>
               <div className="flex flex-col md:flex-row gap-5">
                  <div className="flex gap-4">
                     <div className="flex-1">
                        <ControlledSelect
                           fieldName="runType"
                           control={control}
                           options={runTypeOptions}
                           label="Run Type"
                           variant="dark"
                           className="font-bold"
                           placeholder="Run Type"
                           required={true}
                           errorMessage="Please specify run type"
                        />
                     </div>
                     <div className="flex-1">
                        <ControlledSelect
                           fieldName="mood"
                           control={control}
                           options={moodOptions}
                           label="Mood"
                           variant="dark"
                           className="font-bold"
                           placeholder="How do you feel?"
                        />
                     </div>
                  </div>
                  <div className="flex-1">
                     <ControlledInput
                        fieldName="gear"
                        control={control}
                        label="Gear"
                        variant="dark"
                        className="font-bold"
                        placeholder="Running shoes"
                     />
                  </div>
               </div>
               <div className="flex-1">
                  <ControlledInput
                     fieldName="note"
                     control={control}
                     label="Note"
                     variant="dark"
                     placeholder="Something to remember"
                  />
               </div>
               {/* Submit / Cancel */}
               <FormFooter handleDestructive={handleDestructive} />
            </div>
         </form>
      </div>
   );
};

export default NewRunBar;
