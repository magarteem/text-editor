import React from "react";
import ChosenUniversitiesIcon from "@/public/svg/chosen-universities.svg";
import { useTranslation } from "react-i18next";
import BigPenIcon from "@/public/svg/big-pen.svg";
import BlueCrossIcon from "@/public/svg/blue-cross.svg";

export function Header({
  isEditable,
  isEmpty,
  edit,
  isClient,
  cancel,
}: {
  isEditable: boolean;
    isEmpty: boolean;
    isClient?: boolean;
  edit: () => void;
  cancel: () => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row gap-2 items-center">
        <ChosenUniversitiesIcon />
        <h1 className="text-gray font-semibold">
          {t("widgets.chosenUniversities.title")}
        </h1>
      </div>
      {isClient ? <></> : (
        !isEditable && (
          <button onClick={edit} className="flex flex-row items-center gap-2">
            {isEmpty && (
              <p className="font-sm font-semibold text-blue-highlight">
                {t("widgets.chosenUniversities.none")}
              </p>
            )}
            <BigPenIcon />
          </button>
        ))}
    </div>
  );
}
