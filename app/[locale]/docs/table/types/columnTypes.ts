import {
  CandidateClassificationType,
  TypeSelectorType,
} from "./typeOfDocument";

interface IPersonTable {
  id: number;
  firstName: string;
  lastName: string;
  photo: string;
}

interface ITermTable {
  orangeStage: Record<string, number>;
  redStage: Record<string, number>;
}

export interface IClientTableColumns {
  id?: number;
  client: IPersonTable;
  type: string;
  degree: string;
  typeOfService: string;
  curator: IPersonTable;
  terms: ITermTable;
  progress: Record<string, number>;
  chances: number;
  program: number;
  universities: Record<string, string>;
  periodOfСooperation: Record<string, number>;
  //
  typeOfDocument: TypeSelectorType;
  candidateClassification: CandidateClassificationType;
}
