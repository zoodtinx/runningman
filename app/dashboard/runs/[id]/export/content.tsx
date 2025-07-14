"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

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
import { NavArrowLeft, NavArrowRight } from "iconoir-react";
import { toPng } from "html-to-image";

const ExportPageContent = ({ runData }: { runData: RunFindOneResponse }) => {
   return (
      <div className="flex flex-col text-primary w-full h-full">
         <ExportPageBreadCrumb runData={runData} />
         <EmblaCarousel />
      </div>
   );
};

export function EmblaCarousel() {
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

   return (
      <div className="w-full h-full flex flex-col items-center justify-center">
         <p className="font-headline text-[20px] font-bold">THEME</p>
         <div className="relative w-full h-[600]">
            <div className="overflow-hidden h-full px-4" ref={emblaRef}>
               <div className="flex h-full">
                  <div className="w-[70%] flex-shrink-0 px-4 text-center text-white text-xl rounded-lg shadow-lg mx-2">
                     <div className="flex flex-col grow items-center">
                        <p className="font-headline text-[30px]">
                           Sunrise Sprint
                        </p>
                        <div className="w-[400px] h-[400px] bg-zinc-900 mt-7"></div>
                     </div>
                  </div>
                  <div className="w-[80%] flex-shrink-0 px-4 text-center text-white text-xl rounded-lg shadow-lg mx-2">
                     <div className="flex flex-col grow items-center">
                        <p className="font-headline text-[30px]">
                           Personal Best
                        </p>
                        <div className="w-[400px] h-[400px] bg-zinc-900 mt-7"></div>
                     </div>
                  </div>
                  <div className="w-[80%] flex-shrink-0 px-4 text-center text-white text-xl rounded-lg shadow-lg mx-2">
                     <div className="flex flex-col grow items-center">
                        <p className="font-headline text-[30px]">Grand Run</p>
                        <div className="w-[400px] h-[400px] bg-zinc-900 mt-7"></div>
                     </div>
                  </div>
               </div>
            </div>

            <button
               onClick={scrollPrev}
               disabled={!canScrollPrev}
               className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded disabled:opacity-30 z-10"
            >
               <NavArrowLeft />
            </button>
            <button
               onClick={scrollNext}
               disabled={!canScrollNext}
               className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded disabled:opacity-30 z-10"
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

export const SampleExportCard = () => {
   // Create mock runStats data
   const stats = {
      date: "2024-06-10",
      distance: 10.5,
      duration: 52,
      pace: "4:57",
      calories: 650,
   };

   const cardRef = useRef(null);

   const handleExport = async () => {
      if (!cardRef.current) return;
      try {
         const dataUrl = await toPng(cardRef.current);
         const link = document.createElement("a");
         link.download = "run-stat-card.png";
         link.href = dataUrl;
         link.click();
      } catch (error) {
         console.error("Export failed:", error);
      }
   };

   return (
      <div>
         <div ref={cardRef} className="w-[580px] h-[580px] bg-amber-100 grow-0">
            <h2>Run Stats - {stats.date}</h2>
            <p>Distance: {stats.distance} km</p>
            <p>Duration: {stats.duration} mins</p>
            <p>Pace: {stats.pace} min/km</p>
            <p>Calories: {stats.calories}</p>
         </div>
         <button onClick={handleExport} style={{ marginTop: 12 }}>
            Export as PNG
         </button>
      </div>
   );
};

export default ExportPageContent;
