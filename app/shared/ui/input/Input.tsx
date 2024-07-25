import { forwardRef, InputHTMLAttributes } from "react";
import cn from "classnames";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "shadow-input p-2.5 pl-3 rounded-xl text-black-not-so text-sm",
        className,
      )}
      {...props}
    />
  );
});
