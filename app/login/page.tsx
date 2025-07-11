"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/primitives/Button";
import RunningManLogo from "@/components/icons/RunningManLogo";
import { NavArrowRight } from "iconoir-react";
import { cn } from "@/lib/utils";

const page = () => {
   return (
      <div className="w-full h-screen flex justify-center items-center bg-theme-speed text-background">
         <div className="flex flex-col items-center gap-2">
            <RunningManLogo className="" />
            <p className="text-center font-headline text-[50px] w-[500px] leading-13">
               It&apos;s either good or great to run.
            </p>
            <div className="flex flex-col items-center gap-2 pt-5">
               <div className="flex items-center text-md font-medium cursor-pointer group">
                  <span>Explore Features</span>
                  <NavArrowRight className="group-hover:animate-shake" />
               </div>
               <button
                  className={cn(
                     "py-1 px-4 bg-background w-fit text-primary rounded-xl font-semibold uppercase font-headline text-[15px]",
                     "cursor-pointer transition-colors hover:bg-foreground"
                  )}
                  onClick={() => signIn("credentials")}
               >
                  Experience Demo
               </button>
               <button
                  className={cn(
                     "py-1 px-4 bg-background w-fit text-primary rounded-xl font-semibold uppercase font-headline text-[15px]",
                     "cursor-pointer transition-colors hover:bg-foreground"
                  )}
                  onClick={() => signIn("google")}
               >
                  Sign in with Google
               </button>
            </div>
         </div>
      </div>
   );
};

export default page;
