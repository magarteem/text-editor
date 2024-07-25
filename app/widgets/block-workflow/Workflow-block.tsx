import React from "react";
import { Header } from "./ui";
import { StepBar } from "./ui/StepBar";
import { useProfileStore } from "@store/index";
import { useStore } from "zustand";
import { StepAccordion } from "./ui/StepAccordion";
import { GetProfileResponse } from "@/app/shared";

export interface IStage {
  actualDuration: number;
  deadlineStage: number;
  durationInDays: number;
  externalDescription: string;
  id: number;
  internalDescription: string;
  name: string;
  optional: boolean;
  orangeStage: boolean;
  order: number;
  recommendedEndDate: number;
  redStage: boolean;
  status: "NotStarted" | "InProgress" | "Completed" | "Skipped";
  tasks: any;
  endDate?: number;
  visibilityToTheClient: boolean;
}

interface WorkflowBlockProps {
  workflow: {
    name: string;
    stages: IStage[];
  };
  setFlag?: (value: boolean) => void;
  clientProfile?: GetProfileResponse;
  currentStage: IStage | null;
  setCurrentStage: (stage: IStage) => void;
}

export const WorkflowBlock: React.FC<WorkflowBlockProps> = ({
  workflow,
  setFlag,
  clientProfile,
  currentStage,
  setCurrentStage,
}) => {
  const profile = useStore(useProfileStore);

  return (
    <div className="flex flex-col gap-4">
      <div className="px-2 flex flex-col gap-4">
        <Header
          title={workflow.name}
          setFlag={setFlag}
          roleType={profile?.roleType}
          clientId={clientProfile?.id}
        />
        <StepBar
          stages={workflow.stages}
          roleType={profile?.roleType}
          currentStage={currentStage}
          setCurrentStage={setCurrentStage}
        />
      </div>
      <StepAccordion
        stages={workflow.stages}
        roleType={profile?.roleType}
        currentStage={currentStage}
        setCurrentStage={setCurrentStage}
      />
    </div>
  );
};
