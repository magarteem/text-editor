"use client";

import { PropsWithChildren } from "react";
import { AdminLayout } from "../admin-layout/AdminLayout";
import { ClientLayout } from "../client-layout/ClientLayout";
import { useStore } from "zustand";
import { useProfileStore } from "@store/index";

export const MainLayout = ({ children }: PropsWithChildren) => {
  const profile = useStore(useProfileStore);

  if (profile?.roleType === "Administrator") {
    return <AdminLayout>{children}</AdminLayout>;
  }
  if (profile?.roleType === "Curator") {
    return <AdminLayout>{children}</AdminLayout>;
  }
  if (profile?.roleType === "Strategist") {
    return <AdminLayout>{children}</AdminLayout>;
  }
  if (profile?.roleType === "Client") {
    return <ClientLayout>{children}</ClientLayout>;
  }

  return null;
};
