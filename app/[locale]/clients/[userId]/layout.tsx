"use client";

import { ReactNode } from "react";
import { EditingBlockProvider } from "@/app/widgets";

interface Props {
  params: { userId: string };
  children: ReactNode;
}

export default async function Layout({ params: { userId }, children }: Props) {
  return (
    <div className="px-6 pt-6 min-h-full">
      <EditingBlockProvider>{children}</EditingBlockProvider>
    </div>
  );
}
