import classNames from "classnames";
import Link from "next/link";
import { MenuGroupItem, NavItem } from "@widgets/index";
import { usePathname } from "next/navigation";
import { useLink } from "@/app/shared/hooks/useLink";

interface Props {
  item: NavItem;
  collapsed: boolean;
}

export const MenuItem = ({ item, collapsed }: Props) => {
  const pathname = usePathname();
  const link = useLink({ href: item.href });

  const active = pathname.includes(item.href || "");

  if (item.type === "group") {
    return <MenuGroupItem item={item} collapsed={collapsed} />;
  }

  return (
    <li
      className={classNames({
        "hover:bg-blue-light flex": true,
        "transition-colors duration-300": true,
        "text-sm font-bold": true,
        "rounded-md p-2 gap-4": !collapsed,
        "rounded-lg p-2 w-10 h-10 justify-center": collapsed,
        "text-gray": !active,
        "bg-blue-light text-black-not-so": active,
      })}
    >
      {link ? (
        <Link
          href={link}
          className={classNames({
            "flex gap-2 w-full": true,
            "justify-center": collapsed,
          })}
        >
          <div className={"flex items-center justify-center"}>
            {active ? item.activeIcon : item.icon}
          </div>
          {!collapsed && (
            <div className="flex flex-nowrap text-nowrap">{item.label}</div>
          )}

          {!!item.count && (
            <span className="text-xs font-extrabold	 px-2 py-1 text-blue-highlight bg-blue-bright-highlight rounded-lg">
              {item.count}
            </span>
          )}
        </Link>
      ) : (
        <>
          <div className={"flex items-center justify-center"}>{item.icon}</div>
          {!collapsed && <div>{item.label}</div>}
        </>
      )}
    </li>
  );
};
