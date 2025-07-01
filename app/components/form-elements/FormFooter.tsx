import { Plus, Xmark } from "iconoir-react";
import React from "react";

export const FormFooter = () => {
   return (
      <div className="flex justify-between h-fit bg-background">
         <button className="flex gap-1 items-center font-headline font-bold text-[15px] p-2">
            <Xmark className="size-5" />
            DISCARD
         </button>
         <button className="flex gap-1 items-center font-headline font-bold text-[15px] p-2">
            SUBMIT
            <Plus className="size-5" />
         </button>
      </div>
   );
};
