import { ISvgProps } from "./type";
import Clipboard from "@/public/svg/clipboard.svg";
import ClipboardActive from "@/public/svg/clipboard-active.svg";

export const ClipboardIcon = (props: ISvgProps) => {
  return props.active ? (
    <ClipboardActive {...props} />
  ) : (
    <Clipboard {...props} />
  );
};
