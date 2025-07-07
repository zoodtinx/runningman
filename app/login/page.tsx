"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/primitives/Button";

const page = () => {
   return (
      <div className="w-full h-screen flex justify-center items-center">
         <Button className="p-2 px-3 border" onClick={() => signIn("google")}>
            Sign In
         </Button>
      </div>
   );
};

export default page;
