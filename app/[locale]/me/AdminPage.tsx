"use client";
import React, { ReactNode } from "react";
import { useTabs } from "@/app/[locale]/me/hooks/useTabs";
import { Tabs, RightSide } from "@ui/index";
import { BlockUser } from "@widgets/index";
import { useProfileStore } from "@store/index";
import { useStore } from "zustand";
import { TTab } from "../clients/[userId]/hooks/useTabs";

export const AdminPage = () => {
  const { tab, setTab, items } = useTabs({});
  const profile = useStore(useProfileStore);

  return (
    <div className={"grid grid-cols-[auto_272px] py-6 pr-6"}>
      <div className={""}>
        <Tabs
          className={"mb-4"}
          items={items}
          selected={tab}
          onChange={(selected) => setTab(selected as TTab)}
        />
        <div>{content[tab]}</div>
      </div>
      <RightSide>
        {profile && <BlockUser profile={profile} id="BlockUser" />}
      </RightSide>
    </div>
  );
};

const content: Record<string, ReactNode> = {
  profile: (
    <div>
      <div>Profile Tab</div>
    </div>
  ),
  progress: (
    <div className={"flex flex-col gap-6"}>
      <h1>Progress Tab</h1>
    </div>
  ),
  docs: (
    <div className={"flex flex-col gap-6"}>
      <h1>Docs Tab</h1>
    </div>
  ),
};
