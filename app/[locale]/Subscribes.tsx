"use client";

import { useBeforeUnload } from "@/app/shared/hooks/useBeforeUnload";

export const Subscribes = () => {
  useBeforeUnload();

  return null;
};
