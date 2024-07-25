import React, { createContext, useContext } from "react";

export interface EditingBlockState {
  editingBlockId: string | null;
  handleEditBlock?: any;
  handleCancelEdit?: any;
}

const EditingBlockContext = createContext<EditingBlockState>({
  editingBlockId: null,
});

const useEditingBlockContext = () => useContext(EditingBlockContext);

export { EditingBlockContext, useEditingBlockContext };
