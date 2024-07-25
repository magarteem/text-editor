import React from "react";
import RecentDocksIcon from "@/public/svg/docks-icon.svg";
import { useTranslation } from "react-i18next";

export function Header({
  isEmpty,
  setTab,
}: {
  isEmpty: boolean;
  setTab: (tab: string) => void;
}) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row gap-2 items-center px-6">
        <RecentDocksIcon />
        <h1 className="text-gray font-semibold">
          {t("widgets.recentDocs.title")}
        </h1>
      </div>
      {isEmpty && (
        <div onClick={() => setTab("docs")} className={"cursor-pointer pr-6"}>
          <p className="text-blue-highlight font-semibold">
            {t("widgets.recentDocs.footer")}
          </p>
        </div>
      )}
    </div>
  );
}
