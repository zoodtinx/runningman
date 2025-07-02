"use client";

import { useForm } from "react-hook-form";

import { EditRunDto } from "@/lib/zod/runs.zod.schema";
import { RunFindOneResponse } from "@/lib/zod/runs.zod.schema";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

type EditRunDtoWithPace = Partial<EditRunDto> & { pace?: string };

const RunPageContent = ({ runData }: { runData: RunFindOneResponse }) => {
   const { data: session } = useSession();
   const { control, handleSubmit, watch, setValue, reset, getValues } =
      useForm<EditRunDtoWithPace>({
         defaultValues: { ...runData, userId: session?.user?.id },
      });

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

   console.log('watch("pace")', watch("pace"));

   return <div className="text-primary">{watch("pace")}</div>;
};

export default RunPageContent;
