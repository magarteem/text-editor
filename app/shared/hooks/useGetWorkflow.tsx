import { useState } from "react";
import axios from "axios";
import { getCookie } from "@api/baseFetch";
import { IStage } from "@/app/widgets/block-workflow/Workflow-block";

export interface Workflow {
  name: string;
  stages: IStage[] | null;
}

interface UseGetWorkflowProps {
  userId: number;
}

export function useGetWorkflow({ userId }: UseGetWorkflowProps) {
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [flag, setFlag] = useState<boolean>(false);

  const fetchWorkflow = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/workflow", {
        params: { clientId: userId },
        headers: {
          Authorization: `Bearer ${getCookie("jwt")}`,
        },
      });
      setWorkflow(response.data);
    } catch (error) {
      setWorkflow(null);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const setWorkflowHandler = (workflow: Partial<Workflow>) => {
    setWorkflow(
      (prevWorkflow) =>
        ({
          ...prevWorkflow,
          ...workflow,
        }) as Workflow
    );
  };

  return {
    workflow,
    loading,
    flag,
    setFlag,
    fetchWorkflow,
    setWorkflow,
    setWorkflowHandler,
  };
}
