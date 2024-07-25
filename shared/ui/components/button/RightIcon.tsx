import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  icon?: ReactNode;
};
export const RightIcon = ({ icon }: Props) => {
  return icon ? <RightIconWrapper>{icon}</RightIconWrapper> : null;
};
const RightIconWrapper = styled.span`
  line-height: 0;
`;
