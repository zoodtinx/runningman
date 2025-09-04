"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import useEmblaCarousel from "embla-carousel-react";

import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from "@/components/primitives/Breadcrumb";
import {
   MorningRun,
   Dopaminization,
   FlowState,
   FlyingSprint,
   Zone4,
} from "@/dashboard/runs/[id]/export/helpers/export-cards/Templates";
import { RunFindOneResponse } from "@/lib/zod/runs.zod.schema";
import { Download, NavArrowLeft, NavArrowRight } from "iconoir-react";
import { downloadBase64AsJPG } from "@/dashboard/runs/[id]/export/utils";
import { Run } from "@prisma/client";
import Image from "next/image";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Loader from "@/components/icons/Loader";
import { toPng } from "html-to-image";

const ExportPageContent = ({ runData }: { runData: Run }) => {
   const [themeData, setThemeData] = useState<
      { theme: string; dataUrl: string; transparent: boolean }[]
   >([]);
   const [loading, setLoading] = useState(true);

   const morningRunRef = useRef<HTMLDivElement>(null);
   const dopaminizationRef = useRef<HTMLDivElement>(null);
   const flowStateRef = useRef<HTMLDivElement>(null);
   const flyingSprintRef = useRef<HTMLDivElement>(null);
   const zone4Ref = useRef<HTMLDivElement>(null);

   const refs = [
      { ref: morningRunRef, theme: "MorningRun" },
      { ref: dopaminizationRef, theme: "Dopaminization" },
      { ref: flowStateRef, theme: "FlowState" },
      { ref: flyingSprintRef, theme: "FlyingSprint" },
      { ref: zone4Ref, theme: "Zone4" },
   ];

   useEffect(() => {
      async function generateImages() {
         const images: {
            theme: string;
            dataUrl: string;
            transparent: boolean;
         }[] = [];

         for (const { ref, theme } of refs) {
            if (ref.current) {
               const dataUrl = await toPng(ref.current);
               images.push({ theme, dataUrl, transparent: true });
            }
         }

         setThemeData(images);
         setLoading(false);
      }

      generateImages();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <div className="flex flex-col text-primary w-full h-full">
         <div className="opacity-0 absolute pointer-events-none">
            <MorningRun ref={morningRunRef} runData={runData} />
            <Dopaminization ref={dopaminizationRef} runData={runData} />
            <FlowState ref={flowStateRef} runData={runData} />
            <FlyingSprint ref={flyingSprintRef} runData={runData} />
            <Zone4 ref={zone4Ref} runData={runData} />
         </div>

         <ExportPageBreadCrumb runData={runData} />

         {loading ? (
            <div className="grow flex items-center justify-center overflow-hidden">
               <Loader className="animate-spin duration-75" />
            </div>
         ) : (
            <div className="flex grow items-center justify-center overflow-clip lg:max-w-[445px] xl:max-w-[525px]">
               <EmblaCarousel themes={themeData} />
            </div>
         )}
      </div>
   );
};

export function EmblaCarousel({
   themes,
}: {
   themes: {
      theme: string;
      dataUrl: string;
      transparent: boolean;
   }[];
}) {
   const [emblaRef, emblaApi] = useEmblaCarousel({
      loop: true,
      containScroll: "trimSnaps",
      align: "center",
   });
   const [canScrollPrev, setCanScrollPrev] = useState(true);
   const [canScrollNext, setCanScrollNext] = useState(true);

   const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
   const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

   const onSelect = useCallback(() => {
      if (!emblaApi) return;
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
   }, [emblaApi]);

   useEffect(() => {
      if (!emblaApi) return;
      emblaApi.on("init", onSelect);
      emblaApi.on("reInit", onSelect);
      emblaApi.on("select", onSelect);
      onSelect();
   }, [emblaApi, onSelect]);

   const carousel = themes.map((theme) => {
      const today = format(new Date(), "d MMMM");
      const handleDownload = () => {
         downloadBase64AsJPG(theme.dataUrl, `${theme.theme} ${today}.png`);
      };
      return (
         <div
            key={theme.theme}
            className={cn(
               "flex-shrink-0 px-4 text-center text-white text-xl rounded-lg mx-2 w-full"
            )}
         >
            <div className="flex flex-col grow items-center mx-10">
               <div className="flex flex-col h-fit mb-6 lg:mb-4 xl:mb-6 md:h-fit">
                  <p className="font-headline xl:text-[30px]">{theme.theme}</p>
                  <p className="font-headline opacity-30 h-[30px]">
                     {!theme.transparent && "Transparent"}
                  </p>
               </div>
               <div
                  className={cn(
                     "relative",
                     "w-[280px] h-[280px]",
                     "sm:w-[400px] sm:h-[400px]",
                     "md:w-[480px] md:h-[480px]",
                     "lg:w-[300px] lg:h-[300px]",
                     "xl:w-[400px] xl:h-[400px]"
                  )}
               >
                  <Image
                     src={theme.dataUrl}
                     alt=""
                     fill
                     className="object-contain"
                  />
               </div>
               <div
                  className="flex gap-1 items-center py-1 pl-2 pr-4 mt-8 cursor-pointer hover:opacity-50 border rounded-full"
                  onClick={handleDownload}
               >
                  <Download className="size-5" />
                  <span className="text-[15px]">Download</span>
               </div>
            </div>
         </div>
      );
   });

   return (
      <div className="w-full  h-fit flex flex-col items-center justify-center">
         <p className="font-headline text-[20px] font-bold">THEME</p>
         <div
            className={cn("relative w-full h-auto", "md:h-fit", "xl:h-[600px]")}
         >
            <div className="overflow-hidden h-full" ref={emblaRef}>
               <div className="flex h-full">{carousel}</div>
            </div>

            <button
               onClick={scrollPrev}
               disabled={!canScrollPrev}
               className="absolute left-0 md:left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white md:p-2 p-1 rounded disabled:opacity-30 z-10"
            >
               <NavArrowLeft />
            </button>
            <button
               onClick={scrollNext}
               disabled={!canScrollNext}
               className="absolute right-0 md:right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white md:p-2 p-1 rounded disabled:opacity-30 z-10"
            >
               <NavArrowRight />
            </button>
         </div>
      </div>
   );
}

export const ExportPageBreadCrumb = ({
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
               <BreadcrumbLink href={`/dashboard/runs/${runData.id}`}>
                  {runData.title}
               </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
               <BreadcrumbPage>Export</BreadcrumbPage>
            </BreadcrumbItem>
         </BreadcrumbList>
      </Breadcrumb>
   );
};

export default ExportPageContent;
