import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@ui/index";
import AttentionIcon from "@/public/svg/attention-icon.svg";
import { useTranslation } from "react-i18next";
import { useModal } from "../modal/ModalProvider";
import { AxiosResponse } from "axios";
import { useQueryStorageMethods } from "../../hooks/useQueryStorageMethods";

interface Props {
  id: number;
  fullName: string;
  mimeType: "text/plain" | "directory";
}
export function RemoveDirectoryModal({ data }: { data: Props }) {
  const { deleteDirectory, deleteFile } = useQueryStorageMethods();
  const { t } = useTranslation();
  const { closeModal } = useModal();
  const file = data.mimeType === "directory";

  const form = useForm({
    defaultValues: {
      id: data.id,
    },
  });

  const onSubmit = async (data: { id: number }) => {
    file
      ? deleteDirectory.mutate(data.id, {
          onSuccess() {
            closeModal();
          },
        })
      : deleteFile.mutate(data.id, {
          onSuccess() {
            closeModal();
          },
        });
  };

  return (
    <div className="flex flex-col">
      <div className="absolute top-4 left-4 font-semibold flex flex-row gap-2 items-center">
        <AttentionIcon />
        <p>{t("workflow.attention")}</p>
      </div>
      <FormProvider {...form}>
        <form
          className="flex flex-col gap-4 mt-10 text-center items-center justify-center"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="text-sm font-normal flex flex-row text-nowrap">
            <p>
              {t(
                `storage.modals.${file ? "modalRemoveDirectory" : "modalRemoveDocument"}`
              )}
            </p>
            &nbsp;
            <p className="font-semibold max-w-32 overflow-hidden text-ellipsis">
              {data.fullName}
            </p>
            ?
          </div>
          <div className="flex flex-row gap-4">
            <Button type={"button"} $type={"secondary"} onClick={closeModal}>
              {t("button.cancel")}
            </Button>
            <Button type={"submit"} $type="danger">
              <p>{t("button.remove")}</p>
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
