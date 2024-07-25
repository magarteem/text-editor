import React, { useState } from "react";
import { IStage } from "../../block-workflow/Workflow-block";
import EyeIcon from "@/public/svg/eye-icon.svg";
import CloseEyeIcon from "@/public/svg/close-eye.svg";
import { useModal } from "@/app/shared/modals/modal/ModalProvider";
import { useTranslation } from "react-i18next";
import { useController } from "react-hook-form";

export function VisibilityToggle({
  stage,
  currStageSerialNum,
  form,
  isEditing,
}: {
  stage: IStage | undefined;
  currStageSerialNum: number;
  form: any;
  isEditing: boolean;
}) {
  const { t } = useTranslation();

  const { field } = useController<any>({
    control: form.control,
    name: "visibilityToTheClient",
  });

  const { openModal } = useModal();

  const handleCheckboxChange = () => {
    if (!field.value) {
      openModal("visibleStageModal", {
        label: `${t("workflow.visibilityClient.stage")} ${currStageSerialNum} ${stage?.name}`,
        field: field,
      });
    } else {
      field.onChange(false);
    }
  };

  return (
    <>
      <label className="flex cursor-pointer select-none items-center mt-8">
        <div className="relative">
          <input
            type="checkbox"
            checked={field.value}
            onChange={handleCheckboxChange}
            className="sr-only"
          />
          <div
            className={`block h-8 w-14 rounded-full ${field.value ? "bg-blue-highlight" : "bg-white-platinum"}`}
          ></div>
          <div className="absolute left-1.5 top-2">
            <EyeIcon className="svg-white_fill" />
          </div>
          <div className="absolute right-1.5 top-2">
            <CloseEyeIcon className="svg-white_fill_disable" />
          </div>
          <div
            className={`absolute ${!field.value ? "left-1" : "right-1"} top-1 h-6 w-6 rounded-full transition bg-white shadow-sm`}
          ></div>
        </div>
      </label>
    </>
  );
}
