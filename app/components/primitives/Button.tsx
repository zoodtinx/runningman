import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
   "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 outline outline-1 outline-foreground text-primary bg-transparent hover:text-black",
   {
      variants: {
         variant: {
            primary: "hover:bg-primary",
            secondary: "hover:bg-secondary",
            background: "hover:bg-background",
         },
         size: {
            default: "h-8 px-4 py-2 has-[>svg]:px-3",
            sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
            lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
            icon: "size-9",
         },
      },
      defaultVariants: {
         variant: "primary",
         size: "default",
      },
   }
);

function Button({
   className,
   variant,
   size,
   asChild = false,
   ...props
}: React.ComponentProps<"button"> &
   VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
   }) {
   const Comp = asChild ? Slot : "button";

   return (
      <Comp
         data-slot="button"
         className={cn(buttonVariants({ variant, size }), className)}
         {...props}
      />
   );
}

export { Button, buttonVariants };
