"use client";

import { PropsWithChildren } from "react";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";
import { useThemeModeStore } from "@/lib/theme/store/useThemeStore";
import useStore from "@/lib/zustand/hooks/useStore";
import { themes } from "@/lib/theme/theme";

export function ThemeProvider({ children }: PropsWithChildren) {
  const mode = useStore(useThemeModeStore, (state) => state.mode);

  if (!mode) {
    return null;
  }

  return (
    <StyledComponentsThemeProvider theme={themes[mode]}>
      {children}
    </StyledComponentsThemeProvider>
  );
}
