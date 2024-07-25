import React from "react";
import { IStage } from "../../block-workflow/Workflow-block";
import { useTranslation } from "react-i18next";
import { useController } from "react-hook-form";

function StatusTag({
  name,
  onClick,
  isCurrent,
  stageType,
  isEditing,
}: {
  name: string;
  onClick: () => void;
  isCurrent: boolean;
  isEditing: boolean;
  stageType: "NotStarted" | "InProgress" | "Completed" | "Skipped";
}) {
  const getBackgroundClass = (isCurrent: boolean, stageType: string) => {
    if (!isCurrent) {
      return "bg-white-dirty";
    }

    switch (stageType) {
      case "Completed":
        return "bg-green-dirty-bright";
      case "InProgress":
        return "bg-blue-highlight";
      case "Skipped":
        return "bg-red-dirty";
      default:
        return "bg-blue-ukrainian";
    }
  };

  return (
    <button
      className={`${isCurrent ? "bg-white" : ""} text-sm font-semibold py-2 pr-4 rounded-xl flex flex-row items-center gap-2 pl-3`}
      disabled={!isEditing}
      onClick={() => onClick()}
      type="button"
    >
      <div
        className={`h-2 w-2 flex rounded-full ${getBackgroundClass(isCurrent, stageType)}`}
      ></div>
      <h3 className="text-nowrap">{name}</h3>
    </button>
  );
}

export function StatusSwitch({
  stage,
  form,
  isEditing,
}: {
  stage: IStage | undefined;
  form: any;
  isEditing: boolean;
}) {
  const { t } = useTranslation();

  const { field } = useController<any>({
    control: form.control,
    name: "status",
  });

  if (!stage) return null;

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-gray">
        {t("workflow.visibilityClient.status")}
      </h3>
      <div className="flex flex-row gap-1 bg-white-dirty p-1 rounded-xl">
        <StatusTag
          onClick={() => field.onChange("NotStarted")}
          isEditing={isEditing}
          name={t("workflow.visibilityClient.statuses.NotStarted")}
          isCurrent={field.value === "NotStarted"}
          stageType={field.value}
        />
        <StatusTag
          onClick={() => field.onChange("InProgress")}
          isEditing={isEditing}
          name={t("workflow.visibilityClient.statuses.InProgress")}
          isCurrent={field.value === "InProgress"}
          stageType={field.value}
        />
        <StatusTag
          isEditing={isEditing}
          onClick={() => field.onChange("Completed")}
          name={t("workflow.visibilityClient.statuses.Completed")}
          isCurrent={field.value === "Completed"}
          stageType={field.value}
        />
        {stage.optional && (
          <StatusTag
            isEditing={isEditing}
            onClick={() => field.onChange("Skipped")}
            name={t("workflow.visibilityClient.statuses.Skipped")}
            isCurrent={field.value === "Skipped"}
            stageType={field.value}
          />
        )}
      </div>
    </div>
  );
}
