import React from "react";
import { Empty } from "./ui";
import { Loader } from "@/app/sign-in/[[...sign-in]]/ui";
import { WorkflowBlock } from "../../Workflow-block";
import { Block } from "@/app/features/block/Block";
import { IStage } from "../../Workflow-block";
import { BlockClientVisibility } from "@widgets/block-client-visiility";
import { GetProfileResponse } from "@/app/shared";
import { useClientsTabs } from "../../hooks/useTabs";
import { Tabs } from "@ui/index";
import { BlockMethodology } from "@/app/widgets/block-methodolgy";
import { BlockTasks } from "@/app/widgets/block-tasks";
import { BlockClientComment } from "@/app/widgets/block-client-comment";
import { Closed } from "./ui/Closed";
import { BlockMaterials } from "@/app/widgets/block-materials/BlockMaterials";
import { BlockMaterialsSecond } from "@/app/widgets/block-materials_second";

interface ClientPageProps {
  workflow: any | null;
  loading: boolean;
  profile: GetProfileResponse;
  setWorkflow: React.Dispatch<React.SetStateAction<any | null>>;
  currentStage: IStage | null | "closed";
  setCurrentStage: React.Dispatch<
    React.SetStateAction<IStage | null | "closed">
  >;
}

const LoaderState: React.FC = () => (
  <div className="flex items-center justify-center h-full">
    <Loader />
  </div>
);

const EmptyState: React.FC = () => <Empty />;

const ClosedState: React.FC = () => <Closed />;

export const ClientPage: React.FC<ClientPageProps> = ({
  workflow,
  loading,
  profile,
  setWorkflow,
  currentStage,
  setCurrentStage,
}) => {
  const { tab, setTab, items } = useClientsTabs();

  if (loading) {
    return <LoaderState />;
  }

  if (!workflow) {
    return <EmptyState />;
  }

  if (currentStage === "closed") {
    return <ClosedState />;
  }

  if (!currentStage) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      <Block id="workflow" isEditable={false} classNames="px-4">
        <WorkflowBlock
          workflow={workflow}
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
};

const content: Record<string, React.FC<any>> = {
  description: (stage) => (
    <div className="flex flex-col gap-6 h-full">
      <BlockMethodology stage={stage.stage} isClient={true} />
    </div>
  ),
  materials: ({ stage }) => (
    <div className="flex flex-col gap-6">
      <BlockMaterialsSecond stageId={stage.id} role="client" />
    </div>
  ),
  tasks: ({ stage, setCurrentStage, setWorkflow, currentStage }) => (
    <BlockTasks
      isClient={true}
      stage={stage}
      setWorkflow={setWorkflow}
      setCurrentStage={setCurrentStage}
    />
  ),
};
