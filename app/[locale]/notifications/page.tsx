"use client";

import React, { useEffect } from "react";
import { useStore } from "zustand";
import { useProfileStore } from "@/app/shared/store/profile/useProfileStore";
import { notFound } from "next/navigation";
import { NotificationPage } from "./NotificationPage";

export default function Page() {
  const profile = useStore(useProfileStore);

  useEffect(() => {
    document.title = "Уведомления";
  }, []);

  if (!profile) {
    return notFound();
  }

  if (profile.roleType === "Administrator") {
    return <NotificationPage />;
  }

  if (profile.roleType === "Strategist") {
    return <NotificationPage />;
  }
  if (profile.roleType === "Curator") {
    return <NotificationPage />;
  }

  if (profile.roleType === "Client") {
    return notFound();
  }

  return null;
}
