import React, { useContext, useEffect, useState } from "react";
import { EditingBlockContext, Props } from "@/app/widgets";
import { RoleType } from "@/app/shared";
import { useGetWorkflow } from "@hooks/useGetWorkflow";
import { AdminPage, CuratorPage, ClientPage } from "./pages";
import { IStage } from "./Workflow-block";

export function Workflow({
  profile,
  role,
  setFlag,
}: Props & { role: RoleType; setFlag: (value: boolean) => void }) {
  const { fetchWorkflow, workflow, loading, setWorkflowHandler, setWorkflow } =
    useGetWorkflow({
      userId: profile.id,
    });

  const refetchHandler = () => {
    refetchHandler();
  };

  const [currentStage, setCurrentStage] = useState<IStage | null | "closed">(
    null
  );

  const { handleCancelEdit } = useContext(EditingBlockContext);

  useEffect(() => {
    fetchWorkflow();
    return handleCancelEdit();
  }, []);

  useEffect(() => {
    if (workflow && workflow.stages?.length && currentStage === null) {
      const isClient = role === "Client";

      const activeStage = workflow.stages.find(
        (stage) =>
          (stage.status === "InProgress" || stage.status === "NotStarted") &&
          (!isClient || stage.visibilityToTheClient === true)
      );

      if (activeStage) {
        setCurrentStage(activeStage);
      } else {
        const secondActive = workflow.stages.find(
          (stage) =>
            (!isClient || stage.visibilityToTheClient === true) &&
            stage.status !== "Skipped"
        );
        if (secondActive) {
          setCurrentStage(secondActive);
        } else {
          setCurrentStage("closed");
        }
      }
    }
  }, [workflow]);

  switch (role) {
    case "Administrator":
      return (
        <AdminPage
          workflow={workflow}
          loading={loading}
          profile={profile}
          refetchHandler={refetchHandler}
          setWorkflow={setWorkflow}
          setWorkflowHandler={setWorkflowHandler}
          setFlag={setFlag}
          currentStage={currentStage as IStage}
          setCurrentStage={setCurrentStage}
        />
      );
    case "Strategist":
      return (
        <AdminPage
          workflow={workflow}
          loading={loading}
          profile={profile}
          refetchHandler={refetchHandler}
          setWorkflow={setWorkflow}
          setWorkflowHandler={setWorkflowHandler}
          setFlag={setFlag}
          currentStage={currentStage as IStage}
          setCurrentStage={setCurrentStage}
        />
      );
    case "Curator":
      return (
        <CuratorPage
          setFlag={setFlag}
          profile={profile}
          setWorkflow={setWorkflow}
          workflow={workflow}
          loading={loading}
          currentStage={currentStage as IStage}
          setCurrentStage={setCurrentStage}
        />
      );
    case "Client":
      return (
        <ClientPage
          profile={profile}
          workflow={workflow}
          loading={loading}
          currentStage={currentStage as IStage}
          setWorkflow={setWorkflow}
          setCurrentStage={setCurrentStage as any}
        />
      );
    default:
      return;
  }
}
