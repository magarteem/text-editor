import ChatLine from "@/public/svg/chat-line.svg";
import { useTranslation } from "react-i18next";
import { Block } from "@/app/features/block/Block";
import { CardsCommentsMain } from "./ui/CardsCommentsMain";
import { SendCommitForm } from "./SendCommitForm";
import { useContext, useEffect } from "react";
import { EditingBlockContext } from "../editing-block";

interface Props {
  stageId: string;
  queryKey: string;
  apiUrlComments: string;
  isWorkflow?: boolean;
}

export const BlockClientComment = ({
  stageId,
  queryKey,
  apiUrlComments,
  isWorkflow = false,
}: Props) => {
  const { t } = useTranslation();

  const { handleCancelEdit } = useContext(EditingBlockContext);

  useEffect(() => {
    return handleCancelEdit();
  }, []);

  return (
    <Block isEditable={false}>
      <div className="flex flex-row gap-2 items-center">
        <ChatLine />
        <h1 className="text-gray font-bold">
          {isWorkflow
            ? t("workflow.comments.title")
            : t("storage.comment.title")}
        </h1>
      </div>

      <CardsCommentsMain
        filesId={stageId}
        apiUrlComments={apiUrlComments}
        queryKey={queryKey}
        isWorkflow={isWorkflow}
      />
      <SendCommitForm
        filesId={stageId}
        apiUrlComments={apiUrlComments}
        queryKey={queryKey}
        isWorkflow={isWorkflow}
      />
    </Block>
  );
};
