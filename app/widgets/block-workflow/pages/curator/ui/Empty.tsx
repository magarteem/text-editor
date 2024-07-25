import React from "react";
import EmptyImage from "@/public/svg/workflow-curator-empty.svg";
import { useTranslation } from "react-i18next";
import Link from "next/link";

export function Empty() {
  const { t } = useTranslation();

  return (
    <div className="border border-grey-light border-dashed min-h-96 rounded-[32px] p-6 flex items-center justify-center">
      <div className="flex items-center justify-center flex-col text-center font-normal">
        <EmptyImage />
        <div className="text-wrap max-w-96 mb-14">
          <h3>{t("workflow.empty.curator.title")}</h3>
          <h3>{t("workflow.empty.curator.text")}</h3>
        </div>
      </div>
    </div>
  );
}
