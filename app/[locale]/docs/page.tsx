"use client";

import React, { useEffect } from "react";
import { useStore } from "zustand";
import { useProfileStore } from "@/app/shared/store/profile/useProfileStore";
import { notFound } from "next/navigation";
import { QaPage } from "./QaPage";

export default function Page() {
  const profile = useStore(useProfileStore);

  useEffect(() => {
    document.title = "Контроль качества";
  }, []);

  if (!profile) {
    return notFound();
  }

  if (profile.roleType === "Administrator") {
    return <QaPage profile={profile} />;
  }

  if (profile.roleType === "Strategist") {
    return <QaPage profile={profile} />;
  }
  if (profile.roleType === "Client" || profile.roleType === "Curator") {
    return notFound();
  }

  return null;
}
