import z from "zod";

export const nullableStringField = () =>
   z.preprocess(
      (val) => (val === "" ? null : val),
      z.string().optional().nullable()
   );

export const nullableNumberField = () =>
   z.preprocess(
      (val) => (val === "" ? null : val),
      z.number().optional().nullable()
   );

export const nullableUuidField = () =>
   z.preprocess(
      (val) => (val === "" ? null : val),
      z.string().uuid().optional().nullable()
   );

export const optionalStringField = () =>
   z.preprocess((val) => (val === "" ? undefined : val), z.string().optional());

export const optionalNumberField = () =>
   z.preprocess((val) => (val === "" ? undefined : val), z.number().optional());

export const optionalUuidField = () =>
   z.preprocess(
      (val) => (val === "" ? undefined : val),
      z.string().uuid().optional()
   );

export const stringToNumberField = () =>
   z.preprocess((val) => {
      if (typeof val === "string") {
         if (val.trim() === "") {
            return undefined;
         }
         const num = Number(val);
         if (isNaN(num)) {
            throw new Error(`Value "${val}" is not convertible to number`);
         }
         return num;
      }
      return val;
   }, z.number().optional());
