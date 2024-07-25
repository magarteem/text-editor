import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ArrowIconDown from "@/public/svg/chevron-down.svg";
import ArrowIconUp from "@/public/svg/chevron-top.svg";
import { IStage } from "../Workflow-block";
import { RoleType } from "@/app/shared";
import { Tag } from "antd";
import EyeIcon from "@/public/svg/eye-icon.svg";
import StopIcon from "@/public/svg/stop-icon.svg";
import RedFlagIcon from "@/public/svg/redFlag.svg";
import OrangeFlagIcon from "@/public/svg/orangeFlag.svg";

type StageStatus = "Completed" | "InProgress" | "NotStarted" | "Skipped";

interface StageButtonProps {
  stage: IStage;
  index: number;
  currentStage: IStage | null;
  setCurrentStage: (stage: IStage) => void;
  roleType?: RoleType;
  labels: Record<StageStatus, string>;
}

const StageButton: React.FC<StageButtonProps> = ({
  stage,
  index,
  currentStage,
  setCurrentStage,
  roleType,
  labels,
}) => {
  const isActive = stage.visibilityToTheClient || roleType !== "Client";
  const buttonClass = `p-2 flex flex-row items-center text-sm text-gray font-semibold relative ${
    isActive ? "hover:bg-[#E7F5FF]" : "opacity-50 cursor-not-allowed"
  } rounded-xl`;

  const handleClick = () => {
    if (isActive) {
      setCurrentStage(stage);
    }
  };

  return (
    <button className={buttonClass} onClick={handleClick} disabled={!isActive}>
      <div
        className={`absolute left-2 w-5 h-5 flex justify-center items-center text-gray font-semibold ${
          stage.id === currentStage?.id
            ? "rounded-full bg-blue-highlight -left-1.5 text-white"
            : ""
        }`}
      >
        {stage.status === "Skipped" ? (
          <StopIcon />
        ) : (
          <p className="text-xs">{index}</p>
        )}
      </div>
      <p className="ml-7">
        <Tag color={getTagColor(stage.status)} className="w-24">
          <p
            className={`font-bold uppercase tracking-widest max-w-22 overflow-hidden text-ellipsis text-center ${getTagTextColor(
              stage.status
            )}`}
            style={{ fontSize: "9px", fontWeight: "900 !important" }}
          >
            {labels[stage.status]}
          </p>
        </Tag>
      </p>
      {stage.visibilityToTheClient && <EyeIcon className="absolute left-36" />}
      <p className="ml-10 max-w-sm overflow-hidden text-ellipsis">
        {stage.name}
      </p>
      {stage.status !== "Completed" && stage.status !== "Skipped" && (
        <div className="ml-2">
          {stage.orangeStage && <OrangeFlagIcon />}
          {stage.redStage && <RedFlagIcon />}
        </div>
      )}
    </button>
  );
};

const getTagColor = (status: StageStatus): string => {
  switch (status) {
    case "Completed":
      return "#D1F7EE";
    case "InProgress":
      return "#3B63B8";
    case "NotStarted":
      return "#C3DDF0";
    case "Skipped":
      return "#FEE2E2";
    default:
      return "default";
  }
};

const getTagTextColor = (status: StageStatus): string => {
  switch (status) {
    case "Completed":
      return "text-[#1ABE8C]";
    case "InProgress":
      return "text-[#FFFFFF]";
    case "NotStarted":
      return "text-[#3B63B8]";
    case "Skipped":
      return "text-[#FC6E6E]";
    default:
      return "text-gray-500";
  }
};

interface StepAccordionProps {
  stages: IStage[];
  roleType?: RoleType;
  currentStage: IStage | null;
  setCurrentStage: (stage: IStage) => void;
}

export const StepAccordion: React.FC<StepAccordionProps> = ({
  stages,
  roleType,
  currentStage,
  setCurrentStage,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const labels: Record<StageStatus, string> = {
    InProgress: t("clients.filters.statuses.InProgressUpd"),
    NotStarted: t("clients.filters.statuses.NotStarted"),
    Completed: t("clients.filters.statuses.Completed"),
    Skipped: t("clients.filters.statuses.Skipped"),
  };

  const visibleStages = stages.filter(
    (stage) =>
      stage.visibilityToTheClient ||
      roleType !== "Client" ||
      stage.status !== "Skipped"
  );

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <button className="bg-white" onClick={handleToggle}>
          <span className="text-sm font-semibold text-blue-highlight flex flex-row gap-1 items-center">
            <p>{t("workflow.allStages")}</p>
            {isOpen ? <ArrowIconUp /> : <ArrowIconDown />}
          </span>
        </button>
      </div>
      {isOpen && (
        <div className="py-4 bg-gray-50 flex flex-col gap-2">
          {visibleStages.map((stage, index) => {
            const stageIndex =
              visibleStages.filter(
                (s, i) => i < index && s.status !== "Skipped"
              ).length + 1;
            return (
              <StageButton
                key={stage.id}
                stage={stage}
                index={stage.status !== "Skipped" ? stageIndex : 0}
                currentStage={currentStage}
                setCurrentStage={setCurrentStage}
                roleType={roleType}
                labels={labels}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
