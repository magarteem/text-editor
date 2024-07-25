import { ISvgProps } from "./type";
import Notebook from "@/public/svg/notebook.svg";
import NotebookActive from "@/public/svg/notebook-active.svg";

export const NotebookIcon = (props: ISvgProps) => {
  return props.active ? <NotebookActive {...props} /> : <Notebook {...props} />;
};
