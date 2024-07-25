import { NavItem } from "@widgets/index";
import {
  UserIcon,
  BellIcon,
  UserGroupRoundedIcon,
  LibraryIcon,
  SettingsIcon,
} from "@icons/index";
import { useTranslation } from "react-i18next";
import { useQueryGetNotificationList } from "../hooks/useQueryNotificationMethods";

export function useMainSidebarItems() {
  const { t } = useTranslation();
  const { data } = useQueryGetNotificationList({
    page: 1,
    itemsPerPage: 10,
  });
  const counts = data
    ? data?.numberTypeOfNotification.numberTotalNotification -
      data?.numberTypeOfNotification.numberTotalNotificationRead
    : undefined;

  const menuItems: NavItem[] = [
    {
      key: "clients",
      label: t("menuItems.clients"),
      href: "/clients",
      icon: <UserIcon />,
      activeIcon: <UserIcon active={true} />,
    },
    {
      key: "notifications",
      label: t("menuItems.notifications"),
      href: "/notifications",
      icon: <BellIcon />,
      activeIcon: <BellIcon active={true} />,
      count: counts,
    },
    {
      key: "team",
      icon: <UserGroupRoundedIcon />,
      label: t("menuItems.team"),
      href: "/team",
      activeIcon: <UserGroupRoundedIcon active={true} />,
    },
    {
      key: "docs",
      icon: <LibraryIcon />,
      label: t("menuItems.docs"),
      href: "/docs",
      activeIcon: <LibraryIcon active={true} />,
    },
    {
      key: "docs",
      icon: <SettingsIcon />,
      label: t("menuItems.settings"),
      href: "/settings",
      activeIcon: <SettingsIcon active={true} />,
    },
  ];

  return menuItems;
}
