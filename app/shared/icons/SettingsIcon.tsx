import React from "react";
import { ISvgProps } from "./type";
import SettingsIconSvg from "@/public/svg/settings-icon.svg";
import SettingsIconActive from "@/public/svg/settings-icon-active.svg";

export function SettingsIcon(props: ISvgProps) {
  return props.active ? (
    <SettingsIconActive {...props} />
  ) : (
    <SettingsIconSvg {...props} />
  );
}
