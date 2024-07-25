import { PatchProfileRequest } from "@api/index";

export type FormState = Pick<
  PatchProfileRequest,
  | "imageUrl"
  | "firstName"
  | "lastName"
  | "birthday"
  | "countryOfResidence"
  | "cityOfResidence"
  | "citizenship"
  | "telegramId"
  | "emailAddress"
  | "internalInfoCandidateClassification"
  | "durationOfCallsSpent"
  | "durationOfCallsPlanned"
  | "avatar"
>;
