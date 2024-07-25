import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ThemeMode } from "@/lib/theme/theme";

export const useThemeModeStore = create<Record<"mode", ThemeMode>>()(
  persist((_) => ({ mode: "light" }), {
    name: "theme-mode",
    storage: createJSONStorage(() => localStorage),
  }),
);
