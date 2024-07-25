import React from "react";
import { useTranslation } from "react-i18next";
import CrossIcon from "@/public/svg/blue-cross.svg";
import { RoleType } from "@/app/shared/api/types/index";

export function Header({
  addHandler,
  disable,
  role,
}: {
  addHandler: () => void;
  disable: boolean;
  role: RoleType;
}) {
  const { t } = useTranslation();

  return (
    <div className="px-4 flex items-center justify-between">
      <h3 className="font-semibold">{t("workflow.tasks.tasks.title")}</h3>
      {role !== "Client" && (
        <button onClick={addHandler} disabled={disable}>
          <CrossIcon className={`${disable ? "svg-disabled" : ""}`} />
        </button>
      )}
    </div>
  );
}
