import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface LeftSidebarState {
  collapsed: boolean;
}
export const useLeftSidebarStore = create<LeftSidebarState>()(
  persist(
    (_) => ({
      collapsed: false,
    }),
    {
      name: "sidebar-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
