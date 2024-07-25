import { useTranslation } from "react-i18next";
import { useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export type TTab = "profile" | "progress" | "docs";

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

export const useTabs = ({ defaultTab = "profile" }: ITabsProps): ITabsReturn => {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [currentTab, setCurrentTab] = useState<TTab>(defaultTab);

  const tabs: ITab[] = useMemo(() => [
    { key: "profile", label: t("mainTabs.profile") },
    { key: "progress", label: t("mainTabs.progress") },
    { key: "docs", label: t("mainTabs.docs") },
  ], [t]);

  useEffect(() => {
    const tabFromParams = searchParams.get("tab") as TTab | null;
    if (tabFromParams && tabs.some(tab => tab.key === tabFromParams)) {
      setCurrentTab(tabFromParams);
    } else {
      setCurrentTab(defaultTab);
    }
  }, [searchParams, defaultTab]);

  const setTabWithParams = (tab: TTab) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.push(`?${params.toString()}`, { scroll: false });
    setCurrentTab(tab);
  };

  return { items: tabs, tab: currentTab, setTab: setTabWithParams };
};