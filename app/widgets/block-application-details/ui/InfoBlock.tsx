import { ProfileTag } from "@ui/index";

interface InfoBlockProps {
  title: string;
  text?: string;
  isActive?: boolean;
  isEmpty?: boolean;
}

export const InfoBlock = ({
  title,
  text,
  isActive,
  isEmpty,
}: InfoBlockProps) => {
  return isActive ? (
    <div className="max-w-96 overflow-hidden text-ellipsis" title={text}>
      <h1 className="mb-2 text-sm font-semibold text-gray">{title}</h1>
      <ProfileTag text={text ? text : ""} />
    </div>
  ) : (
    <div className="max-w-96 overflow-hidden text-ellipsis" title={text}>
      <h1 className={"mb-2 text-sm font-semibold text-gray"}>{title}</h1>
      <ProfileTag text={text ? text : ""} isEmpty={isEmpty ? isEmpty : false} />
    </div>
  );
};
