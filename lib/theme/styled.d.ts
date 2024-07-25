import "styled-components";
import { colors } from "@/lib/theme/const/colors";

export type TypeElements = "primary" | "secondary" | "warning" | "ghost";
export type SizesKeys = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export type ColorKeys = keyof typeof colors;

declare module "styled-components" {
  export interface DefaultTheme {
    color: Record<TypeElements, string>;
    bgColor: Record<TypeElements, string>;
    hover: {
      bgColor: Record<TypeElements, string>;
      color: Record<TypeElements, string>;
    };
    disabled: {
      bgColor: Record<TypeElements, string>;
      color: Record<TypeElements, string>;
    };
    fontSize: Record<SizesKeys, string>;
    spacing: Record<SizesKeys, string>;
    radius: Record<SizesKeys, string>;
    sizes: Record<SizesKeys, string>;
  }
}
