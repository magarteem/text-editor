import { useRef } from "react";
import { getCookie } from "../api";
import axios from "axios";

interface ICreateTask {
  stageId: number;
  deadline: number;
  shortDescription: string;
}

export function useCreateTask() {
  const loadingCreate = useRef(false);
  const createTask = async ({
    stageId,
    deadline,
    shortDescription,
  }: ICreateTask) => {
    try {
      loadingCreate.current = true;
      const response = await axios.post(
        `/api/workflow/task`,
        {
          stageId,
          deadline,
          shortDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie("jwt")}`,
          },
        }
      );
      loadingCreate.current = false;
      return response.data;
    } catch (error: any) {
      loadingCreate.current = false;
      return error.code;
    }
  };

  return {
    createTask,
    loadingCreate,
  };
}
