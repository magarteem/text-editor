import { RoleType } from "@/app/shared";
import { StatusDocument } from "@/app/widgets/block-client-document/types/statusDocument";

type MimeType = "text/plain" | "directory" | "link" | null;

export interface InnerChildren {
  id: number;
  originalName: string;
  created: number;
  visible: boolean;
  mimeType: MimeType;
  children: InnerChildren[];
}
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  imageUrl: string;
  role?: RoleType;
}

export interface ColumnsTypeResponse {
  id: number;
  originalName: string;
  created: number;
  size: number;
  mimeType: MimeType;
  visible: boolean;
  link: string | null;
  status: StatusDocument;
  reviewPriority: "Standard";
  associatedWithTOPUniversity: boolean;
  approvedByStrategist: boolean;
  author: User;
  children: InnerChildren[];
}

export interface ColumnsTypeResponseChildren {
  children: ColumnsTypeResponse[];
}

export interface CreateDirectory {
  ownerId: string;
  name: string;
  parentId: number;
}
