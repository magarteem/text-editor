import { ProfileTag } from "@ui/index";
import { ReactNode } from "react";

interface InfoBlockProps {
  title: string;
  text?: string;
  isActive?: boolean;
  isEmpty?: boolean;
  element?: ReactNode;
}

export const InfoBlock = ({
  title,
  text,
  isActive,
  isEmpty,
  element,
}: InfoBlockProps) => {
  return isActive ? (
    <div className="max-w-96 overflow-hidden text-ellipsis" title={text}>
      <h1 className="mb-2 text-sm font-semibold text-gray">{title}</h1>
      {element && element}
      <ProfileTag text={text ? text : ""} />
    </div>
  ) : (
    <div className="max-w-96 overflow-hidden text-ellipsis" title={text}>
      <h1 className={"mb-2 text-sm font-semibold text-gray"}>{title}</h1>
      <ProfileTag text={text ? text : ""} isEmpty={isEmpty ? isEmpty : false} />
    </div>
  );
};
