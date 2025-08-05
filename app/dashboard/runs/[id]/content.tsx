"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { EditRunDto, RunFindOneResponse } from "@/lib/zod/runs.zod.schema";

import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from "@/components/primitives/Breadcrumb";
import { toast } from "sonner";

import { ControlledInput } from "@/components/primitives/InputWithLabel";
import { ControlledSelect } from "@/components/primitives/SelectWithLabel";
import { Button } from "@/components/primitives/Button";

import {
   moodOptions,
   runTypeOptions,
} from "@/components/form-elements/utils/selections";

import { NavArrowLeft, ShareAndroid, UnionAlt } from "iconoir-react";

import { editRun, deleteRun } from "@/dashboard/runs/actions";
import { cn } from "@/lib/utils";

type EditRunDtoWithPace = Partial<EditRunDto> & { pace?: string };

const RunPageContent = ({ runData }: { runData: RunFindOneResponse }) => {
   const router = useRouter();
   const { data: session } = useSession();
   const { control, handleSubmit, watch, setValue, getValues } =
      useForm<EditRunDtoWithPace>({
         defaultValues: { ...runData, userId: session?.user?.id },
      });

   // auto calculate pace based on distance/time change
   useEffect(() => {
      const calculatePace = (values: EditRunDtoWithPace) => {
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

            if (formattedPace !== getValues("pace")) {
               setValue("pace", formattedPace);
            }
         }
      };
      calculatePace(getValues());

      const subscription = watch((values) => calculatePace(values));

      return () => subscription.unsubscribe();
   }, [watch, setValue, getValues]);

   const pace = watch("pace");

   const handleDelete = async (e: React.MouseEvent) => {
      e.preventDefault();
      try {
         await deleteRun(runData.id);
         router.push("/dashboard/runs");
      } catch {
         toast.error("Unexpected error. Please try again.");
      }
   };

   const handleBack = (e: React.MouseEvent) => {
      e.preventDefault();
      router.push("/dashboard/runs");
   };

   const handleShare = (e: React.MouseEvent) => {
      e.preventDefault();
      router.push(`/dashboard/runs/${runData.id}/export`);
   };

   const onSubmit = async (data: EditRunDtoWithPace) => {
      if (data.distance !== undefined) data.distance = Number(data.distance);
      if (data.duration !== undefined) data.duration = Number(data.duration);
      if (data.laps !== undefined) data.laps = Number(data.laps);

      try {
         await editRun(runData.id, data as EditRunDto);
         toast.success("Run updated!");
         router.push("/dashboard/runs");
      } catch {
         toast.error("Failed to save run. Please try again.");
      }
   };

   return (
      <div className="flex flex-col text-primary w-full h-full pb-[200px] lg:pb-0 overflow-y-auto overflow-x-hidden">
         <RunPageBreadCrumb runData={runData} />
         <form
            className="flex flex-col grow lg:justify-between"
            onSubmit={handleSubmit(onSubmit)}
         >
            <div className="flex flex-col">
               <div className="flex gap-[18px] pt-4 pb-0 md:pb-5 lg:pb-0">
                  <div
                     onClick={handleShare}
                     className={cn(
                        "flex flex-col items-center justify-center h-[140px] aspect-square bg-background shrink-0 gap-3 cursor-pointer",
                        "md:h-[290px]",
                        "lg:bg-foreground",
                        "hover:bg-primary hover:text-background transition-colors ease-in-out"
                     )}
                  >
                     <UnionAlt className="size-11" />
                     <div
                        className={cn(
                           "font-headline font-bold text-center leading-4 text-[13px]",
                           "md:text-base lg:leading-normal"
                        )}
                     >
                        EXPORT FOR SOCIAL
                     </div>
                  </div>
                  <div className="flex flex-col gap-3 grow">
                     <ControlledInput
                        fieldName="distance"
                        control={control}
                        label="Distance"
                        variant="light"
                        inputSize="2xl"
                        className="font-bold"
                        unit="km"
                        mode="number"
                     />
                     <ControlledInput
                        fieldName="duration"
                        control={control}
                        label="Duration"
                        variant="light"
                        inputSize="2xl"
                        unit="min"
                        mode="number"
                     />
                     <div className="flex justify-between">
                        <div className="w-[50px]">
                           <ControlledInput
                              fieldName="laps"
                              control={control}
                              label="Laps"
                              variant="light"
                              inputSize="2xl"
                              mode="number"
                           />
                        </div>
                        <div className="w-fit flex flex-col">
                           <p className="text-sm text-secondary">Pace</p>
                           <p
                              className={cn(
                                 "font-headline text-[35px] leading-10 text-secondary h-auto",
                                 "md:text-2xl md:leading-16 md:h-[110px]"
                              )}
                           >
                              {pace}
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="flex flex-col gap-4">
                  <ControlledInput
                     fieldName="title"
                     control={control}
                     label="Title"
                     variant="light"
                     className="w-full"
                     inputSize="md"
                     required={true}
                     placeholder="Name your run"
                     errorMessage="Please enter run title"
                  />
                  <ControlledInput
                     fieldName="location"
                     control={control}
                     label="Location"
                     variant="light"
                     className="font-bold"
                     placeholder="Where did you run?"
                  />
                  <div className="flex gap-5">
                     <div className="flex-1">
                        <ControlledSelect
                           fieldName="runType"
                           control={control}
                           options={runTypeOptions}
                           label="Run Type"
                           variant="light"
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
                           variant="light"
                           className="font-bold"
                           placeholder="How do you feel?"
                        />
                     </div>
                     <div className="flex-1">
                        <ControlledInput
                           fieldName="gear"
                           control={control}
                           label="Gear"
                           variant="light"
                           className="font-bold"
                           placeholder="Running shoes"
                        />
                     </div>
                  </div>
                  <ControlledInput
                     fieldName="note"
                     control={control}
                     label="Note"
                     variant="light"
                     placeholder="Something to remember"
                  />
               </div>
            </div>
            <div className="flex justify-between pt-[20px] lg:pt-0">
               <div className="flex items-center gap-2">
                  <Button onClick={handleBack} className="border" type="button">
                     <NavArrowLeft className="size-5 w-[20px]" />
                  </Button>
                  <Button
                     onClick={handleDelete}
                     className="border w-[90px]"
                     type="button"
                  >
                     Delete
                  </Button>
               </div>
               <div className="flex items-center gap-2">
                  <Button className="border w-[90px]" type="submit">
                     Save
                  </Button>
                  <Button
                     onClick={handleShare}
                     className="border"
                     type="button"
                  >
                     <ShareAndroid className="size-4 w-[20px]" />
                  </Button>
               </div>
            </div>
         </form>
      </div>
   );
};

export const RunPageBreadCrumb = ({
   runData,
}: {
   runData: RunFindOneResponse;
}) => {
   return (
      <Breadcrumb>
         <BreadcrumbList>
            <BreadcrumbItem>
               <BreadcrumbLink href="/dashboard/runs">Runs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
               <BreadcrumbPage>{runData.title}</BreadcrumbPage>
            </BreadcrumbItem>
         </BreadcrumbList>
      </Breadcrumb>
   );
};

export default RunPageContent;
