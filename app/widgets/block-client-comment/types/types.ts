import { RoleType } from "@/app/shared";

export interface CommentType {
  id: number;
  created: number;
  updated: number;
  text: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    imageUrl: string;
    role: RoleType;
  };
}

export interface ReSponseCommentsType {
  data: {
    items: CommentType[];
    page: number;
    totalItems: number;
    totalPages: number;
    itemsPerPage: number;
  };
}

export interface RequestSentNewComment {
  fileId?: string;
  stageId?: string;
  text: string;
}
export interface RequestUpdateNewComment {
  commentId: number;
  text: string;
}
