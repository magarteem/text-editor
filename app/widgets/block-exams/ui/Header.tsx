import React from "react";
import ExamsIcon from "@/public/svg/exams.svg";
import { useTranslation } from "react-i18next";
import BigPenIcon from "@/public/svg/big-pen.svg";

export function Header({
  isEditable,
  isEmpty,
  edit,
}: {
  isEditable: boolean;
  isEmpty: boolean;
  edit: () => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-row justify-between items-center px-6">
      <div className="flex flex-row gap-2 items-center">
        <ExamsIcon />
        <h1 className="text-gray font-semibold">{t("widgets.exams.title")}</h1>
      </div>
      {!isEditable && (
        <button onClick={edit} className="flex flex-row items-center gap-2">
          {isEmpty && (
            <p className="font-sm font-semibold text-blue-highlight">
              {t("widgets.exams.add")}
            </p>
          )}
          <BigPenIcon />
        </button>
      )}
    </div>
  );
}
