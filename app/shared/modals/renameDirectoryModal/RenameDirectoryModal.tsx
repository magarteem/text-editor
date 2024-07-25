import { Button } from "../../ui";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FieldNameDirectory } from "./fields/FieldNameDirectory";
import { useModal } from "../modal/ModalProvider";
import { FieldVisibleDirectory } from "./fields/FieldVisibleDirectory";
import EditFile from "@/public/svg/edit-file.svg";
import { boolean, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryStorageMethods } from "../../hooks/useQueryStorageMethods";

interface ModalProps {
  id: number;
  fullName: string;
  visible: boolean;
}

const renameDirectorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "storage.formText.emptyErr")
    .max(32, "storage.formText.maxCharacters"),
  visible: boolean(),
});
type ValidationSchema = z.infer<typeof renameDirectorySchema>;

export function RenameDirectoryModal({ data }: { data: ModalProps }) {
  const { t } = useTranslation();
  const { closeModal } = useModal();
  const { renameDirectory } = useQueryStorageMethods();

  const form = useForm<ValidationSchema>({
    defaultValues: { name: data.fullName, visible: data.visible },
    resolver: zodResolver(renameDirectorySchema),
  });

  const onSubmit = async (dataForm: ValidationSchema) => {
    const dir = {
      id: data.id,
      name: dataForm.name,
      visible: dataForm.visible,
    };

    renameDirectory.mutate(dir, {
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
          {t("storage.modals.modalRenameDirectory")}
        </h1>

        <div className="gap-6 mt-4">
          <FieldNameDirectory form={form} />
        </div>

        <div className="flex-col gap-4 mt-4">
          <FieldVisibleDirectory form={form} />

          {data.visible && !form.watch("visible") && (
            <span className="inline-block text-xs font-normal text-orange-giants bg-yellow-deep-light px-4 leading-6 rounded-lg py-1 mt-[10px]">
              {t("storage.modals.visibleCatalog").split("^")[0]}&nbsp;
              {data.fullName}
              &nbsp;{" "}
              {
                (data.visible
                  ? t("storage.modals.visibleCatalog")
                  : t("storage.modals.visibleShow")
                ).split("^")[1]
              }
              ?
            </span>
          )}
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
