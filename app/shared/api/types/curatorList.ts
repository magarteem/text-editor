import { Meta } from "./mainTypesResponse";
import { RoleType } from "./user";

export interface CuratorItem {
  id: number;
  firstName: string;
  lastName: string;
  imageUrl: string;
  email: string;
  aboutMe: string;
  role: RoleType;
}

export type ResponseCuratorList = Meta<CuratorItem[]>;
