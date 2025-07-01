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
import { cn } from "@/lib/utils";

type NewRunFormValues = {
   title: string;
   distanceKm: string;
   distanceMin: string;
   laps: string;
   pace: string;
   location: string;
   runType: string;
   mood: string;
   gear: string;
   note: string;
};

const NewRunBar = () => {
   // Toggle between "base" and "add"
   const [mode, setMode] = useState<"base" | "add">("base");

   const { control, handleSubmit, watch, setValue, reset } =
      useForm<NewRunFormValues>({
         defaultValues: {
            title: "",
            distanceKm: "",
            distanceMin: "",
            laps: "1",
            pace: "",
            location: "",
            runType: "",
            mood: "",
            gear: "",
            note: "",
         },
      });

   useEffect(() => {
      const subscription = watch((values) => {
         const distance = parseFloat(values.distanceKm || "0");
         const laps = parseFloat(values.laps || "1");
         const totalDistance = distance * (laps > 0 ? laps : 1);
         const duration = parseFloat(values.distanceMin || "0");

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

      return () => subscription.unsubscribe();
   }, [watch, setValue]);

   const pace = watch("pace");

   const onSubmit: SubmitHandler<NewRunFormValues> = (data) => {
      console.log(data);
      // After submit, return to base mode and reset form
      setMode("base");
      reset();
   };

   // if (mode === "base") {
   //    return (
   //       <div
   //          className="flex gap-2 items-center justify-center font-headline text-[25px] font-bold h-[84px] rounded-base bg-background cursor-pointer"
   //          onClick={() => setMode("add")}
   //       >
   //          <span>NEW RUN</span>
   //          <PlusSquare className="size-6" />
   //       </div>
   //    );
   // }

   const handleDestructive = () => {
      // On discard, return to base mode and reset form
      setMode("base");
      reset();
   };

   return (
      <div className="relative h-fit flex w-full">
         <div
            className="flex gap-2 items-center justify-center font-headline text-[25px] font-bold h-[84px] rounded-base bg-background cursor-pointer w-full"
            onClick={() => setMode("add")}
         >
            <span>NEW RUN</span>
            <PlusSquare className="size-6" />
         </div>
         <form
            onSubmit={handleSubmit(onSubmit)}
            className={cn(
               "flex absolute w-full flex-col justify-between rounded-base bg-primary p-[15px] box-border overflow-hidden origin-top transition-all duration-300 ease-in-out",
               mode === "add"
                  ? "scale-y-100 opacity-100"
                  : "scale-y-0 opacity-0"
            )}
         >
            <div>
               <div className="flex gap-[4px] text-background h-fit items-center">
                  <PlusSquare className="size-6" />
                  <span className="font-headline font-semibold text-[26px]">
                     NEW RUN
                  </span>
               </div>
               <div className="flex flex-col gap-3">
                  <ControlledInput
                     filedName="title"
                     control={control}
                     label="Title"
                     variant="dark"
                     className="w-full"
                     inputSize="md"
                     required={true}
                     errorMessage="Please enter run title"
                  />
                  <div className="flex justify-between">
                     <div className="w-[245px]">
                        <ControlledInput
                           filedName="distanceKm"
                           control={control}
                           label="Distance"
                           variant="dark"
                           inputSize="2xl"
                           className="font-bold"
                           unit="km"
                        />
                     </div>
                     <div className="flex gap-5">
                        <div className="w-[245px]">
                           <ControlledInput
                              filedName="distanceMin"
                              control={control}
                              label="Duration"
                              variant="dark"
                              inputSize="2xl"
                              unit="min"
                           />
                        </div>
                        <div className="w-[50px]">
                           <ControlledInput
                              filedName="laps"
                              control={control}
                              label="Laps"
                              variant="dark"
                              inputSize="2xl"
                           />
                        </div>
                     </div>
                  </div>
                  <div className="w-[245px] flex flex-col">
                     <p className="text-sm text-secondary">Pace</p>
                     <p className="font-headline text-2xl leading-16 text-secondary">
                        {pace}
                     </p>
                  </div>
               </div>
            </div>
            <div className="flex flex-col gap-5 text-background">
               <div className="flex-1">
                  <ControlledInput
                     filedName="location"
                     control={control}
                     label="Location"
                     variant="dark"
                     className="font-bold"
                  />
               </div>
               <div className="flex gap-5">
                  <div className="flex-1">
                     <ControlledSelect
                        filedName="runType"
                        control={control}
                        options={runTypeOptions}
                        label="Run Type"
                        variant="dark"
                        className="font-bold"
                     />
                  </div>
                  <div className="flex-1">
                     <ControlledSelect
                        filedName="mood"
                        control={control}
                        options={moodOptions}
                        label="Mood"
                        variant="dark"
                        className="font-bold"
                     />
                  </div>
                  <div className="flex-1">
                     <ControlledSelect
                        filedName="gear"
                        control={control}
                        options={runTypeOptions}
                        label="Gear"
                        variant="dark"
                        className="font-bold"
                     />
                  </div>
               </div>
               <div className="flex-1">
                  <ControlledInput
                     filedName="note"
                     control={control}
                     label="Note"
                     variant="dark"
                  />
               </div>
               <FormFooter handleDestructive={handleDestructive} />
            </div>
         </form>
      </div>
   );
};

export default NewRunBar;
