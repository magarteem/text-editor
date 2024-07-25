import { PropsWithChildren } from "react";

export const Field = ({ children }: PropsWithChildren<any>) => {
  return <div className={"flex flex-col gap-2"}>{children}</div>;
};
