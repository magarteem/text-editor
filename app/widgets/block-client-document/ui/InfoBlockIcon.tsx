import { ReactNode } from "react";

interface InfoBlockIconProps {
  title: string;
  text?: string;
  isActive?: boolean;
  isEmpty?: boolean;
  element?: ReactNode;
}

export const InfoBlockIcon = ({
  title,
  text,
  isActive,
  isEmpty,
  element,
}: InfoBlockIconProps) => {
  return (
    <div className="overflow-hidden text-ellipsis" title={text}>
      <h1 className={"mb-2 text-sm font-semibold text-gray"}>{title}</h1>

      <span
        className={`inline-flex items-center gap-3 text-sm px-2 bg-gray-bright rounded-lg text-ellipsis whitespace-nowrap ${isEmpty ? "text-grey-light" : ""}`}
      >
        {text}
        {element && element}
      </span>
    </div>
  );
};
