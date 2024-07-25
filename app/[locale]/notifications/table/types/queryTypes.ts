import { CuratorItem } from "@/app/shared/api/types/curatorList";
import {
  ReviewPriorityType,
  StatusDocument,
  TypeSelectorType,
} from "./typeOfDocument";

interface ClientType {
  id: number;
  firstName: string;
  lastName: string;
  candidateClassification: "Questionable";
  typeOfService: "PersonalBrand";
}

interface AuthorType {
  id: number;
  firstName: string;
  lastName: string;
}

export interface IResponseItem {
  id: number;
  author: AuthorType;
  checkingCurator: CuratorItem | null;
  checkingStrategist: CuratorItem | null;
  client: ClientType;
  inProgressMe: boolean;
  inProgressOthers: boolean;
  isNew: boolean;
  reviewPriority: ReviewPriorityType;
  sendingForQADate: number;
  status: StatusDocument;
  typeOfDocument: TypeSelectorType;
}
