import { useQueryCommentsMethod } from "@/app/shared/hooks/useQueryGetComments";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Arrow from "@/public/svg/arrow.svg";
import { z } from "zod";
import { Button } from "antd";
import styled from "styled-components";
import { CommentType } from "../types/types";
import { FieldsSendText } from "../fields/FieldsSendText";

interface Props {
  setEditComment?: (edit: boolean) => void;
  queryKey: string;
  apiUrlComments: string;
  props: CommentType;
}

export const EditCommitForm = ({
  setEditComment,
  queryKey,
  apiUrlComments,
  props,
}: Props) => {
  const { updateComment } = useQueryCommentsMethod({
    queryKey,
    apiUrlComments,
  });

  const renameDocument = z.object({
    text: z
      .string()
      .trim()
      .min(1)
      .max(2000, "storage.formText.limitCharacters"),
  });
  type ValidationSchema = z.infer<typeof renameDocument>;

  const form = useForm<ValidationSchema>({
    defaultValues: {
      text: props?.text,
    },
    resolver: zodResolver(renameDocument),
  });

  const onSubmit = async (dataForm: ValidationSchema) => {
    updateComment.mutate(
      { commentId: props.id, text: dataForm.text },
      {
        onSuccess() {
          setEditComment && setEditComment(false);
          form.setValue("text", "");
        },
        onError(err) {
          form.setError("text", { message: err.message });
        },
      }
    );
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
      <FieldsSendText form={form} />

      {form.watch("text") && (
        <div className="absolute h-5 w-5 right-3 bottom-3">
          <CustomButton
            htmlType="submit"
            size={"small"}
            type="primary"
            shape="circle"
            icon={<Arrow />}
          />
        </div>
      )}
    </form>
  );
};

const CustomButton = styled(Button)`
  border-radius: ${({ theme }) => theme.radius.xxl} !important;
  path {
    stroke: #fff;
  }
`;
