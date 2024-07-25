"use client";

import { useTranslation } from "react-i18next";
import { useMemo, useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useQueryGetNotificationList } from "@/app/shared/hooks/useQueryNotificationMethods";

export type TTab =
  | "profile"
  | "progress"
  | "docs"
  | "notification"
  | "settings";

interface ITab {
  key: TTab;
  label: string;
}

interface ITabsProps {
  defaultTab?: TTab;
}

interface ITabsReturn {
  items: ITab[];
  tab: TTab;
  setTab: (tab: TTab) => void;
}

export const useTabs = ({
  defaultTab = "profile",
}: ITabsProps): ITabsReturn => {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data } = useQueryGetNotificationList({
    page: 1,
    itemsPerPage: 10,
  });
  const counts = data
    ? data?.numberTypeOfNotification.numberTotalNotification -
      data?.numberTypeOfNotification.numberTotalNotificationRead
    : undefined;

  const tabs: ITab[] = useMemo(
    () => [
      { key: "profile", label: t("mainTabs.profile") },
      { key: "progress", label: t("mainTabs.progress") },
      { key: "docs", label: t("mainTabs.docs") },
      { key: "notification", label: t("mainTabs.notification"), count: counts },
      { key: "settings", label: t("menuItems.settings") },
    ],
    [t, counts]
  );

  const isValidTab = (tab: string): tab is TTab => {
    return tabs.some((t) => t.key === tab);
  };

  const getValidTab = (tab: string | null): TTab => {
    return tab && isValidTab(tab) ? tab : defaultTab;
  };

  const [currentTab, setCurrentTab] = useState<TTab>(() => {
    const tabFromParams = searchParams.get("tab");
    return getValidTab(tabFromParams);
  });

  const setTabWithParams = useCallback(
    (tab: TTab) => {
      const validTab = getValidTab(tab);
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", validTab);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
      setCurrentTab(validTab);
    },
    [router, searchParams, pathname]
  );

  useEffect(() => {
    const tabFromParams = searchParams.get("tab");
    const validTab = getValidTab(tabFromParams);
    if (validTab !== currentTab) {
      setCurrentTab(validTab);
    }
  }, [searchParams]);

  return { items: tabs, tab: currentTab, setTab: setTabWithParams };
};
