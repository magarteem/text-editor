import { useTranslation } from "react-i18next";
import { useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export type TTab =
  | "businessCard"
  | "safety"
  | "notifications"
  | "employees"
  | "actionLog"
  | "documentation";

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

export const useTabsSettings = ({
  defaultTab = "businessCard",
}: ITabsProps): ITabsReturn => {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentTab, setCurrentTab] = useState<TTab>(defaultTab);

  const tabs: ITab[] = useMemo(
    () => [
      { key: "businessCard", label: t("settings.tabs.businessCard") },
      { key: "safety", label: t("settings.tabs.safety") },
      { key: "notifications", label: t("settings.tabs.notifications") },
      { key: "employees", label: t("settings.tabs.employees") },
      { key: "actionLog", label: t("settings.tabs.actionLog") },
      { key: "documentation", label: t("settings.tabs.documentation") },
    ],
    [t]
  );

  useEffect(() => {
    const tabFromParams = searchParams.get("tab") as TTab | null;
    if (tabFromParams && tabs.some((tab) => tab.key === tabFromParams)) {
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
