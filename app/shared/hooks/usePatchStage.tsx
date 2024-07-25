import { useState } from "react";
import axios from "axios";
import { getCookie } from "@api/baseFetch";

interface PatchStageProps {
  stageId: number;
  status?: string;
  deadline?: number;
  visibilityToTheClient?: boolean;
  externalDescription?: string;
  internalDescription?: string;
  name?: string;
}

export function usePatchStage() {
  const [loading, setLoading] = useState(false);

  const patchStage = async ({
    stageId,
    status,
    deadline,
    visibilityToTheClient,
    externalDescription,
    internalDescription,
    name,
  }: PatchStageProps) => {
    setLoading(true);
    try {
      const response = await axios.patch(
        "/api/workflow/stage",
        {
          stageId,
          status,
          deadline,
          visibilityToTheClient,
          externalDescription,
          internalDescription,
          name,
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
    patchStage,
  };
}
