"use client";

import { Run } from "@prisma/client";
import ReactDOM from "react-dom/client";
import { toPng } from "html-to-image";
import {
   MorningRun,
   Dopaminization,
   FlowState,
   FlyingSprint,
   Zone4,
} from "@/dashboard/runs/[id]/export/helpers/export-cards/Templates";
import React from "react";

const themes = [
   "morningRun",
   "flowState",
   "dopaminization",
   "zone4",
   "flyingSprint",
] as const;

async function renderTheme(theme: (typeof themes)[number], runData: Run) {
   const holder = document.createElement("div");
   holder.style.position = "fixed";
   holder.style.top = "-9999px";
   document.body.appendChild(holder);

   const root = ReactDOM.createRoot(holder);

   // Render the selected component
   const component = (() => {
      switch (theme) {
         case "morningRun":
            return <MorningRun runData={runData} />;
         case "flowState":
            return <FlowState runData={runData} />;
         case "dopaminization":
            return <Dopaminization runData={runData} />;
         case "zone4":
            return <Zone4 runData={runData} />;
         case "flyingSprint":
            return <FlyingSprint runData={runData} />;
         default:
            return <MorningRun runData={runData} />;
      }
   })();

   root.render(component);

   // Wait until the DOM node exists
   await new Promise<void>((resolve) => {
      const check = () => {
         if (holder.firstElementChild) resolve();
         else requestAnimationFrame(check);
      };
      check();
   });

   await document.fonts.ready;

   const png = await toPng(holder.firstElementChild as HTMLElement, {
      quality: 0.92,
      pixelRatio: 1,
      backgroundColor: "",
   });

   root.unmount();
   holder.remove();

   return png;
}

export async function exportRunCards(runData: Run) {
   if (!runData) {
      return;
   }

   const themeNames = {
      morningRun: "Morning Run",
      flowState: "Flow State",
      dopaminization: "Dopaminization",
      zone4: "Zone 4",
      flyingSprint: "Flying Sprint",
   } as const;

   const transparentTheme = ["flowState", "zone4", "flyingSprint"];

   return Promise.all(
      themes.map(async (key) => ({
         key,
         theme: themeNames[key],
         dataUrl: await renderTheme(key, runData),
         transparent: transparentTheme.includes(key),
      }))
   );
}

export const downloadBase64AsJPG = (base64: string, filename = "image.jpg") => {
   const link = document.createElement("a");
   link.href = base64;
   link.download = filename;
   link.click();
};
