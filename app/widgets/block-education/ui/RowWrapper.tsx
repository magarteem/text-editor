import React, { ReactNode } from "react";

export function RowWrapper({
  text,
  children,
}: {
  text?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      {!!text && <h1 className="text-gray text-sm font-semibold">{text}</h1>}
      {children}
    </div>
  );
}
