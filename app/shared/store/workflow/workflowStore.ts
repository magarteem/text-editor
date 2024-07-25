import create from 'zustand';
import axios from 'axios';
import { getCookie } from '@api/baseFetch';
import { IStage } from '@/app/widgets/block-workflow/Workflow-block';

interface Workflow {
  name: string;
  stages: IStage[]
}

interface WorkflowState {
  workflow: Workflow | null;
  currentStage: IStage | null;
  loading: boolean;
  fetchWorkflow: (userId: number) => void;
  setWorkflow: (workflow: Workflow) => void;
  setCurrentStage: (stage: IStage) => void;
}

export const useWorkflowStore = create<WorkflowState>((set) => ({
  workflow: null,
  currentStage: null,
  loading: false,
  fetchWorkflow: async (userId: number) => {
    set({ loading: true });
    try {
      const response = await axios.get('/api/workflow', {
        params: { clientId: userId },
        headers: {
          Authorization: `Bearer ${getCookie('jwt')}`,
        },
      });
      const workflow = response.data;
      const activeStage = workflow.stages.find(
        (stage: IStage) => stage.status === 'InProgress' || stage.status === 'NotStarted'
      );
      set({
        workflow,
        currentStage: activeStage || null,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      set({ workflow: null, loading: false });
    }
  },
  setWorkflow: (workflow) => set({ workflow }),
  setCurrentStage: (stage) => set({ currentStage: stage }),
}));
