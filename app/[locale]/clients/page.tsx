"use client";

import React, { useEffect } from "react";
import { AdminPage } from "./AdminPage";
import { useStore } from "zustand";
import { useProfileStore } from "@store/index";
import { notFound } from "next/navigation";

export default function Page() {
  useEffect(() => {
    document.title = "Клиенты";
  }, []);

  const profile = useStore(useProfileStore);

  if (!profile) {
    return notFound();
  }

  if (profile.roleType === "Administrator") {
    return <AdminPage />;
  }
  if (profile.roleType === "Curator") {
    return <AdminPage />;
  }
  if (profile.roleType === "Strategist") {
    return <AdminPage />;
  }
  if (profile.roleType === "Client") {
    return notFound();
  }

  return null;
}
