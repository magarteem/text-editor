import Library from "@/public/svg/library.svg";
import LibraryActive from "@/public/svg/library-active.svg";
import { ISvgProps } from "./type";

export const LibraryIcon = (props: ISvgProps) => {
  return props.active ? <LibraryActive {...props} /> : <Library {...props} />;
};
