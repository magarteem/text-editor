"use client";

import React, { useEffect } from "react";
import SettingsIcon from "@/public/svg/settings-icon.svg";
import { useTranslation } from "react-i18next";
import LogoutIcon from "@/public/svg/logout-icon.svg";
import { SignOutButton } from "@clerk/nextjs";
import { BlockSettings } from "@/app/widgets/block-settings/BlockSettings";

export default function Page() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("settings.documentTitle");
  }, []);

  return (
    <div className="p-6">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-2 items-center">
          <SettingsIcon />
          <p className="text-sm text-gray font-semibold">
            {t("menuItems.settings")}
          </p>
        </div>
        <SignOutButton>
          <button className="bg-blue-light py-2 px-4 rounded-xl flex flex-row items-center gap-2">
            <LogoutIcon />
            <p className="font-semibold">{t("settings.logout")}</p>
          </button>
        </SignOutButton>
      </div>

      <BlockSettings />
    </div>
  );
}
