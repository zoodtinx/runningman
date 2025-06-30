import { Input } from "@/components/primitives/Input";
import React from "react";

const RunsPage = () => {
   return (
      <div className="px-6 flex flex-col gap-5">
         <Input label="Name" unit="CM" variant="md" className="font-bold" />
         <Input label="Name" unit="CM" variant="base" />
      </div>
   );
};

export default RunsPage;
