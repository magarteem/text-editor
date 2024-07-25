import { memo, PropsWithChildren, useEffect } from "react";
import { useBlockStore } from "@/app/features/block/store/useBlockStore";

interface Props {
  id?: string;
  isEditable: boolean;
  classNames?: string;
  style?: any;
}
export const Block = memo((props: PropsWithChildren<Props>) => {
  const { children, id, isEditable, classNames, style } = props;

  useEffect(() => {
    useBlockStore.setState({ editableId: isEditable ? id : null });
  }, [id, isEditable]);

  return (
    <div
      className={`bg-white p-6 rounded-table shadow-main flex flex-col gap-4 relative ${classNames}`}
      style={style}
    >
      {children}
    </div>
  );
});
