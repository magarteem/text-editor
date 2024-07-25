import { useProfileStore } from "@store/index";
import { useStore } from "zustand";
import { UserProfile } from "@/app/shared/ui/user";
import { TypeOfCommentsTag } from "@/app/shared/ui/tags/TypeOfCommentsTag";
import TrashIcon from "@/public/svg/trash-icon.svg";
import BigPenIcon from "@/public/svg/big-pen.svg";
import { format } from "date-fns";
import { useQueryCommentsMethod } from "@/app/shared/hooks/useQueryGetComments";
import { CommentType } from "../types/types";

interface Props {
  openUpdate: () => void;
  queryKey: string;
  apiUrlComments: string;
  props: CommentType;
}

export const AuthorComments = ({
  openUpdate,
  queryKey,
  apiUrlComments,
  props: { id, created, user },
}: Props) => {
  const profile = useStore(useProfileStore);
  const formattedDate = format(new Date(created * 1000), "dd.MM.yyyy, HH:mm");
  const { deleteComment } = useQueryCommentsMethod({
    queryKey,
    apiUrlComments,
  });
  const delComment = () => deleteComment.mutate(id);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <UserProfile
          firstName={user.firstName}
          lastName={user.lastName}
          imageUrl={user.imageUrl}
        />
        <div>
          <TypeOfCommentsTag type={user.role} />
        </div>
        <div>
          <p className="text-sm	font-medium  text-gray">{formattedDate}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {profile?.id === user.id && (
          <button type="button" onClick={openUpdate}>
            <BigPenIcon />
          </button>
        )}

        {(profile?.roleType === "Administrator" || profile?.id === user.id) && (
          <button type="button" onClick={delComment}>
            <TrashIcon />
          </button>
        )}
      </div>
    </div>
  );
};
