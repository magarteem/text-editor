import { DefaultTheme } from "styled-components";
import { colors } from "@/lib/theme/const/colors";
import { sizes } from "@/lib/theme/const/sizes";
import { spacing } from "@/lib/theme/const/spacing";
import { radius } from "@/lib/theme/const/radius";
import { fontSize } from "@/lib/theme/const/fontSize";

export type ThemeMode = "light";

const baseTheme: DefaultTheme = {
  color: {
    primary: colors.white,
    secondary: colors.blackNotSo,
    warning: colors.white,
    ghost: colors.blueHighlight,
  },
  bgColor: {
    primary: colors.blueHighlight,
    secondary: colors.blueLight,
    warning: colors.red,
    ghost: "transparent",
  },
  hover: {
    bgColor: {
      primary: colors.blueMarian,
      secondary: colors.blueBrightHighlight,
      warning: colors.redSaturated,
      ghost: "transparent",
    },
    color: {
      primary: colors.white,
      secondary: colors.blackNotSo,
      warning: colors.white,
      ghost: colors.blueMarian,
    },
  },
  disabled: {
    bgColor: {
      primary: colors.grayBright,
      secondary: colors.grayBright,
      warning: colors.grayBright,
      ghost: "transparent",
    },
    color: {
      primary: colors.greyLight,
      secondary: colors.greyLight,
      warning: colors.greyLight,
      ghost: colors.greyLight,
    },
  },
  fontSize,
  radius,
  spacing,
  sizes,
};

export const themes: Record<ThemeMode, DefaultTheme> = {
  light: baseTheme,
};
