import styled from "styled-components";
import { PropsWithChildren } from "react";
import { ColorKeys } from "@/lib/theme/styled";
import { colors } from "@/lib/theme/const/colors";

type Props = {
  bgColor?: ColorKeys;
  color?: ColorKeys;
};
export const DatePickerChip = ({
  children,
  bgColor,
  color,
}: PropsWithChildren<Props>) => {
  return (
    <Chip bgColor={bgColor} color={color}>
      {children}
    </Chip>
  );
};

const Chip = styled.div<{ bgColor?: ColorKeys; color?: ColorKeys }>`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 28px;
  box-sizing: inherit;
  white-space: nowrap;
  margin: 0 8px;

  border-radius: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};

  background-color: ${({ bgColor = "white" }) => colors[bgColor]};
  color: ${({ theme }) => theme.color.warning};
`;
