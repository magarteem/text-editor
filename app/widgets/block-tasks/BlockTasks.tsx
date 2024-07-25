import React, { useContext, useEffect } from "react";
import { IStage } from "../block-workflow/Workflow-block";
import { ClientDescription } from "./components";
import { Tasks } from "./components/tasks/Tasks";
import { BlockMaterialsSecond } from "../block-materials_second/BlockMaterialsSecond";
import { EditingBlockContext } from "../editing-block";

export function BlockTasks({
  stage,
  setWorkflow,
  setCurrentStage,
  isClient = false,
}: {
  stage: IStage;
  setCurrentStage: any;
  isClient?: boolean;
  setWorkflow: (workflow: any) => void;
}) {
  const { handleCancelEdit } = useContext(EditingBlockContext);

  useEffect(() => {
    return handleCancelEdit();
  }, []);
  return (
    <div className="flex flex-col gap-6">
      {!isClient && (
        <ClientDescription
          stage={stage}
          setWorkflow={setWorkflow}
          setCurrentStage={setCurrentStage}
          id="clientDescription"
        />
      )}
      {!isClient && <BlockMaterialsSecond stageId={stage.id} role="employee" />}
      <Tasks
        stage={stage}
        setWorkflow={setWorkflow}
        setCurrentStage={setCurrentStage}
        currentStage={stage}
      />
    </div>
  );
}
