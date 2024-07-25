import { memo, ReactNode, useEffect, useState } from "react";
import cn from "classnames";

export interface Tab {
  key: string;
  label: ReactNode;
  count?: number;
}
interface Props {
  items: Tab[];
  selected: string;
  onChange(selected: string): void;
  className?: string;
}
export const Tabs = memo((props: Props) => {
  const { className, items, selected, onChange } = props;
  const [activeItem, setActiveItem] = useState<string>(selected);

  useEffect(() => {
    onChange(activeItem);
  }, [onChange, activeItem]);

  return (
    <div className={cn("flex text-sm font-bold text-gray", className)}>
      {items.map((item) => (
        <div
          id={item.key}
          key={item.key}
          className={cn("flex gap-2", {
            "px-4 py-2 cursor-pointer leading-6": true,
            "bg-blue-light text-black-not-so rounded-xl":
              item.key === activeItem,
          })}
          onClick={() => setActiveItem(item.key)}
        >
          {item.label}
          {!!item.count && (
            <span className="text-xs font-extrabold	 px-2 py-1 text-blue-highlight bg-blue-bright-highlight rounded-lg">
              {item.count}
            </span>
          )}
        </div>
      ))}
    </div>
  );
});
