"use client";

import React from "react";
import { ClientPage } from "./ClientPage";
import { useStore } from "zustand";
import { useProfileStore } from "@store/index";
import { usePathname, redirect } from "next/navigation";

export default function Page() {
  const profile = useStore(useProfileStore);
  const pathName = usePathname();

  if (!profile) {
    return <div>User Not Found</div>;
  }

  if (profile.roleType === "Administrator") {
    return redirect(pathName.substring(0, 4) + "/clients");
  }
  if (profile.roleType === "Curator") {
    return redirect(pathName.substring(0, 4) + "/clients");
  }
  if (profile.roleType === "Strategist") {
    return redirect(pathName.substring(0, 4) + "/clients");
  }
  if (profile.roleType === "Client") {
    return <ClientPage profile={profile} />;
  }

  return null;
}
