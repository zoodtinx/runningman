"use client";
import React from "react";
import { format } from "date-fns";

export const ConditionDate = ({ date }: { date?: string }) => {
   const mockDate = "2024-06-01T10:30:00.000Z";
   const dateToFormat = date ?? mockDate;
   const formattedDate = format(dateToFormat, "h:mm a, d MMM").toUpperCase();
   return <span>{formattedDate}</span>;
};
