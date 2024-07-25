"use client";

import { Tabs, WipPage } from "@ui/index";
import {
  BlockExams,
  BlockEducation,
  BlockApplicationDetails,
  BlockChosenUniversities,
  BlockRecentDocs,
  Workflow,
} from "@widgets/index";
import { useTabs, TTab } from "@/app/[locale]/me/hooks/useTabs";
import { Props } from "@/app/widgets";
import { BlockCurator } from "@/app/widgets/block-curator";
import LogoutIcon from "@/public/svg/logout-icon.svg";
import { SignOutButton } from "@clerk/nextjs";
import { useTranslation } from "react-i18next";
import { Document } from "../clients/[userId]/tableDocuments/Document";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { NotificationPage } from "../notifications/NotificationPage";
import { FieldOnlyReady } from "./ui/FieldOnlyReady";
import SettingsImg from "@/public/png/settings-img.png";
import { BlockSettings } from "@/app/widgets/block-settings/BlockSettings";
import {
  ActionLog,
  BusinessCard,
  Documentation,
  Employees,
  Notifications,
  Safety,
} from "@/app/widgets/block-settings-business-card";
import Image from "next/image";

export function ClientPage({ profile }: Props) {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") as TTab | null;
  const { tab, setTab, items } = useTabs({ defaultTab: "profile" });
  const [parentId, setParentId] = useState<number | null>(null);
  const [checkedFilerNotify, setCheckedFilerNotify] = useState<
    boolean | undefined
  >(undefined);

  const setParentIdAction = (parent: number | null) => setParentId(parent);

  useEffect(() => {
    if (initialTab) {
      setTab(initialTab); // useTabs будет обрабатывать невалидные значения
    }
  }, [initialTab, setTab]);

  const content: Record<TTab, React.FC<any>> = {
    profile: () => (
      <div className={"flex flex-col gap-6"}>
        <BlockApplicationDetails
          profile={profile}
          id={"BlockApplicationDetails"}
          isClient={true}
        />
        {!!profile.targetDetailsUniversity &&
          profile.targetDetailsUniversity.length >= 1 && (
            <BlockChosenUniversities
              profile={profile}
              id={"BlockChosenUniversities"}
              isClient={true}
            />
          )}
        <BlockExams profile={profile} id={"BlockExams"} />
        <BlockEducation id={"BlockEducation"} profile={profile} />
        {!!profile.curator && <BlockCurator profile={profile} id="s" />}
        <BlockRecentDocs profile={profile} />
      </div>
    ),
    progress: () => (
      <div className={"flex flex-col gap-6 h-full"}>
        <Workflow profile={profile} role="Client" setFlag={() => {}} />
      </div>
    ),
    docs: () => (
      <div className={"flex flex-col gap-6"}>
        <Document parentId={parentId} setParentIdAction={setParentIdAction} />
      </div>
    ),
    notification: () => (
      <div className={"flex flex-col gap-6"}>
        <NotificationPage
          profile={profile}
          checkedFilerNotify={checkedFilerNotify}
        />
      </div>
    ),
    settings: () => (
      <div className={"flex flex-col gap-6"}>
        {/*<div className="flex items-center justify-end">
          <SignOutButton>
            <button className="bg-blue-light py-2 px-4 rounded-xl flex flex-row items-center gap-2">
              <LogoutIcon />
              <p className="font-semibold">{t("settings.logout")}</p>
            </button>
          </SignOutButton>
        </div>*/}

        <section className="flex">
          <div className="flex flex-col flex-grow flex-shrink-1 basis-full gap-4 overflow-auto">
            <Safety emailAddress={profile?.emailAddress} />
            <Notifications profile={profile ?? null} />
            <Employees />
            <ActionLog />
            <Documentation />
          </div>

          <div>
            <Image src={SettingsImg} alt="SettingsImg" />
          </div>
        </section>
      </div>
    ),
  };

  const changeTopFilter = (checked: boolean | undefined) => {
    setCheckedFilerNotify(checked);
  };

  return (
    <div className="py-6 h-full">
      <div className="flex justify-between">
        <Tabs
          className={"mb-4"}
          items={items}
          selected={tab}
          onChange={(selected: TTab) => {
            setTab(selected);
          }}
        />

        {tab === "notification" && (
          <FieldOnlyReady changeTopFilter={changeTopFilter} />
        )}

        {tab === "settings" && (
          <div className="flex items-center justify-end h-10">
            <SignOutButton>
              <button className="bg-blue-light py-2 px-4 rounded-xl flex flex-row items-center gap-2">
                <LogoutIcon />
                <p className="font-semibold">{t("settings.logout")}</p>
              </button>
            </SignOutButton>
          </div>
        )}
      </div>

      {content[tab](profile)}
    </div>
  );
}
