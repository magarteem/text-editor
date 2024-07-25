import React from "react";
import { useTranslation } from "react-i18next";

export function Footer({ setTab }: { setTab: (tabName: string) => void }) {
  const { t } = useTranslation();

  return (
    <div className="px-6">
      <div onClick={() => setTab("docs")} className={"cursor-pointer"}>
        <p className="text-sm text-blue-highlight font-semibold">
          {t("widgets.recentDocs.footer")}
        </p>
      </div>
    </div>
  );
}
