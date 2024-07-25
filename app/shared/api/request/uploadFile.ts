import { getCookie } from "@api/index";
import axios from "axios";
import {
  InternalInfoCandidateClassification,
  TargetDetailsPersonDegree,
  TargetDetailsTypeOfService,
} from "../types/profile";

export interface IUploadFile {
    fileId: number;
    text: string;
}

export const uploadFile = async (data: IUploadFile) => {
  try {
      const response = await axios.post("/api/comment-storage-file", data, {
          data: {
            fileId: data.fileId, text: data.text
        },
        headers: {
        Authorization: `Bearer ${getCookie("jwt")}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

