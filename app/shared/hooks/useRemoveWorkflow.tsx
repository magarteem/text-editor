import axios from "axios";
import { useState } from "react";
import { getCookie } from "@api/baseFetch";

interface RemoveWorkflowProps {
  clientId: number;
}

export function useRemoveWorkflow() {
  const [loading, setLoading] = useState(false);

  const removeWorkflow = async ({ clientId }: RemoveWorkflowProps) => {
    setLoading(true);
    try {
      const response = await axios.delete("/api/workflow/assign", {
        params: { clientId: clientId },
        headers: {
          Authorization: `Bearer ${getCookie("jwt")}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    removeWorkflow,
  };
}
