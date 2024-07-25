import React from "react";
import { IStage } from "../Workflow-block";
import { RoleType } from "@/app/shared";
import StopIcon from "@/public/svg/stop-icon.svg";
import RedFlagIcon from "@/public/svg/redFlag.svg";
import OrangeFlagIcon from "@/public/svg/orangeFlag.svg";

interface StageProps {
  stage: IStage;
  roleType?: RoleType;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  currentStage: IStage | null;
  setCurrentStage: (stage: IStage) => void;
}

const StageButton: React.FC<{
  stage: IStage;
  currentStage: IStage | null;
  index: number;
  setCurrentStage: (stage: IStage) => void;
  isClickable: boolean;
}> = ({ stage, currentStage, index, setCurrentStage, isClickable }) => (
  <div
    onClick={() => isClickable && setCurrentStage(stage)}
    className={`w-5 h-5 text-xs flex justify-center items-center text-gray font-semibold ${
      stage.id === currentStage?.id
        ? "rounded-full bg-blue-highlight text-white"
        : ""
    } ${isClickable ? "cursor-pointer" : "cursor-not-allowed opacity-50"}`}
  >
    <p>{index}</p>
  </div>
);

const Stage: React.FC<StageProps> = ({
  stage,
  roleType,
  index,
  isFirst,
  isLast,
  currentStage,
  setCurrentStage,
}) => {
  const isClickable = stage.visibilityToTheClient || roleType !== "Client";
  const roundedClass = isFirst ? "rounded-l-xl" : isLast ? "rounded-r-xl" : "";
  const baseClass = `flex flex-1 min-w-1 relative ${roundedClass}`;

  const getBgColor = () => {
    switch (stage.status) {
      case "Completed":
        return "bg-green-dirty-bright";
      case "NotStarted":
        return "bg-blue-ukrainian";
      case "InProgress":
        return "bg-blue-highlight";
      case "Skipped":
        return "bg-red-dirty";
      default:
        return "";
    }
  };

  return (
    <div className={`${baseClass} ${getBgColor()}`}>
      <div className="absolute flex flex-row items-center gap-0.5 -top-7 text-xs text-gray font-semibold left-1/2 transform -translate-x-1/2">
        {stage.status === "Skipped" ? (
          <div
            className={`w-5 h-5 flex justify-center items-center ${
              stage.id === currentStage?.id
                ? "rounded-full bg-blue-highlight text-white"
                : ""
            } ${isClickable ? "cursor-pointer" : "cursor-not-allowed opacity-50"}`}
            onClick={() => isClickable && setCurrentStage(stage)}
          >
            <StopIcon />
          </div>
        ) : (
          <StageButton
            stage={stage}
            currentStage={currentStage}
            index={index}
            setCurrentStage={setCurrentStage}
            isClickable={isClickable}
          />
        )}
        {stage.orangeStage && <OrangeFlagIcon />}
        {stage.redStage && <RedFlagIcon />}
      </div>
    </div>
  );
};

export const StepBar: React.FC<{
  stages: IStage[];
  roleType?: RoleType;
  currentStage: IStage | null;
  setCurrentStage: (stage: IStage) => void;
}> = ({ stages, roleType, currentStage, setCurrentStage }) => {
  const visibleStages = stages.filter(
    (stage) =>
      stage.visibilityToTheClient ||
      roleType !== "Client" ||
      stage.status !== "Skipped"
  );

  return (
    <div
      className="flex flex-row w-full bg-white rounded-xl h-3 mt-7"
      style={{ gap: "1px" }}
    >
      {visibleStages.map((stage, index) => {
        const isFirst = index === 0;
        const isLast = index === visibleStages.length - 1;
        const stageIndex =
          visibleStages.filter((s, i) => i < index && s.status !== "Skipped")
            .length + 1;

        return (
          <Stage
            key={stage.id}
            stage={stage}
            roleType={roleType}
            index={stage.status !== "Skipped" ? stageIndex : 0}
            isFirst={isFirst}
            isLast={isLast}
            currentStage={currentStage}
            setCurrentStage={setCurrentStage}
          />
        );
      })}
    </div>
  );
};
