import ChatSquare2 from "@/public/svg/chatSquare2.svg";
import ChatSquare2Active from "@/public/svg/chatSquare2-active.svg";
import { ISvgProps } from "./type";

export const ChatSquare2Icon = (props: ISvgProps) => {
  return props.active ? (
    <ChatSquare2Active {...props} />
  ) : (
    <ChatSquare2 {...props} />
  );
};
