"use client";

import React from "react";
import { signIn } from "next-auth/react";

const page = () => {
   return (
      <button className="p-2 border" onClick={() => signIn("google")}>
         Sign In
      </button>
   );
};

export default page;
