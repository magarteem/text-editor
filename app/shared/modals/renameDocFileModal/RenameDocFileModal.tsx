import { Button } from "../../ui";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useModal } from "../modal/ModalProvider";
import EditFile from "@/public/svg/edit-file.svg";
import { FieldNameDocument } from "./fields";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryStorageMethods } from "../../hooks/useQueryStorageMethods";

interface ModalProps {
  id: number;
  fullName: string;
  link: string | null;
}

const renameDocument = z.object({
  name: z
    .string()
    .trim()
    .min(1, "storage.formText.emptyErr")
    .max(32, "storage.formText.maxCharacters"),
});

type ValidationSchema = z.infer<typeof renameDocument>;

export function RenameDocFileModal({ data }: { data: ModalProps }) {
  const { t } = useTranslation();
  const { closeModal } = useModal();
  const { updateFileData } = useQueryStorageMethods();

  const lastIndex = data.fullName.lastIndexOf(".");
  const prefixFormat =
    !data.link && lastIndex > 1 ? data.fullName.substring(lastIndex) : "";

  const form = useForm<ValidationSchema>({
    defaultValues: {
      name: data.link ? data.fullName : data.fullName.slice(0, lastIndex),
    },
    resolver: zodResolver(renameDocument),
  });
  const onSubmit = async (dataForm: ValidationSchema) => {
    const dir = {
      fileId: data.id,
      originalName: dataForm.name + prefixFormat,
    };

    updateFileData.mutate(dir, {
      onSuccess() {
        closeModal();
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
          <EditFile />
          {t("storage.modals.modalRenameDocFile")}
        </h1>

        <div className="gap-6 mt-4">
          <FieldNameDocument form={form} prefixFormat={prefixFormat} />
        </div>

        <div className="flex flex-row justify-center gap-6 items-center mt-8">
          <Button type={"button"} $type={"secondary"} onClick={closeModal}>
            {t("button.cancel")}
          </Button>
          <Button type={"submit"}>
            <p>{t("button.save")}</p>
          </Button>
        </div>
      </form>
    </div>
  );
}
