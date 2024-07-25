import React from "react";
import EmptyImage from "@/public/svg/workflow-client-empty.svg";
import { useTranslation } from "react-i18next";
import Link from "next/link";

export function Empty() {
  const { t } = useTranslation();

  return (
    <div className="border border-grey-light border-dashed min-h-96 rounded-[32px] p-6 flex items-center justify-center">
      <div className="flex items-center justify-center flex-col text-center font-normal">
        <EmptyImage />
        <div className="text-wrap max-w-96 mb-14">
          <h3>{t("workflow.empty.client.desc.title")}</h3>
          <h3>{t("workflow.empty.client.desc.text")}</h3>
          <Link href="/">
            <h3 className="text-sm text-blue-highlight mt-4 ">
              {t("workflow.empty.client.link")}
            </h3>
          </Link>
        </div>
      </div>
    </div>
  );
}
