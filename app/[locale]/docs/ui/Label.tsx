import { LabelHTMLAttributes, PropsWithChildren } from "react";

export const Label = ({
  children,
  ...rest
}: PropsWithChildren<LabelHTMLAttributes<HTMLLabelElement>>) => {
  return (
    <label className={"text-gray text-sm font-semibold"} {...rest}>
      {children}
    </label>
  );
};
