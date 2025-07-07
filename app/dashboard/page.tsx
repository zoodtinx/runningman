import { redirect } from "next/navigation";

const page = () => {
   redirect("/dashboard/runs");
   return null;
};

export default page;
