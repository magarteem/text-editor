import Bell from "@/public/svg/bell.svg";
import BellActive from "@/public/svg/bell-active.svg";
import { ISvgProps } from "./type";

export const BellIcon = (props: ISvgProps) => {
  return props.active ? <BellActive {...props} /> : <Bell {...props} />;
};
