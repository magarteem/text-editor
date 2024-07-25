"use client";

import { useGetProfile } from "@/app/shared/hooks/useGetProfile";

export const DataFetching = () => {
  useGetProfile();

  return null;
};