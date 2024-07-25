import { SizesKeys, TypeElements } from "@/lib/theme/styled";
import { ReactNode } from "react";
import { ButtonProps as AntdButtonProps } from "antd/es/button/button";

export type StyledProps = { $type?: TypeElements; $size?: SizesKeys };
export type ButtonProps = {
  rightIcon?: ReactNode;
} & Omit<AntdButtonProps, "size"> &
  StyledProps;
