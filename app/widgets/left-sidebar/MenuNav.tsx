import classNames from "classnames";
import { MenuItem, MenuGroupItem, NavItem } from "@widgets/index";
import { Avatar } from "./Avatar";
import { useProfileStore } from "@/app/shared/store/profile/useProfileStore";
import { useStore } from "zustand";

type Props = {
  items: NavItem[];
  collapsed: boolean;
};

const role = ["Administrator", "Strategist"];

export const MenuNav = ({ items, collapsed }: Props) => {
  const profile = useStore(useProfileStore);
  const allowed = profile && role.includes(profile.roleType);
  const itemFilter = allowed ? items : items.filter((x) => x.href !== "/docs");

  return (
    <nav className={"flex-grow"}>
      <ul
        className={classNames({
          "my-2 flex flex-col gap-2 items-stretch": true,
        })}
      >
        {itemFilter.map((item) =>
          item.type === "group" ? (
            <MenuGroupItem key={item.key} item={item} collapsed={collapsed} />
          ) : (
            <MenuItem key={item.key} item={item} collapsed={collapsed} />
          )
        )}
      </ul>

      <Avatar collapsed={collapsed} />
    </nav>
  );
};
