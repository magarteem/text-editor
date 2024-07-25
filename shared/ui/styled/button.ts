import styled from "styled-components";
import { Button as AntdButton } from "antd";
import { StyledProps } from "@/shared/ui/types/button";

export const StyledButton = styled(AntdButton)<StyledProps>`
  height: ${({ theme, $size = "md" }) => theme.sizes[$size]};
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  box-shadow: none;

  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSize.md};

  padding: ${({ theme }) => theme.spacing.lg}
    ${({ theme }) => theme.spacing.xxl};

  border: none;
  border-radius: ${({ theme }) => theme.radius.lg};

  color: ${({ theme, $type = "primary" }) => theme.color[$type]};
  background-color: ${({ theme, $type = "primary" }) => theme.bgColor[$type]};

  &:hover {
    color: ${({ theme, $type = "primary" }) =>
      theme.hover.color[$type]} !important;
    background-color: ${({ theme, $type = "primary" }) =>
      theme.hover.bgColor[$type]} !important;
  }
  &:disabled {
    color: ${({ theme, $type = "primary" }) =>
      theme.disabled.color[$type]} !important;
    background-color: ${({ theme, $type = "primary" }) =>
      theme.disabled.bgColor[$type]} !important;
  }
`;
