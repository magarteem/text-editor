import { AuthorComments } from "./AuthorComments";
import { CommentType } from "../types/types";
import { useState } from "react";
import { EditCommitForm } from "./EditCommitForm";
import { Manrope } from "next/font/google";
import cn from "classnames";
import Link from "next/link";

const manrope = Manrope({ subsets: ["latin", "cyrillic"] });
interface Props {
  item: CommentType;
  queryKey: string;
  apiUrlComments: string;
}

export const CardsComments = ({ item, queryKey, apiUrlComments }: Props) => {
  const [editComment, setEditComment] = useState(false);
  const openUpdate = () => setEditComment((prev) => !prev);

  const findLinksAndWrap = (text: string) => {
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlPattern);

    return parts.map((part, index) => {
      if (urlPattern.test(part)) {
        return (
          <Link
            key={index}
            href={part}
            target="_blank"
            className="text-blue-highlight text-sm font-bold"
          >
            {part}
          </Link>
        );
      }
      return part;
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <AuthorComments
        openUpdate={openUpdate}
        props={item}
        apiUrlComments={apiUrlComments}
        queryKey={queryKey}
      />

      {editComment ? (
        <EditCommitForm
          setEditComment={setEditComment}
          props={item}
          apiUrlComments={apiUrlComments}
          queryKey={queryKey}
        />
      ) : (
        <pre
          className={cn(
            manrope.className,
            "text-sm	font-medium  text-black-not-so whitespace-pre-wrap break-all"
          )}
        >
          {findLinksAndWrap(item.text)}
        </pre>
      )}
    </div>
  );
};
