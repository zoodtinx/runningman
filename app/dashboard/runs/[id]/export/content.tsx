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
import { exportRunCards } from "@/dashboard/runs/[id]/export/utils";
import { Run } from "@prisma/client";
import Image from "next/image";

const ExportPageContent = ({ runData }: { runData: Run }) => {
   const [themeData, setThemeData] = useState<
      {
         theme: string;
         dataUrl: string;
         transparent: boolean;
      }[]
   >([]);
   // make it an object

   useEffect(() => {
      (async () => {
         const result = await exportRunCards(runData);
         setThemeData(result ?? []);
      })();
   }, [runData]);

   return (
      <div className="flex flex-col text-primary w-full h-full">
         <ExportPageBreadCrumb runData={runData} />
         <EmblaCarousel themes={themeData} />
         {/* {urlString && (
            <Image
               src={urlString}
               alt="Exported Run Card"
               width={500}
               height={500}
            />
         )}
         <button
            onClick={handleDownload}
            className="text-primary cursor-pointer"
         >
            Download
         </button> */}
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
   const [canScrollPrev, setCanScrollPrev] = useState(false);
   const [canScrollNext, setCanScrollNext] = useState(false);

   const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
   const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

   const onSelect = useCallback(() => {
      if (!emblaApi) return;
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
   }, [emblaApi]);

   useEffect(() => {
      if (!emblaApi) return;
      onSelect();
      emblaApi.on("select", onSelect);
   }, [emblaApi, onSelect]);

   const carousel = themes.map((theme) => {
      return (
         <div
            key={theme.theme}
            className="w-[400px] md:w-[70%] flex-shrink-0 px-4 text-center text-white text-xl rounded-lg  mx-2"
         >
            <div className="flex flex-col grow items-center">
               <div className="flex flex-col h-[90px]">
                  <p className="font-headline text-[30px]">{theme.theme}</p>
                  {theme.transparent && (
                     <p className="text-[18px] opacity-40">Transparent</p>
                  )}
               </div>
               <Image
                  src={theme.dataUrl}
                  width={50}
                  height={50}
                  alt=""
                  className="w-[280px] h-[280px] md:w-[400px] md:h-[400px]"
               />
               {/* <div className="w-[280px] h-[280px] md:w-[400px] md:h-[400px] bg-zinc-900 mt-7"></div> */}
               <Download className="mt-5" />
            </div>
         </div>
      );
   });

   return (
      <div className="w-full h-full flex flex-col items-center justify-center">
         <p className="font-headline text-[20px] font-bold">THEME</p>
         <div className="relative w-full h-fit md:h-[600px]">
            <div
               className="overflow-hidden h-full px-4 pb-[70px]"
               ref={emblaRef}
            >
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
