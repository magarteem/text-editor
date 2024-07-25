import { TypeNotification } from "@/app/shared";
import DockIcon from "@/public/svg/dock-icon.svg";
import Rocket from "@/public/svg/rocket-notify.svg";
import Flag from "@/public/svg/flag-notify.svg";
import { ReactNode } from "react";
import styled from "styled-components";

export interface MenuElementType {
  id: TypeNotification;
  name: string;
  icon?: ReactNode;
}

const CustomRocket = styled(Rocket)`
  stroke: #626c76;
  stroke-width: 0.5;
`;
const CustomFlag = styled(Flag)`
  stroke: #626c76;
  stroke-width: 1.5;
`;

export const menu: MenuElementType[] = [
  { id: "System", name: "notification.header.all" },
  {
    id: "Deadline",
    name: "notification.header.deadline",
    icon: <CustomFlag />,
  },
  {
    id: "Document",
    name: "notification.header.docs",
    icon: <DockIcon />,
  },
  {
    id: "Progress",
    name: "notification.header.progress",
    icon: <CustomRocket />,
  },
];
