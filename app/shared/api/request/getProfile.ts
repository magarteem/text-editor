import { makeQueries } from "../../helpers/makeQueries";
import {
  baseFetch,
  CaseStatusProgress,
  ExamDetails,
  InternalInfoCandidateClassification,
  LatestDocument,
  TargetDetailsPersonDegree,
  TargetDetailsTypeOfService,
  ClientEducation,
} from "@api/index";
import { RoleType } from "../types/user";

interface University {
  university: string;
  top: boolean;
}

interface Country {
  country: string;
}

export interface GetProfileResponse {
  id: number;
  firstName: string;
  lastName: string;
  birthday?: number;
  imageUrl: string;
  emailAddress: string;
  telegramId?: string;
  cityOfResidence?: string;
  notificationToEmail: boolean;
  targetDetailsCountryForAdmission: Country[];
  targetDetailsYear?: number;
  targetDetailsTypeOfService?: TargetDetailsTypeOfService;
  targetDetailsNumberOfUniversities?: number;
  targetDetailsNumberOfTopUniversities?: number;
  targetDetailsPersonDegree?: TargetDetailsPersonDegree;
  targetDetailsProgram?: string;
  targetDetailsUniversity: University[];
  targetDetailsStartDate: number;
  targetDetailsEndDate: number;
  internalInfoCandidateClassification: InternalInfoCandidateClassification;
  durationOfCallsSpent?: number;
  durationOfCallsPlanned?: number;
  latestDocuments: LatestDocument[];
  caseStatusChanceOfScholarship?: number;
  caseStatusProgress: CaseStatusProgress;
  educationDetails: ClientEducation[];
  examDetails: ExamDetails[];
  countryOfResidence: { id: number; country: string };
  citizenship: { id: number; country: string };
  roleType: RoleType;
  curator?: {
    id: number;
    aboutMe: string;
    imageUrl: string;
    firstName: string;
    lastName: string;
  };
}

interface GetProfileRequest {
  userUid?: string;
  userId?: string;
}
export const getProfile = async (
  params: GetProfileRequest,
  signal?: AbortSignal
): Promise<GetProfileResponse> => {
  const queries = makeQueries(params);

  return baseFetch(`/api/user/profile${queries}`, { signal, method: "GET" });
};
