import React from "react";
import CrossIcon from "@/public/svg/blue-cross.svg";
import { useTranslation } from "react-i18next";

interface AddTaskProps {
  addHandler: () => void;
  disable: boolean;
}

export const AddTask: React.FC<AddTaskProps> = ({ addHandler, disable }) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={addHandler}
      disabled={disable}
      className={`w-full h-20 border border-dashed ${!disable ? "border-blue-highlight" : "border-blue-ukrainian"} mt-2 flex justify-center items-center rounded-[32px]`}
    >
      <div
        className={`flex flex-row gap-2 items-center text-sm ${!disable ? "text-blue-highlight" : "text-blue-ukrainian"} font-semibold`}
      >
        <CrossIcon className={`${disable ? "svg-disabled" : ""}`} />
        <p>{t("workflow.tasks.tasks.add")}</p>
      </div>
    </button>
  );
};
