import { PropsWithChildren } from "react";
import cn from "classnames";

interface Props {
  className?: string;
  collapsed?: boolean;
}
export const LeftSide = ({
  children,
  className,
  collapsed,
}: PropsWithChildren<Props>) => {
  return (
    <div
      className={cn(
        {
          "lg:grid-cols-[272px]": !collapsed,
          "lg:grid-cols-[40px]": collapsed,
          "grid p-6 min-h-screen transition-[grid-template-columns] duration-300 ease-in-out grid-cols-[40px] overflow-clip":
            true,
        },
        className
      )}
    >
      {children}
    </div>
  );
};
