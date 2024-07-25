import { ReactNode } from "react";

interface PropsWithChildren {
  children: ReactNode;
  classNames?: string;
}

export const Field = ({ children, classNames }: PropsWithChildren) => {
  return <div className={`flex flex-col gap-2 ${classNames}`}>{children}</div>;
};
