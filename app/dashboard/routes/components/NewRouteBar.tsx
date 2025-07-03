"use client";

import { FormFooter } from "@/components/form-elements/FormFooter";
import { runTypeOptions } from "@/components/form-elements/utils/selections";
import { ControlledInput } from "@/components/primitives/InputWithLabel";
import { PlusSquare } from "iconoir-react";
import { useEffect, useState } from "react";
import { ControlledSelect } from "@/components/primitives/SelectWithLabel";
import { useForm, SubmitHandler } from "react-hook-form";
import { createRoute } from "@/dashboard/routes/actions";
import { cn } from "@/lib/utils";

import { useSession } from "next-auth/react";
import { CreateRouteDto } from "@/lib/zod/routes.zod.schema";

type CreateRouteDtoWithPace = CreateRouteDto & { pace?: string };

const NewRouteBar = () => {
   const [mode, setMode] = useState<"base" | "add">("base");
   const { data: session } = useSession();

   const { control, handleSubmit, setValue, reset } =
      useForm<CreateRouteDtoWithPace>({
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

   const onSubmit: SubmitHandler<CreateRouteDto> = async (data) => {
      if (data.distance !== undefined) data.distance = Number(data.distance);
      if (data.duration !== undefined) data.duration = Number(data.duration);
      if (data.laps !== undefined) data.laps = Number(data.laps);

      if (!data.userId && session?.user?.id) {
         data.userId = session.user.id;
      }

      try {
         await createRoute(data);
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
            <span>ADD ROUTE</span>
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
                        ADD ROUTE
                     </span>
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
                     placeholder="Name your route"
                     errorMessage="Please enter run title"
                  />
                  <div className="flex justify-between">
                     <div className="w-[250px]">
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
                        <div className="w-[80px]">
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
                  <div className="h-[40px]"></div>
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
                  <div className="flex-2">
                     <ControlledInput
                        fieldName="note"
                        control={control}
                        label="Note"
                        variant="dark"
                        placeholder="Something to remember"
                     />
                  </div>
               </div>
               <FormFooter handleDestructive={handleDestructive} />
            </div>
         </form>
      </div>
   );
};

export default NewRouteBar;
