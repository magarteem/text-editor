import styled from "styled-components";
import { StyledButton } from "./button";

export const StyledIconButton = styled(StyledButton)`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${({ theme, $size = "md" }) => theme.sizes[$size]} !important;
`;
