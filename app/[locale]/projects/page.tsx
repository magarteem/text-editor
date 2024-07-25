import React from "react";
import { Metadata } from "next";
import { WipPage } from "@/app/shared/ui/pages";

export const metadata: Metadata = {
  title: "Проекты",
};

export default function Page() {
  return (
    <>
      <WipPage />
    </>
  );
}
