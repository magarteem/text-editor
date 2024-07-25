import { PropsWithChildren } from "react";

type TagColor = "purple" | "green";
interface Props {
  color: TagColor;
}
export const Tag = ({ children, color }: PropsWithChildren<Props>) => {
  const bg = bgColors[color];

  return (
    <div className={`px-2 rounded text-tag uppercase w-fit ${bg}`}>
      {children}
    </div>
  );
};

const bgColors: Record<TagColor, string> = {
  purple: "bg-purple-bright",
  green: "bg-green-light",
};
