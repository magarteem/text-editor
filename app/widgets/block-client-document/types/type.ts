import { RoleType } from "@/app/shared";
import { StatusDocument, TypeSelectorType } from "./statusDocument";
import { CuratorItem } from "@/app/shared/api/types/curatorList";
import { InnerChildren } from "@/app/[locale]/clients/[userId]/tableDocuments/type/columnsType";

type MimeType = "text/plain" | "directory" | "link" | null;

export interface ResponseDocFileData {
  id: number;
  originalName: string;
  created: number;
  startDate: number;
  size: number;
  mimeType: MimeType;
  deleted: boolean;
  visible: boolean;
  link: null | string;
  status: StatusDocument;
  reviewPriority: "Standard";
  associatedWithTOPUniversity: boolean;
  approvedByStrategist: boolean;
  description: string;
  checkingCurator: CuratorItem | null;
  checkingStrategist: CuratorItem | null;
  author: {
    id: number;
    firstName: string;
    lastName: string;
    imageUrl: string;
    role: RoleType;
  };
  typeOfDocument: TypeSelectorType;
  children: InnerChildren[];
}

export interface RequestDocumentFileType {
  id?: number;
  parentId?: number | null;
  fileId?: number;
  originalName?: string;
  link?: string;
  visible?: boolean;
  startDate?: number | null;
  sendingForQADate?: number;
  description?: string | null;
  status?: string;
  typeOfDocument?: TypeSelectorType;
  checkingCuratorId?: number | null;
  checkingStrategistId?: number | null;
}
