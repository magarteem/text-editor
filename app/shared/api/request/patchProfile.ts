import { getCookie } from "@api/index";
import axios from "axios";
import {
  InternalInfoCandidateClassification,
  TargetDetailsPersonDegree,
  TargetDetailsTypeOfService,
} from "../types/profile";
import { number } from "zod";

export interface PatchProfileRequest {
  id: number;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  birthday?: number;
  emailAddress?: string;
  telegramId?: string;
  imageUrl?: string;
  notificationToEmail?: boolean;
  countryOfResidence?: { label: string; value: number; id?: number };
  cityOfResidence?: string;
  citizenship?: { label: string; value: number; id?: number };
  targetDetailsCountryForAdmission?: any;
  targetDetailsYear?: number;
  targetDetailsTypeOfService?: TargetDetailsTypeOfService;
  targetDetailsNumberOfUniversities?: number;
  targetDetailsNumberOfTopUniversities?: number;
  targetDetailsPersonDegree?: TargetDetailsPersonDegree;
  targetDetailsProgram?: string;
  targetDetailsUniversity?: string[];
  targetDetailsStartDate?: number;
  targetDetailsEndDate?: number;
  internalInfoCandidateClassification?: InternalInfoCandidateClassification;
  durationOfCallsSpent?: number;
  durationOfCallsPlanned?: number;
  caseStatusChanceOfScholarship?: number;
}

export const patchProfile = async (data: PatchProfileRequest) => {
  try {
    const response = await axios.patch("/api/user/profile", data, {
      headers: {
        Authorization: `Bearer ${getCookie("jwt")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
