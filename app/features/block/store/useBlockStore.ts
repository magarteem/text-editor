import { create } from "zustand";

interface UseBlockStore {
  editableId: string | null;
}
export const useBlockStore = create<UseBlockStore>(() => ({
  editableId: null,
}));
