"use client";

import { FormFooter } from "@/components/form-elements/FormFooter";
import {
   moodOptions,
   runTypeOptions,
} from "@/components/form-elements/utils/selections";
import { ControlledInput } from "@/components/primitives/InputWithLabel";
import { PlusSquare } from "iconoir-react";
import React, { useEffect, useState } from "react";
import { ControlledSelect } from "@/components/primitives/SelectWithLabel";
import { useForm, SubmitHandler } from "react-hook-form";
import { createRun } from "@/dashboard/runs/actions";
import { cn } from "@/lib/utils";

import { useSession } from "next-auth/react";
import { ControlledDatePicker } from "@/components/primitives/DatePicker";
import { ControlledTimePicker } from "@/components/primitives/TimePicker";
import { CreateRunDto } from "@/lib/zod/runs.zod.schema";

type CreateRunDtoWithPace = CreateRunDto & { pace?: string };

const NewRunBar = () => {
   const [mode, setMode] = useState<"base" | "add">("base");
   const { data: session } = useSession();

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

   useEffect(() => {
      if (session?.user?.id) {
         setValue("userId", session.user.id);
      }
   }, [session, setValue]);

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
      if (hour >= 12 && hour < 17) {
         timeOfDay = "Afternoon";
      } else if (hour >= 17 || hour < 5) {
         timeOfDay = "Evening";
      }
      const autoTitle = `${dayName} ${timeOfDay} Run`;
      if (
         !values.title ||
         values.title === "" ||
         values.title.endsWith("Run")
      ) {
         setValue("title", autoTitle);
      }

      return () => subscription.unsubscribe();
   }, [watch, setValue, getValues]);

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

   const onSubmit: SubmitHandler<CreateRunDto> = async (data) => {
      if (data.distance !== undefined) data.distance = Number(data.distance);
      if (data.duration !== undefined) data.duration = Number(data.duration);
      if (data.laps !== undefined) data.laps = Number(data.laps);

      if (!data.userId && session?.user?.id) {
         data.userId = session.user.id;
      }

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

   return (
      <div className="relative h-fit flex w-full ">
         <div
            className={cn(
               "flex gap-2 items-center justify-center font-headline text-[25px] font-bold h-[84px] rounded-base bg-background cursor-pointer w-full",
               "border border-transparent hover:bg-primary hover:text-background transition-colors"
            )}
            onClick={() => setMode("add")}
         >
            <span>NEW RUN</span>
            <PlusSquare className="size-6" />
         </div>
         <form
            onSubmit={handleSubmit(onSubmit)}
            className={cn(
               "flex absolute w-full flex-col justify-between rounded-base bg-primary p-[15px] box-border overflow-hidden origin-top",
               "transition-all duration-170 ease-in-out z-10",
               mode === "add"
                  ? "scale-y-100 opacity-100"
                  : "scale-y-0 opacity-0"
            )}
         >
            <div>
               <div className="flex justify-between">
                  <div className="flex gap-[4px] text-background h-fit items-center">
                     <PlusSquare className="size-6" />
                     <span className="font-headline font-semibold text-[26px]">
                        NEW RUN
                     </span>
                  </div>
                  <div className="flex items-center gap-3">
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
               <div className="flex flex-col gap-3">
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
                  <div className="flex justify-between">
                     <div className="w-[200px]">
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
                     <div className="flex gap-5">
                        <div className="w-[200px]">
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
                  </div>
                  <div className="w-[245px] flex flex-col">
                     <p className="text-sm text-secondary">Pace</p>
                     <p className="font-headline text-2xl leading-16 text-secondary h-[110px]">
                        {pace}
                     </p>
                  </div>
               </div>
            </div>
            <div className="flex flex-col gap-5 text-background">
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
               <div className="flex gap-5">
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
               <FormFooter handleDestructive={handleDestructive} />
            </div>
         </form>
      </div>
   );
};

export default NewRunBar;
