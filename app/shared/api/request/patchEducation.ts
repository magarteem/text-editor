import { getCookie } from "@api/index";
import axios from "axios";

export interface PatchEducationRequest {
   id: number;
    educationalInstitution: string;
    specialization: string;
    countryId: number;
    grade: string;
    classNumber: number; 
    yearOfCompletion: number;
  gpa: string
  completionMarker: boolean;
}

export const patchEducations = async (data: any) => {
  try {
    const response = await axios.post("/api/user/profile/education", data, {
      headers: {
        Authorization: `Bearer ${getCookie("jwt")}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

