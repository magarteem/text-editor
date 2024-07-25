import { ButtonHTMLAttributes, ReactNode } from "react";
import cn from "classnames";

type ButtonTypes = "primary" | "secondary" | "danger";
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  iconRight?: ReactNode;
  $type?: ButtonTypes;
}
export const Button = ({
  $type = "primary",
  icon,
  iconRight,
  className,
  ...props
}: Props) => {
  return (
    <button
      className={cn(
        className,
        `px-4 py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 h-10 ${types[$type]}
        ${props.disabled ? "bg-gray-bright  hover:bg-gray-bright" : ""}`
      )}
      {...props}
    >
      {icon && <div className={"flex items-center h-full"}>{icon}</div>}
      {props.children}
      {iconRight && (
        <div className={"flex items-center h-full"}>{iconRight}</div>
      )}
    </button>
  );
};

const types: Record<ButtonTypes, string> = {
  primary: "bg-blue-highlight hover:bg-blue-marian text-white",
  secondary: "bg-blue-light hover:bg-blue-bright-highlight text-black",
  danger: "bg-red hover:bg-red-saturated text-white",
};
