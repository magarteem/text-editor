"use client";

import React, { useEffect, useState } from "react";
import { RightSide, Tabs, Loader } from "@ui/index";
import { notFound, usePathname } from "next/navigation";
import Link from "next/link";
import { RoleType } from "@api/index";
import {
  BlockUser,
  BlockProgress,
  BlockChances,
  EditingBlockProvider,
  Workflow,
} from "@widgets/index";
import { TTab, useTabs } from "./hooks/useTabs";
import { useTranslation } from "react-i18next";
import ClientsIcon from "@/public/svg/user.svg";
import ArrowIcon from "@/public/svg/arrow.svg";
import { useProfileStore } from "@store/index";
import { useStore } from "zustand";
import { Profile } from "./Profile";
import { useGetUserById } from "@/app/shared/hooks/useGetUserById";
import { useGetWorkflow } from "@/app/shared/hooks/useGetWorkflow";
import { Document } from "./tableDocuments/Document";
import { DropdownList } from "./tableDocuments/ui/DropdownList";

type Props = { params: { userId: string } };

const Page = ({ params: { userId } }: Props) => {
  const [parentId, setParentId] = useState<number | null>(null);

  const { t } = useTranslation();
  const { tab, setTab, items } = useTabs({ defaultTab: "profile" });

  const { data, isLoading, fetchRecords } = useGetUserById({
    userId: Number(userId),
  });
  const { fetchWorkflow, workflow, loading, flag, setFlag } = useGetWorkflow({
    userId: Number(userId),
  });
  const pathName = usePathname().split("/");
  const profile = useStore(useProfileStore);

  useEffect(() => {
    fetchRecords();
    fetchWorkflow();
  }, [flag]);

  if (isLoading)
    return (
      <div
        className="w-full flex items-center justify-center"
        style={{ height: "calc(100vh - 3rem)" }}
      >
        <Loader />
      </div>
    );

  if (!data || data.roleType !== "Client") return notFound();

  const setParentIdAction = (parent: number | null) => setParentId(parent);
  return (
    <div>
      <EditingBlockProvider>
        <div className="flex flex-row gap-2 items-center" id="clientName">
          <Link
            href={pathName.slice(0, -1).join("/")}
            className="flex flex-row gap-2 items-center"
          >
            <ClientsIcon />
            <p className="text-sm text-gray font-semibold">
              {t("menuItems.clients")}
            </p>
          </Link>
          <ArrowIcon />
          <p className="text-sm font-semibold max-w-64 overflow-hidden text-ellipsis text-nowrap">{`${data.firstName} ${data.lastName}`}</p>
        </div>
        <div
          className={`grid ${tab === "docs" ? "grid-cols-none" : "grid-cols-[auto_272px]"} py-4 gap-6`}
        >
          <div>
            <div className="flex justify-between items-center">
              <Tabs
                className="mb-4"
                items={items}
                selected={tab}
                onChange={setTab}
              />

              {tab === "docs" && <DropdownList parentId={parentId} />}
            </div>
            <div className="h-full">
              {content[tab]({
                profile: data,
                role: profile?.roleType || "Administrator",
                setFlag,
                parentId,
                setParentIdAction,
              })}
            </div>
          </div>
          {tab !== "docs" && (
            <RightSide>
              <div className="flex flex-col gap-6 mt-14">
                <BlockUser
                  profile={data}
                  id="BlockUser"
                  isClient={false}
                  currTab={tab}
                />
                {!!workflow?.stages?.length && tab !== "progress" && (
                  <BlockProgress
                    profile={data}
                    workflow={workflow}
                    loading={loading}
                  />
                )}
                <BlockChances profile={data} id="BlockChances" />
              </div>
            </RightSide>
          )}
        </div>
      </EditingBlockProvider>
    </div>
  );
};

interface IRecordTab {
  profile: any;
  role: RoleType;
  setFlag?: (value: boolean) => void;
  parentId: number | null;
  setParentIdAction: (parent: number | null) => void;
}

const content: Record<string, React.FC<IRecordTab>> = {
  profile: ({ profile, role }) => <Profile profile={profile} role={role} />,
  progress: ({ profile, role, setFlag }) => (
    <div className="flex flex-col gap-6 h-full">
      <Workflow profile={profile} role={role} setFlag={setFlag!} />
    </div>
  ),
  docs: ({ parentId, setParentIdAction }) => (
    <div className="flex flex-col gap-6">
      <Document parentId={parentId} setParentIdAction={setParentIdAction} />
    </div>
  ),
};

export default Page;
