"use client";

import { useEffect } from "react";

export default function DashboardError({
   error,
   reset,
}: {
   error: Error;
   reset: () => void;
}) {
   useEffect(() => {
      console.error(error);
   }, [error]);

   return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
         <h1 className="text-3xl font-bold">Something went wrong</h1>
         <p className="mt-4 text-gray-600">{error.message}</p>
         <button
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => reset()}
         >
            Try again
         </button>
      </div>
   );
}
