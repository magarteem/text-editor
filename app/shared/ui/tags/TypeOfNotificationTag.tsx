import { Tag } from "antd";
import DockIcon from "@/public/svg/document-notify.svg";
import Rocket from "@/public/svg/rocket-notify.svg";
import Flag from "@/public/svg/flag-notify.svg";
import { TypeNotification } from "../../api";
import styled from "styled-components";

interface Props {
  type: TypeNotification;
}

export const TypeOfNotificationTag = ({ type }: Props) => {
  const libNotification = {
    Deadline: { icon: <CustomFlag />, bcg: "#FEE2E2" },
    Document: { icon: <DockIcon />, bcg: "#CFF7D5" },
    Progress: { icon: <Rocket />, bcg: "#E3DDFF" },
    System: { icon: <CustomFlag />, bcg: "#FEE2E2" },
  };

  return (
    <Tag
      color={libNotification[type].bcg}
      className="w-6 h-6 flex items-center justify-center rounded-lg mx-0"
    >
      <div>{libNotification[type].icon}</div>
    </Tag>
  );
};

const CustomFlag = styled(Flag)`
  stroke: #ff0000;
`;
