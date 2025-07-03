"use client";

import React, { useCallback, useEffect, useState } from "react";

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

const ExportPageContent = ({ runData }: { runData: RunFindOneResponse }) => {
   return (
      <div className="flex flex-col text-primary w-full h-full">
         <ExportPageBreadCrumb runData={runData} />
         <EmblaCarousel />
      </div>
   );
};

export function EmblaCarousel() {
   const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
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
      <div className="relative">
         <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
               <div className="min-w-full flex-shrink-0 px-4 py-6 bg-red-300 text-center text-white text-xl">
                  Slide 1
               </div>
               <div className="min-w-full flex-shrink-0 px-4 py-6 bg-green-300 text-center text-white text-xl">
                  Slide 2
               </div>
               <div className="min-w-full flex-shrink-0 px-4 py-6 bg-blue-300 text-center text-white text-xl">
                  Slide 3
               </div>
            </div>
         </div>

         <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded disabled:opacity-30"
         >
            <NavArrowLeft />
         </button>
         <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded disabled:opacity-30"
         >
            <NavArrowRight />
         </button>
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
