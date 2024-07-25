import { Meta } from "./mainTypesResponse";
import { RoleType } from "./user";

interface TargetCountryType {
  id: number;
  country: string;
}
export interface ClientItem {
  id: 16;
  fullName: string;
  imageUrl: string;
  chanceOfScholarship: number;
  targetDetailsTypeOfService: string;
  targetDetailsStartDate: number;
  targetDetailsEndDate: number;
  targetDetailsYear: number;
  targetCountry: TargetCountryType[];
  curator: {
    id: number;
    firstName: string;
    lastName: string;
    imageUrl: string;
  };
  typeOfClient: string;
  numberOfUniversities: number;
  numberOfTopUniversities: number;
  targetDetailsPersonDegree: string;
  targetDetailsProgram: string;
  cwsCompleted: number;
  cwsTotal: number;
  redStage: null;
  orangeStage: null;
  citizenship: null;
}

export type ResponseClientList = Meta<ClientItem[]>;
