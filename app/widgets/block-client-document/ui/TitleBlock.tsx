"use client";
import { PropsWithChildren } from "react";

interface TitleBlockProps {
  title: string;
  isActive?: boolean;
}

export const TitleBlock = (props: PropsWithChildren<TitleBlockProps>) => {
  const { children, title } = props;

  return (
    <div className="max-w-96 overflow-hidden text-ellipsis">
      <h1 className="mb-2 text-sm font-semibold text-gray">{title}</h1>
      {children}
    </div>
  );
};
