import { useState } from "react";
import axios from "axios";
import { getCookie } from "@api/baseFetch";

interface AssignWorkflowProps {
  workflowId: number;
  clientId: number;
}

export function useAssignWorkflow() {
  const [loading, setLoading] = useState(false);

  const assignWorkflow = async ({
    workflowId,
    clientId,
  }: AssignWorkflowProps) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/workflow/assign",
        { workflowId: workflowId, clientId: clientId },
        {
          params: { workflowId: workflowId, clientId: clientId },
          headers: {
            Authorization: `Bearer ${getCookie("jwt")}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    assignWorkflow,
  };
}
