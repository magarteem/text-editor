"use client";
import { useAuth, useOrganizationList } from "@clerk/nextjs";
import { useEffect } from "react";

interface Props {
  membership?: Record<string, string>;
}
export const SyncActiveOrganizations = ({ membership }: Props) => {
  const { setActive, isLoaded } = useOrganizationList();
  const { orgId } = useAuth();

  const firstOrgId = Object.keys(membership ?? {})?.[0];

  useEffect(() => {
    if (!isLoaded) return;

    if (!orgId && firstOrgId) {
      void setActive({ organization: firstOrgId });
    }
  }, [firstOrgId, isLoaded, orgId, setActive]);

  return null;
};
