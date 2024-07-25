import { PropsWithChildren } from "react";
import cn from "classnames";

interface Props {
  className?: string;
}
export const Main = ({ children, className }: PropsWithChildren<Props>) => {
  return (
    <main className={cn("h-full grid grid-cols-[min-content_auto]", className)}>
      {children}
    </main>
  );
};
