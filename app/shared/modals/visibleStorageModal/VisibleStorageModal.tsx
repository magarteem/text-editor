import { Button } from "../../ui";
import { useTranslation } from "react-i18next";
import AttentionIcon from "@/public/svg/attention-icon.svg";
import { useModal } from "../modal/ModalProvider";
import { useQueryStorageMethods } from "../../hooks/useQueryStorageMethods";

interface Props {
  id: number;
  mimeType: "text/plain" | "directory";
  visible: boolean;
  originalName: string;
}

export function VisibleStorageModal({ data }: { data: Props }) {
  const { t } = useTranslation();
  const { updateFileData, renameDirectory } = useQueryStorageMethods();
  const { closeModal } = useModal();

  const onSubmit = () => {
    if (data.mimeType == "directory") {
      const dir = {
        id: data.id,
        visible: !data.visible,
      };
      renameDirectory.mutate(dir, {
        onSuccess() {
          closeModal();
        },
      });
    } else {
      const dir = {
        fileId: data.id,
        visible: !data.visible,
      };
      updateFileData.mutate(dir, {
        onSuccess() {
          closeModal();
        },
      });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="absolute top-4 left-4 font-semibold flex flex-row gap-2 items-center">
        <AttentionIcon />
        <p>{t("workflow.attention")}</p>
      </div>

      <div className="flex flex-col gap-4 mt-5  items-center">
        <p className="text-sm font-normal">
          {t("storage.modals.visibleHidden").split("^")[0]}&nbsp;
          <span className="font-semibold max-w-32 overflow-hidden text-ellipsis">
            {data.originalName}
          </span>
          &nbsp;{" "}
          {
            (data.visible
              ? t("storage.modals.visibleHidden")
              : t("storage.modals.visibleShow")
            ).split("^")[1]
          }
          ?
        </p>
        <div className="flex flex-row gap-4">
          <Button type={"button"} $type={"secondary"} onClick={closeModal}>
            {t("button.cancel")}
          </Button>
          <Button type={"submit"} $type="primary" onClick={onSubmit}>
            <p>{data.visible ? t("button.hide") : t("button.visible")}</p>
          </Button>
        </div>
      </div>
    </div>
  );
}
