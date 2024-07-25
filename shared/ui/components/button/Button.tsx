import { ButtonProps } from "@/shared/ui/types/button";
import { StyledButton } from "@/shared/ui/styled/button";
import { RightIcon } from "@/shared/ui/components/button/RightIcon";

export const Button = ({ children, rightIcon, ...rest }: ButtonProps) => {
  return (
    <StyledButton {...rest}>
      {children} <RightIcon icon={rightIcon} />
    </StyledButton>
  );
};
