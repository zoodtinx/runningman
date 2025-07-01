import { Input } from "@/components/primitives/InputWithLabel";

const RunsPage = () => {
   return (
      <div className="px-6 flex flex-col gap-5 justify-between">
         <div className=" flex flex-col gap-5">
            <Input label="Name" unit="CM" variant="2xl" className="font-bold" />
            <Input label="Name" unit="CM" variant="md" className="font-bold" />
            <Input label="Name" unit="CM" variant="base" />
         </div>
      </div>
   );
};

export default RunsPage;
