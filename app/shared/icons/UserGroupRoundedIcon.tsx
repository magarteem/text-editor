import { ISvgProps } from "./type";
import UserGroupRounded from "@/public/svg/usersGroupRounded.svg";
import UserGroupRoundedActive from "@/public/svg/userGroupRounded-active.svg";

export const UserGroupRoundedIcon = (props: ISvgProps) => {
  return props.active ? (
    <UserGroupRoundedActive {...props} />
  ) : (
    <UserGroupRounded {...props} />
  );
};
