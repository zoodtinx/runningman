"use client";

import { useForm } from "react-hook-form";

import { ControlledInput } from "@/components/primitives/InputWithLabel";
import { ControlledSelect } from "@/components/primitives/SelectWithLabel";
import { Button } from "@/components/primitives/Button";

import { NavArrowLeft } from "iconoir-react";

import { EditUserDto, User } from "@/lib/zod/user.zod.schema";
import { editUser, deleteUser } from "@/dashboard/settings/actions";

const SettingsPageContent = ({ userData }: { userData: User }) => {
   const { handleSubmit, control } = useForm<EditUserDto>({
      defaultValues: userData,
   });

   const onSubmit = (data: EditUserDto) => {
      editUser("mock-user", data);
      console.log(data);
   };

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="flex flex-col justify-between h-full"
      >
         <div className="flex flex-col px-[10px]">
            <ControlledInput
               control={control}
               fieldName="name"
               variant="light"
               label="Name"
               inputSize="md"
            />
            <div className="flex gap-3 pt-4">
               <div className="flex-1">
                  <ControlledSelect
                     control={control}
                     fieldName="gender"
                     variant="light"
                     label="Gender"
                     options={genderOptions}
                  />
               </div>
               <div className="flex-1">
                  <ControlledInput
                     control={control}
                     fieldName="age"
                     variant="light"
                     label="Age"
                     mode="number"
                  />
               </div>
            </div>
            <div className="flex gap-3 pt-4">
               <div className="flex-1">
                  <ControlledInput
                     control={control}
                     fieldName="height"
                     variant="light"
                     label="Height"
                     unit="cm"
                  />
               </div>
               <div className="flex-1">
                  <ControlledInput
                     control={control}
                     fieldName="weight"
                     variant="light"
                     label="Weight"
                     unit="cm"
                  />
               </div>
            </div>
         </div>
         <div className="flex justify-between">
            <div className="flex items-center gap-2">
               <button className="text-secondary px-2" type="button">
                  Delete Account
               </button>
            </div>
            <div className="flex items-center gap-2">
               <Button className="border w-[90px]" type="submit">
                  Save
               </Button>
            </div>
         </div>
      </form>
   );
};

const genderOptions = [
   { value: "male", label: "Male" },
   { value: "female", label: "Female" },
   { value: "other", label: "Other" },
];

export default SettingsPageContent;
