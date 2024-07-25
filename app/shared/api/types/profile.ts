import { ExamGrade } from "@api/index";

export type TargetDetailsTypeOfService =
  | "FullSupport"
  | "Mentoring"
  | "PersonalBrand";
export type TargetDetailsPersonDegree =
  | "Bachelor"
  | "Master"
  | "GraduateStudent";
export type InternalInfoCandidateClassification =
  | "Strong"
  | "Weak"
  | "Questionable";

export interface CaseStatusProgress {
  completed: number;
  total: number;
}

export interface Author {
  id: number;
  description: string;
  firstName: string;
  lastName: string;
}

export interface LatestDocument {
  id: number;
  originalName: string;
  mimeType: string;
  created: number;
  author: Author;
}

export interface ExamDetails {
  id: number;
  grade: ExamGrade;
  result: string;
  examDay: number;
}
