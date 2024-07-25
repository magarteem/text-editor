"use client";

import Image from "next/image";
import SettingsImg from "@/public/png/settings-img.png";
import { useTabsSettings } from "./hooks/useTabsSettings";
import { Tabs } from "@/app/shared/ui/tabs/Tabs";
import { useProfileStore } from "@/app/shared/store/profile/useProfileStore";
import {
  ActionLog,
  BusinessCard,
  Documentation,
  Employees,
  Notifications,
  Safety,
} from "@/app/widgets/block-settings-business-card";
import { useStore } from "zustand";
import { GetProfileResponse, RoleType } from "@/app/shared";

export function BlockSettings() {
  const profile = useStore(useProfileStore);
  const { tab, setTab, items } = useTabsSettings({
    defaultTab: "safety",
  });

  return (
    <>
      <Tabs className="mb-4" items={items} selected={tab} onChange={setTab} />
      <section className="flex">
        {content[tab]({
          profile: profile,
          role: "Administrator",
        })}

        <div>
          <Image src={SettingsImg} alt="SettingsImg" />
        </div>
      </section>
    </>
  );
}

interface IRecordTab {
  profile: GetProfileResponse | null;
  role?: RoleType;
}

const content: Record<string, React.FC<IRecordTab>> = {
  businessCard: () => <BusinessCard />,
  safety: ({ profile }) => <Safety emailAddress={profile?.emailAddress} />,
  notifications: ({ profile }) => <Notifications profile={profile ?? null} />,
  employees: () => <Employees />,
  actionLog: () => <ActionLog />,
  documentation: () => <Documentation />,
};
