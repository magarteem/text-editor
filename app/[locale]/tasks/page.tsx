import React from "react";
import { WipPage } from "@/app/shared/ui/pages";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Задачи",
};

export default function Page() {
  return (
    <>
      <WipPage />
    </>
  );
}
