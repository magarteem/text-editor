import { Button } from "../../ui";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FieldNameDirectory } from "./fields/FieldNameDirectory";
import { useModal } from "../modal/ModalProvider";
import { FieldVisibleDirectory } from "./fields/FieldVisibleDirectory";
import { useParams } from "next/navigation";
import AddSquare from "@/public/svg/add-square.svg";
import { useQueryStorageMethods } from "../../hooks/useQueryStorageMethods";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

interface Props {
  parentId: number;
}

const createDirectoryZod = z.object({
  directory: z
    .string({ required_error: "storage.formText.emptyErr" })
    .min(1, "storage.formText.emptyErr")
    .max(32, "storage.formText.maxCharacters"),
  visible: z.boolean(),
});
export type ValidationSchema = z.infer<typeof createDirectoryZod>;

export function CreateNewDirectoryModal({ data }: { data: Props }) {
  const [pendingUpload, setPendingUpload] = useState(false);
  const { t } = useTranslation();
  const { closeModal } = useModal();
  const { userId }: { userId: string } = useParams();
  const { createDirectory } = useQueryStorageMethods();

  const form = useForm<ValidationSchema>({
    defaultValues: { directory: "", visible: false },
    resolver: zodResolver(createDirectoryZod),
  });

  const onSubmit = async (dataForm: ValidationSchema) => {
    setPendingUpload(true);

    const dir = {
      parentId: data.parentId ?? null,
      ownerId: userId,
      name: dataForm.directory,
      visible: dataForm.visible,
    };

    createDirectory.mutate(dir, {
      onSuccess() {
        closeModal();
      },
      onError() {
        setPendingUpload(false);
      },
    });
  };

  return (
    <div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-[628px]"
      >
        <h1 className={"flex items-center gap-2 text-gray text-base font-bold"}>
          <AddSquare />
          {t("storage.formText.titleFormCreateDirectory")}
        </h1>

        <div className="gap-6 mt-4">
          <FieldNameDirectory form={form} />
        </div>

        <div className="flex-col gap-4 mt-4">
          <FieldVisibleDirectory form={form} />
        </div>

        <div className="flex flex-row justify-center gap-6 items-center mt-8">
          <Button type={"button"} $type={"secondary"} onClick={closeModal}>
            {t("button.cancel")}
          </Button>
          <Button
            type={"submit"}
            disabled={!form.formState.isDirty || pendingUpload}
          >
            <p
              className={
                !form.formState.isDirty || pendingUpload
                  ? "text-grey-light"
                  : ""
              }
            >
              {t("button.save")}
            </p>
          </Button>
        </div>
      </form>
    </div>
  );
}
