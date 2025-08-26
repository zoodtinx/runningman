"use client";

import { useCallback, useEffect, useState } from "react";

import useEmblaCarousel from "embla-carousel-react";

import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from "@/components/primitives/Breadcrumb";
import { RunFindOneResponse } from "@/lib/zod/runs.zod.schema";
import { Download, NavArrowLeft, NavArrowRight } from "iconoir-react";
import {
   downloadBase64AsJPG,
   exportRunCards,
} from "@/dashboard/runs/[id]/export/utils";
import { Run } from "@prisma/client";
import Image from "next/image";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const ExportPageContent = ({ runData }: { runData: Run }) => {
   const [themeData, setThemeData] = useState<
      {
         theme: string;
         dataUrl: string;
         transparent: boolean;
      }[]
   >([]);

   useEffect(() => {
      (async () => {
         const result = await exportRunCards(runData);
         const mockThemes = [
            {
               theme: "",
               dataUrl: "",
               transparent: false,
            },
            {
               theme: " ",
               dataUrl: " ",
               transparent: true,
            },
         ];
         setThemeData(result || mockThemes);
      })();
   }, [runData]);

   return (
      <div className="flex flex-col text-primary w-full h-full">
         <ExportPageBreadCrumb runData={runData} />
         <EmblaCarousel themes={themeData} />
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
      emblaApi.on("init", onSelect); // Embla v7+
      emblaApi.on("reInit", onSelect); // If you're rebuilding embla
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
               "flex-shrink-0 px-4 text-center text-white text-xl rounded-lg mx-2 w-[400px]",
               "md:w-full",
               "lg:w-full"
            )}
         >
            <div className="flex flex-col grow items-center">
               <div className="flex flex-col h-fit mb-6 md:h-fit">
                  <p className="font-headline text-[30px]">{theme.theme}</p>
                  <p className="font-headline opacity-30 h-[30px]">
                     {!theme.transparent && "Transparent"}
                  </p>
               </div>
               <div
                  className={cn(
                     "relative",
                     "w-[280px] h-[300px]",
                     "md:w-[430px] md:h-[430px]",
                     // "lg:w-[460px] lg:h-[460px]",
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
                  className="flex gap-1 items-center py-1 pl-2 pr-4 mt-7 md:mt-10 cursor-pointer hover:opacity-50 border rounded-full"
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
      <div className="w-full lg:w-[620px] h-full flex flex-col items-center justify-center">
         <p className="font-headline text-[20px] font-bold">THEME</p>
         <div
            className={cn("relative w-full h-auto", "md:h-fit", "xl:h-[600px]")}
         >
            <div className="overflow-hidden h-full md:pb-[70px]" ref={emblaRef}>
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
