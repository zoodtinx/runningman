import { Plus, Xmark } from "iconoir-react";
import React from "react";

export const FormFooter = ({
   handleDestructive,
}: {
   handleDestructive: () => void;
}) => {
   return (
      <div className="flex justify-between h-fit bg-background text-primary">
         <button
            className="flex gap-1 items-center font-headline font-bold text-[15px] p-2 cursor-pointer"
            onClick={(e) => {
               e.preventDefault();
               e.stopPropagation();
               handleDestructive();
            }}
         >
            <Xmark className="size-5" />
            DISCARD
         </button>
         <button
            type="submit"
            className="flex gap-1 items-center font-headline font-bold text-[15px] p-2 cursor-pointer"
         >
            SUBMIT
            <Plus className="size-5" />
         </button>
      </div>
   );
};
