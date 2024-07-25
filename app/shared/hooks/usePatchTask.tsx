import { useState } from "react";
import axios from "axios";
import { getCookie } from "@api/baseFetch";

interface PatchTaskProps {
  id: number;
  shortDescription?: string;
  deadline?: number;
  completenessMarker?: boolean;
}

export function usePatchTask() {
  const [loading, setLoading] = useState(false);

  const patchTask = async ({
    id,
    shortDescription,
    deadline,
    completenessMarker,
  }: PatchTaskProps) => {
    setLoading(true);
    try {
      const response = await axios.patch(
        "/api/workflow/task",
        {
          id,
          shortDescription,
          deadline,
          completenessMarker,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie("jwt")}`,
          },
        }
      );

      return response;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    patchTask,
  };
}
