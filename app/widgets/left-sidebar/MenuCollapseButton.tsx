import { AltArrowLeftIcon } from "@icons/index";
import classNames from "classnames";

export const MenuCollapseButton = ({
  collapsedHandler,
  collapsed,
}: {
  collapsed: boolean;
  collapsedHandler: () => void;
}) => {
  return (
    <div
      className={classNames({
        "cursor-pointer hidden lg:flex": true,
        "text-sm font-bold text-black-not-so": true,
        "w-full bg-blue-light rounded-xl py-2": true,
        "flex justify-between items-center": true,
        "pl-4 pr-2": !collapsed,
        "px-2": collapsed,
      })}
      onClick={collapsedHandler}
    >
      <div
        className={classNames({
          hidden: collapsed,
        })}
      >
        Свернуть
      </div>
      <div
        className={classNames({
          "-rotate-180": collapsed,
        })}
      >
        <AltArrowLeftIcon className={"w-6 h-6"} />
      </div>
    </div>
  );
};
