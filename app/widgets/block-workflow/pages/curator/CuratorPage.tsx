import React from "react";
import { Empty } from "./ui";
import { Loader } from "@/app/sign-in/[[...sign-in]]/ui";
import { WorkflowBlock } from "../../Workflow-block";
import { Block } from "@/app/features/block/Block";
import { IStage } from "../../Workflow-block";
import { BlockClientVisibility } from "@/app/widgets/block-client-visiility";
import { Tabs } from "@ui/index";
import { useTabs } from "../../hooks/useTabs";
import { GetProfileResponse } from "@/app/shared";
import { BlockMaterials } from "@/app/widgets/block-materials/BlockMaterials";
import { BlockMethodology } from "@/app/widgets/block-methodolgy";
import { BlockTasks } from "@/app/widgets/block-tasks";
import { BlockClientComment } from "@/app/widgets/block-client-comment";
import { BlockMaterialsSecond } from "@/app/widgets/block-materials_second";
interface CuratorPageProps {
  workflow: any;
  setWorkflow: any;
  setFlag: any;
  profile: GetProfileResponse;
  loading: boolean;
  setCurrentStage: any;
  currentStage: IStage | null;
}

const LoaderState = () => (
  <div className="flex items-center justify-center h-full">
    <Loader />
  </div>
);

const EmptyState = () => <Empty />;

export function CuratorPage({
  workflow,
  loading,
  setWorkflow,
  setFlag,
  profile,
  currentStage,
  setCurrentStage,
}: CuratorPageProps) {
  const { tab, setTab, items } = useTabs();

  if (loading) {
    return <LoaderState />;
  }

  if (!workflow) {
    return <EmptyState />;
  }

  if (!currentStage) {
    return (
      <div className="flex justify-center items-center w-full">
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
  materials: ({ stage, setCurrentStage, workflow, setWorkflow }) => (
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
