"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

import { ControlledInput } from "@/components/primitives/InputWithLabel";
import { ControlledSelect } from "@/components/primitives/SelectWithLabel";
import { Button } from "@/components/primitives/Button";

// import { NavArrowLeft } from "iconoir-react";

import { EditUserDto, User } from "@/lib/zod/user.zod.schema";
import { editUser, deleteUser } from "@/dashboard/settings/actions";
import Loader from "@/components/icons/Loader";

const deleteButtonTexts = [
   "Delete Account",
   "Are you sure?",
   "Click again to confirm",
];

const SettingsPageContent = ({ userData }: { userData: User }) => {
   const { handleSubmit, control } = useForm<EditUserDto>({
      defaultValues: userData,
   });

   const [loading, setLoading] = useState(false);
   const [deleteStep, setDeleteStep] = useState(0);
   const [deleteLoading, setDeleteLoading] = useState(false);

   const onSubmit = async (data: EditUserDto) => {
      // Convert age, height, and weight to numbers before submitting
      const parsedData = {
         ...data,
         age: data.age !== undefined ? Number(data.age) : undefined,
         height: data.height !== undefined ? Number(data.height) : undefined,
         weight: data.weight !== undefined ? Number(data.weight) : undefined,
      };

      setLoading(true);
      try {
         console.log(parsedData);
         await editUser(userData.id, parsedData);
      } finally {
         setLoading(false);
      }
   };

   const handleDeleteClick = async () => {
      if (deleteStep < 2) {
         setDeleteStep((prev) => prev + 1);
      } else {
         setDeleteLoading(true);
         try {
            await deleteUser("mock-user");
            // Optionally, redirect or show a message here
         } finally {
            setDeleteLoading(false);
            setDeleteStep(0);
         }
      }
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
                     placeholder="Select Gender"
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
                     unit="y/o"
                     placeholder="Enter Age"
                     className="placeholder:text-secondary"
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
                     placeholder="Enter Height"
                     className="placeholder:text-secondary"
                  />
               </div>
               <div className="flex-1">
                  <ControlledInput
                     control={control}
                     fieldName="weight"
                     variant="light"
                     label="Weight"
                     unit="kg"
                     placeholder="Enter Height"
                     className="placeholder:text-secondary"
                  />
               </div>
            </div>
         </div>
         <div className="flex justify-between">
            <div className="flex items-center gap-2">
               <button
                  className="text-secondary px-2 cursor-pointer"
                  type="button"
                  onClick={handleDeleteClick}
                  disabled={deleteLoading}
               >
                  {deleteLoading ? (
                     <span className="flex items-center gap-1">
                        <Loader className="animate-spin w-4 h-4" />
                        Deleting...
                     </span>
                  ) : (
                     deleteButtonTexts[deleteStep]
                  )}
               </button>
            </div>
            <div className="flex items-center gap-2">
               {loading && <Loader className="animate-spin" />}
               <Button
                  className="border w-[90px]"
                  type="submit"
                  disabled={loading}
               >
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
