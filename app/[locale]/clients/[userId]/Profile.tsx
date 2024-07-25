"use client";

import {
  BlockApplicationDetails,
  BlockRecentDocs,
  BlockChosenUniversities,
  BlockExams,
  BlockEducation,
  EditingBlockContext,
} from "@widgets/index";
import { Props } from "@/app/widgets";
import { BlockCurator } from "@/app/widgets/block-curator";
import { RoleType } from "@/app/shared";
import { useContext, useEffect } from "react";

export function Profile({ profile, role }: Props & { role: RoleType }) {
  const { handleCancelEdit } = useContext(EditingBlockContext);

  useEffect(() => {
    return handleCancelEdit();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <BlockApplicationDetails
        profile={profile}
        id={"BlockApplicationDetails"}
      />
      <BlockChosenUniversities
        profile={profile}
        id={"BlockChosenUniversities"}
        isClient={false}
      />
      <BlockExams profile={profile} id={"BlockExams"} />
      <BlockEducation profile={profile} id={"BlockEducation"} />
      <BlockCurator profile={profile} id={"BlockCurator"} />
      <BlockRecentDocs profile={profile} />
    </div>
  );
}
