"use client";

import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";

import { ControlledInput } from "@/components/primitives/InputWithLabel";
import { ControlledSelect } from "@/components/primitives/SelectWithLabel";
import { Button } from "@/components/primitives/Button";

import {
   ConditionPriority,
   EditUserDto,
   User,
} from "@/lib/zod/user.zod.schema";
import { editUser, deleteUser } from "@/dashboard/settings/actions";
import Loader from "@/components/icons/Loader";
import DragBoard, {
   DragBoardProps,
} from "@/dashboard/settings/components/DNDBox";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Check } from "iconoir-react";

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
   const [success, setSuccess] = useState(false);
   const [deleteStep, setDeleteStep] = useState(0);
   const [deleteLoading, setDeleteLoading] = useState(false);

   const [conditionPriority, setConditionPriority] =
      useState<ConditionPriority>(
         userData.conditionPriority as ConditionPriority
      );

   const onSubmit = async (data: EditUserDto) => {
      const parsedData: EditUserDto = {
         ...data,
         age: data.age !== undefined ? Number(data.age) : undefined,
         height: data.height !== undefined ? Number(data.height) : undefined,
         weight: data.weight !== undefined ? Number(data.weight) : undefined,
         conditionPriority: conditionPriority,
      };

      setLoading(true);
      try {
         console.log(parsedData);
         await editUser(userData.id, parsedData);
         setSuccess(true);
         setTimeout(() => setSuccess(false), 2000);
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
         } finally {
            setDeleteLoading(false);
            setDeleteStep(0);
         }
      }
   };

   const handleSignout = (e: React.MouseEvent) => {
      e.preventDefault();
      console.log("signed out");
      signOut();
   };

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className={cn(
            "flex flex-col justify-start lg:justify-between h-full overflow-y-auto md:overflow-hidden",
            "pb-[200px] pt-1 lg:pt-0 lg:pb-0"
         )}
      >
         <div className="flex flex-col px-2 lg:px-[10px]">
            <p className="text-[23px] font-semibold pb-2">User Profile</p>
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
            <div className="pt-7 lg:pt-10">
               <p className="text-[23px] font-semibold pb-2">
                  Run Condition Priority
               </p>
               <HydrationSafeBoard
                  itemLocation={conditionPriority}
                  setItemLocation={setConditionPriority}
               />
            </div>
         </div>
         <div className="flex justify-between px-2 lg:px-0 pt-7 lg:pt-0 items-start">
            <div className="flex flex-col lg:flex-row items-start xl:items-center gap-2">
               <Button
                  className="border w-[90px]"
                  disabled={loading}
                  onClick={handleSignout}
               >
                  Sign Out
               </Button>
               <button
                  className="text-secondary text-sm lg:text-base px-0 lg:px-2 cursor-pointer"
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
               <Check
                  className={cn(
                     "text-green-500 transition-opacity duration-300",
                     success && !loading ? "opacity-100" : "opacity-0"
                  )}
               />
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

const HydrationSafeBoard = ({
   itemLocation,
   setItemLocation,
}: DragBoardProps) => {
   const [hydrated, setHydrated] = useState(false);

   useEffect(() => {
      setHydrated(true);
   }, []);

   if (!hydrated) return null;

   return (
      <DragBoard
         itemLocation={itemLocation}
         setItemLocation={setItemLocation}
      />
   );
};

const genderOptions = [
   { value: "male", label: "Male" },
   { value: "female", label: "Female" },
   { value: "other", label: "Other" },
];

export default SettingsPageContent;
