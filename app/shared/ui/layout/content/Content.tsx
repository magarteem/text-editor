import { PropsWithChildren } from "react";
import cn from "classnames";

interface Props {
  className?: string;
}
export const Content = ({ children, className }: PropsWithChildren<Props>) => {
  return (
    <div className={cn("h-full overflow-y-auto", className)}>{children}</div>
  );
};
