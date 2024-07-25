"use client";

import { useQueryGetNotificationList } from "@/app/shared/hooks/useQueryNotificationMethods";
import { LeftSide } from "@ui/index";
import { NavItem, MenuLogo, MenuNav, MenuCollapseButton } from "@widgets/index";
import { useEffect, useState } from "react";

type Props = {
  items: NavItem[];
};

export const LeftSidebar = ({ items }: Props) => {
  const [collapsed, setCollapsed] = useState(true);
  const collapsedHandler = () => {
    setCollapsed((prev: boolean) => !prev);
  };

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setCollapsed(false);
    }
  }, []);

  return (
    <LeftSide collapsed={collapsed}>
      <div className={"flex flex-col justify-between gap-6"}>
        <MenuLogo collapsed={collapsed} />

        <MenuNav items={items} collapsed={collapsed} />

        <MenuCollapseButton
          collapsed={collapsed}
          collapsedHandler={collapsedHandler}
        />
      </div>
    </LeftSide>
  );
};

// todo delete this func if it don't use
const getLinks = (items: NavItem[]): string[] => {
  return items.reduce<string[]>(
    (previousValue, currentValue) =>
      currentValue.type === "group" && currentValue.children
        ? [...previousValue, ...getLinks(currentValue.children)]
        : currentValue.href
          ? [...previousValue, currentValue.href]
          : previousValue,
    []
  );
};
