import { PatchProfileRequest } from "@api/index";

export type FormState = Pick<
  PatchProfileRequest,
  | "targetDetailsStartDate"
  | "targetDetailsEndDate"
  | "targetDetailsCountryForAdmission"
  | "targetDetailsTypeOfService"
  | "targetDetailsPersonDegree"
  | "targetDetailsNumberOfTopUniversities"
  | "targetDetailsYear"
  | "targetDetailsProgram"
  | "targetDetailsNumberOfUniversities"
  
>;
