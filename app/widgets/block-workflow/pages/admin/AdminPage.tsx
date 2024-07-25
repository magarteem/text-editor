import React from "react";
import { Empty } from "./ui";
import { Block } from "@/app/features/block/Block";
import { Loader } from "@/app/sign-in/[[...sign-in]]/ui";
import { GetProfileResponse } from "@/app/shared";
import { IStage, WorkflowBlock } from "../../Workflow-block";
import { BlockClientVisibility } from "@/app/widgets/block-client-visiility";
import { useTabs } from "../../hooks/useTabs";
import { Tabs } from "@ui/index";
import { BlockMaterials } from "@/app/widgets/block-materials/BlockMaterials";
import { BlockMethodology } from "@/app/widgets/block-methodolgy";
import { BlockTasks } from "@/app/widgets/block-tasks";
import { BlockClientComment } from "@/app/widgets/block-client-comment";
import { useParams } from "next/navigation";
import { BlockMaterialsSecond } from "@/app/widgets/block-materials_second";

export function AdminPage({
  workflow,
  loading,
  profile,
  setFlag,
  refetchHandler,
  setWorkflow,
  setWorkflowHandler,
  currentStage,
  setCurrentStage,
}: {
  workflow: any;
  loading: boolean;
  profile: GetProfileResponse;
  refetchHandler: () => void;
  setFlag: (value: boolean) => void;
  setWorkflow: any;
  setWorkflowHandler: (workflow: { name: string; stages: IStage[] }) => void;
  setCurrentStage: (stage: IStage) => void;
  currentStage: IStage | null;
}) {
  const { tab, setTab, items } = useTabs();
  const { filesId }: { filesId: string } = useParams();

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!workflow) {
    return (
      <Block id="workflow" isEditable={false}>
        <Empty
          setFlag={setFlag}
          clientId={profile.id}
          refetchHandler={refetchHandler}
          setWorkflow={setWorkflowHandler}
        />
      </Block>
    );
  }

  if (!currentStage) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Block id="workflow" isEditable={false} classNames="px-4">
        <WorkflowBlock
          workflow={workflow}
          setFlag={setFlag}
          clientProfile={profile}
          setCurrentStage={setCurrentStage}
          currentStage={currentStage}
        />
      </Block>
      <BlockClientVisibility
        id="blockClientVisibility"
        workflow={workflow}
        setWorkflow={setWorkflow}
        setCurrentStage={setCurrentStage}
        profile={profile}
        currentStage={currentStage}
      />
      <Tabs
        className="mb-2 mt-2"
        items={items}
        selected={tab}
        onChange={setTab}
      />
      <div className="h-full">
        {content[tab]({
          stage: currentStage,
          setCurrentStage,
          workflow,
          setWorkflow,
          filesId,
        })}
      </div>
    </div>
  );
}

const content: Record<string, React.FC<any>> = {
  methodology: (stage) => (
    <div className="flex flex-col gap-6 h-full">
      <BlockMethodology stage={stage.stage} />
    </div>
  ),
  materials: ({ stage }) => (
    <div className="flex flex-col gap-6">
      <BlockMaterialsSecond stageId={stage.id} role="client" />
    </div>
  ),
  tasks: ({ stage, setCurrentStage, setWorkflow, currentStage }) => (
    <BlockTasks
      stage={stage}
      setWorkflow={setWorkflow}
      setCurrentStage={setCurrentStage}
    />
  ),
  comments: ({ stage }) => (
    <BlockClientComment
      key={stage.id}
      isWorkflow={true}
      stageId={stage.id}
      queryKey="progressPage"
      apiUrlComments="/api/comment-workflow-stage"
    />
  ),
};
