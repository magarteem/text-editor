import { getCookie } from "@api/index";
import axios from "axios";

export interface PatchExamRequest {
    id: number;
    grade: string;
    result: string;
    examDay: number;
}

export const patchExams = async (data: PatchExamRequest[]) => {
  try {
    const response = await axios.post("/api/user/profile/exam", data, {
      headers: {
        Authorization: `Bearer ${getCookie("jwt")}`
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

