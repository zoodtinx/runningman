import { redirect } from "next/navigation";

const page = () => {
   redirect("/dashboard/runs");
};

export default page;
