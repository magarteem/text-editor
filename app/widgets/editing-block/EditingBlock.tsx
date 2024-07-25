import React, { PropsWithChildren, useState } from "react";
import { EditingBlockContext, EditingBlockState } from "./EditingBlockContext";

const EditingBlockProvider = ({ children }: PropsWithChildren) => {
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null);

  const handleEditBlock = (id: string) => {
    setEditingBlockId(id);
  };

  const handleSaveBlock = (id: string) => {
    setEditingBlockId(null);
  };

  const handleCancelEdit = () => {
    setEditingBlockId(null);
  };

  const value: EditingBlockState & {
    handleEditBlock: (id: string) => void;
    handleSaveBlock: (id: string) => void;
    handleCancelEdit: () => void;
  } = {
    editingBlockId,
    handleEditBlock,
    handleSaveBlock,
    handleCancelEdit,
  };

  return (
    <EditingBlockContext.Provider value={value}>
      {children}
    </EditingBlockContext.Provider>
  );
};

export { EditingBlockProvider };
