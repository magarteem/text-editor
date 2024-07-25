import { Block } from "@/app/features/block/Block";
import { DropdownList } from "./ui/DropdownList";
import { TableDocumentTree } from "./ui/TableDocumentTree";
import { useContext, useEffect } from "react";
import { EditingBlockContext } from "@/app/widgets";

interface Props {
  parentId: number | null;
  setParentIdAction: (parent: number | null) => void;
}

export const Document = ({ parentId, setParentIdAction }: Props) => {
  const { handleCancelEdit } = useContext(EditingBlockContext);

  useEffect(() => {
    return handleCancelEdit();
  }, []);

  return (
    <Block isEditable={false} id="workflow" classNames="px-0">
      <div className="grid-template-columns: repeat(6, minmax(0, 1fr));">
        <div className="flex flex-col">
          <TableDocumentTree setParentIdAction={setParentIdAction} />

          <DropdownList parentId={parentId} />
        </div>
      </div>
    </Block>
  );
};
