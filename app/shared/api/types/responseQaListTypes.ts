import {
  ReviewPriorityType,
  StatusDocument,
  TypeSelectorType,
} from "@/app/[locale]/docs/table/types/typeOfDocument";
import { Meta } from "./mainTypesResponse";

interface Client {
  id: number;
  firstName: string;
  lastName: string;
  imageUrl: string;
  candidateClassification: string;
  typeOfService: string;
  candidate_classification: string;
  type_of_service: string;
  person_degree: string;
  details_year: number;
  details_program: string;
  targetDetailsCountry: Country[];
}
interface Country {
  id: number;
  country: string;
}
interface User {
  description?: string;
  id: number;
  firstName: string;
  lastName: string;
  imageUrl?: string;
}

export interface QaListTypes {
  id: number;
  client: Client;
  typeOfDocument: TypeSelectorType;
  author: User;
  checkingStrategist: User;
  checkingCurator: User;
  status: StatusDocument;
  reviewPriority: ReviewPriorityType;
  isNew: false;
  inProgressMe: false;
  inProgressOthers: false;
  sendingForQADate: number;
  targetDetailsTypeOfService: string;
}

export type ResponseQaListTypes = Meta<QaListTypes[]>;
