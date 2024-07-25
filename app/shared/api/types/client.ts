export type EducationGrade =
  | "Schoolboy"
  | "CollegeStudent"
  | "Bachelor"
  | "Master"
  | "GraduateStudent";

export type ExamGrade = "TOEFL" | "IELTS" | "SAT" | "GMAT" | "GRE" | "Other";

export interface ClientEducation {
  id: number;
  educationalInstitution: string;
  specialization: string;
  country: string;
  grade: EducationGrade;
  classNumber: number;
  yearOfCompletion: number;
  gpa: string;
  completionMarker: boolean;
}
