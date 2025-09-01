"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import {
   EditRouteDto,
   RouteFindOneResponse,
} from "@/lib/zod/routes.zod.schema";

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

import { runTypeOptions } from "@/components/form-elements/utils/selections";

import { NavArrowLeft } from "iconoir-react";

import { editRoute, deleteRoute } from "@/dashboard/routes/actions";
import { cn } from "@/lib/utils";

type EditRouteDtoWithPace = Partial<EditRouteDto>;

const RoutePageContent = ({
   routeData,
}: {
   routeData: RouteFindOneResponse;
}) => {
   const router = useRouter();
   const { data: session } = useSession();
   const [mode, setMode] = useState<"distance" | "time">("distance");
   const { control, handleSubmit, setValue, getValues } =
      useForm<EditRouteDtoWithPace>({
         defaultValues: { ...routeData, userId: session?.user?.id },
      });
   const [distanceValue, setDistanceValue] = useState<number | null>(
      routeData.distance ?? null
   );
   const [durationValue, setDurationValue] = useState<number | null>(
      routeData.duration ?? null
   );
   const [lapsValue, setLapsValue] = useState<number>(routeData.laps ?? 1);

   useEffect(() => {
      setMode(routeData.duration ? "time" : "distance");
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      if (mode === "distance") {
         setValue("distance", distanceValue);
         setValue("duration", null);
         setValue("laps", lapsValue);
      } else {
         setValue("duration", durationValue);
         setValue("distance", null);
         setValue("laps", 1);
      }
   }, [mode, distanceValue, durationValue, setValue, lapsValue]);

   const handleToggle = (
      e: React.MouseEvent,
      selected: "distance" | "time"
   ) => {
      e.preventDefault();
      if (mode === "distance") {
         setDistanceValue(getValues("distance") ?? null);
         setLapsValue(getValues("laps") ?? 1);
      } else {
         setDurationValue(getValues("duration") ?? null);
      }
      setMode(selected);
   };

   const handleDelete = async (e: React.MouseEvent) => {
      e.preventDefault();
      try {
         await deleteRoute(routeData.id);
         router.push("/dashboard/routes");
      } catch {
         toast.error("Unexpected error. Please try again.");
      }
   };

   const handleBack = (e: React.MouseEvent) => {
      e.preventDefault();
      router.push("/dashboard/routes");
   };

   const onSubmit = async (data: EditRouteDtoWithPace) => {
      if (data.distance !== undefined) data.distance = Number(data.distance);
      if (data.duration !== undefined) data.duration = Number(data.duration);
      if (data.laps !== undefined) data.laps = Number(data.laps);

      if (mode === "time") {
         data.laps = null;
      }

      try {
         await editRoute(routeData.id, data as EditRouteDto);
         toast.success("Route updated!");
         router.push("/dashboard/routes");
      } catch {
         toast.error("Failed to save route. Please try again.");
      }
   };

   return (
      <div className={cn("flex flex-col text-primary w-full h-full")}>
         <RoutePageBreadCrumb routeData={routeData} />
         <form
            className={cn(
               "flex flex-col grow justify-start gap-5",
               "lg:justify-between"
            )}
            onSubmit={handleSubmit(onSubmit)}
         >
            <div className={cn("flex flex-col pt-3")}>
               <ControlledInput
                  fieldName="title"
                  control={control}
                  label="Title"
                  variant="light"
                  className="w-full"
                  inputSize="md"
                  required={true}
                  placeholder="Name your route"
                  errorMessage="Please enter route title"
               />
               <div className={cn("flex gap-3 pt-4", "md:pt-6")}>
                  <div className={cn("h-full w-[130px]", "md:p-1")}>
                     <div
                        className={cn(
                           "h-full rounded-base p-2 cursor-default flex flex-col transition-colors duration-200 gap-1",
                           "bg-background",
                           "lg:bg-foreground"
                        )}
                     >
                        <button
                           type="button"
                           className={cn(
                              "flex items-center px-2 font-semibold h-1/2 w-full rounded-sm transition-colors duration-200",
                              mode === "distance"
                                 ? "bg-primary text-background"
                                 : "bg-transparent text-secondary hover:text-primary"
                           )}
                           onClick={(e) => handleToggle(e, "distance")}
                        >
                           Distance
                        </button>
                        <button
                           type="button"
                           className={cn(
                              "flex items-center px-2 font-semibold h-1/2 w-full rounded-sm transition-colors duration-200",
                              mode === "time"
                                 ? "bg-primary text-background"
                                 : "bg-transparent text-secondary hover:text-primary"
                           )}
                           onClick={(e) => handleToggle(e, "time")}
                        >
                           Time
                        </button>
                     </div>
                  </div>
                  <div className={cn("flex justify-between gap-3 grow")}>
                     {mode === "distance" ? (
                        <>
                           <div className={cn("md:w-[250px]")}>
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
                           </div>
                           <div className="flex justify-between">
                              <div className="w-[50px]">
                                 <ControlledInput
                                    fieldName="laps"
                                    control={control}
                                    label="Laps"
                                    variant="light"
                                    inputSize="2xl"
                                    mode="number"
                                    disabled={false}
                                 />
                              </div>
                           </div>
                        </>
                     ) : (
                        <>
                           <div className={cn("md:w-[250px]")}>
                              <ControlledInput
                                 fieldName="duration"
                                 control={control}
                                 label="Duration"
                                 variant="light"
                                 inputSize="2xl"
                                 className="font-bold"
                                 unit="min"
                                 mode="number"
                              />
                           </div>
                        </>
                     )}
                  </div>
               </div>
               <div className={cn("flex flex-col gap-4 pt-2", "md:pt-6")}>
                  <ControlledInput
                     fieldName="location"
                     control={control}
                     label="Location"
                     variant="light"
                     className="font-bold"
                     placeholder="Where is the route?"
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
                           errorMessage="Please specify route type"
                        />
                     </div>
                     <div className="flex-3">
                        <ControlledInput
                           fieldName="note"
                           control={control}
                           label="Note"
                           variant="light"
                           placeholder="Something to remember"
                        />
                     </div>
                  </div>
               </div>
            </div>
            <div className="flex justify-between">
               <div className="flex items-center gap-2">
                  <Button
                     onClick={handleBack}
                     className="border border-primary"
                     type="button"
                  >
                     <NavArrowLeft className="size-5 w-[20px]" />
                  </Button>
                  <Button
                     onClick={handleDelete}
                     className="w-[90px] border border-primary"
                     type="button"
                  >
                     Delete
                  </Button>
               </div>
               <div className="flex items-center gap-2">
                  <Button
                     className="w-[90px] border border-primary"
                     type="submit"
                  >
                     Save
                  </Button>
               </div>
            </div>
         </form>
      </div>
   );
};

export const RoutePageBreadCrumb = ({
   routeData,
}: {
   routeData: RouteFindOneResponse;
}) => {
   return (
      <Breadcrumb>
         <BreadcrumbList>
            <BreadcrumbItem>
               <BreadcrumbLink href="/dashboard/routes">Routes</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
               <BreadcrumbPage>{routeData.title}</BreadcrumbPage>
            </BreadcrumbItem>
         </BreadcrumbList>
      </Breadcrumb>
   );
};

export default RoutePageContent;
