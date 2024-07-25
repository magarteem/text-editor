import { ReactNode } from "react";

export type NavItemType = "group";

export type NavItem = {
  label: string;
  key: string;
  href?: string;
  icon?: ReactNode;
  activeIcon?: ReactNode;
  children?: NavItem[];
  type?: NavItemType;
  count?: number;
};
