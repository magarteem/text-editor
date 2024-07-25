import axios from "axios";
import { useState } from "react";
import { getCookie } from "@api/baseFetch";

interface RemoveTaskProps {
  taskId: number;
}

export function useRemoveTask() {
  const [loading, setLoading] = useState(false);

  const removeTask = async ({ taskId }: RemoveTaskProps) => {
    setLoading(true);
    try {
      const response = await axios.delete("/api/workflow/task", {
        params: { taskId },
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
    removeTask,
  };
}
