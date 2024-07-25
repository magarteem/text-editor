import { DocTypeLink } from "../helpers/dataDocument";
import Link from "next/link";

interface Props {
  item: DocTypeLink;
  text: string;
}

export const ItemDocument = ({ item, text }: Props) => {
  return (
    <div className="flex items-center gap-2 text-blue-highlight text-sm leading-6 ">
      <span>{item.id}</span>
      <Link target="_blank" href={item.link}>
        {text}
      </Link>
    </div>
  );
};
