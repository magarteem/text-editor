"use client";

import { PropsWithChildren, useEffect } from "react";
import {
  BlockChances,
  BlockProgress,
  BlockUser,
  EditingBlockProvider,
} from "@widgets/index";
import { useProfileStore } from "@store/index";
import { useStore } from "zustand";
import { useGetWorkflow } from "@/app/shared/hooks/useGetWorkflow";
import LogoSmallImage from "@/public/svg/logo-small.svg";
import LogoSmallTextImage from "@/public/svg/logo-small-text.svg";
import { GetProfileResponse } from "@/app/shared";
import { useSearchParams } from "next/navigation";

export const ClientLayout = ({ children }: PropsWithChildren) => {
  const profile = useStore(useProfileStore);

  const { fetchWorkflow, workflow, loading, flag } = useGetWorkflow({
    userId: Number(!!profile && profile.id),
  });

  useEffect(() => {
    fetchWorkflow();
  }, [flag]);

  return (
    <main className="flex gap-4 px-6 overflow-scroll h-full" id="clientName">
      <EditingBlockProvider>
        <Sidebar profile={profile} />
        <div className="flex-1">{children}</div>
        <RightPanel profile={profile} workflow={workflow} loading={loading} />
      </EditingBlockProvider>
    </main>
  );
};

const Sidebar = ({ profile }: { profile: GetProfileResponse | null }) => {
  return (
    <div className="w-[272px] py-6 h-full">
      <div className="flex flex-col gap-4 pb-6">
        <div className="whitespace-nowrap flex flex-row items-center gap-2">
          <LogoSmallImage />
          <LogoSmallTextImage />
        </div>
        {profile && (
          <BlockUser profile={profile} id="BlockUser" isClient={true} />
        )}
      </div>
    </div>
  );
};

const RightPanel = ({
  profile,
  workflow,
  loading,
}: {
  profile: any;
  workflow: any;
  loading: boolean;
}) => {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "profile";

  if (currentTab === "notification" || currentTab === "settings") return;

  return (
    <div className="w-[272px] mt-14 py-6">
      <div className="flex flex-col gap-4">
        {profile && currentTab !== "progress" && (
          <BlockProgress
            profile={profile}
            loading={loading}
            workflow={workflow}
          />
        )}
        {profile && (
          <BlockChances profile={profile} id="BlockChances" isClient={true} />
        )}
      </div>
    </div>
  );
};
