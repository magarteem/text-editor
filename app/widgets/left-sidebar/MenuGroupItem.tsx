import classNames from "classnames";
import { NavItem, MenuItem } from "@widgets/index";
import { useLeftSidebarStore } from "@/app/widgets/left-sidebar/store/useLeftSidebar";

interface Props {
  item: NavItem;
  collapsed: boolean;
}
export const MenuGroupItem = ({ item, collapsed }: Props) => {
  return (
    <div>
      <div
        className={classNames({
          "px-2 py-1 text-gray uppercase font-extrabold text-xs whitespace-nowrap":
            true,
          hidden: collapsed,
        })}
      >
        {item.label}
      </div>
      <ul>
        {item.children?.map((item) => (
          <MenuItem key={item.key} item={item} collapsed={collapsed} />
        ))}
      </ul>
    </div>
  );
};
