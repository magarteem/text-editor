import { ButtonHTMLAttributes, ReactNode } from "react";
import cn from "classnames";

type IconButtonType = "primary" | "ghost";
type IconButtonSize = "md" | "xs";
interface Props
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  icon?: ReactNode;
  $type?: IconButtonType;
  $size?: IconButtonSize;
}
export const IconButton = ({
  $type = "primary",
  $size = "md",
  icon,
  className,
  ...props
}: Props) => {
  const type = typeClasses[$type];
  const size = sizeClasses[$size];

  return (
    <button
      className={cn(
        {
          "flex items-center justify-center": true,
          [size]: true,
          [type]: true,
        },
        className,
      )}
      {...props}
    >
      {icon}
    </button>
  );
};

const typeClasses: Record<IconButtonType, string> = {
  primary: "bg-blue-highlight text-white hover:bg-blue-marian",
  ghost: "bg-transparent hover:bg-hover-white",
};
const sizeClasses: Record<IconButtonSize, string> = {
  md: "h-10 w-10 rounded-lg",
  xs: "h-6 w-6 rounded-lg",
};
