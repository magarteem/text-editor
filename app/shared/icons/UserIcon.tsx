import User from "@/public/svg/user.svg";
import UserActive from "@/public/svg/user-active.svg";
import { ISvgProps } from "./type";

export const UserIcon = (props: ISvgProps) => {
  return props.active ? <UserActive {...props} /> : <User {...props} />;
};
