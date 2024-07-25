import React from "react";
import { useModal } from "../modal/ModalProvider";
import { useTranslation } from "react-i18next";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@ui/index";
import AttentionIcon from "@/public/svg/attention-icon.svg";
import { useRemoveWorkflow } from "../../hooks/useRemoveWorkflow";

export function RemoveWorkflowModal({ data }: { data: any }) {
  const { t } = useTranslation();

  const { closeModal } = useModal();
  const { removeWorkflow } = useRemoveWorkflow();

  const form = useForm({});

  const onSubmit = () => {
    removeWorkflow({ clientId: data.clientId });
    data.setFlag((prev: boolean) => !prev);
    closeModal();
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
          <div className="text-sm font-normal text-start text-wrap flex flex-row gap-0.5 max-w-96">
            <p>
              {t("workflow.modal.desc")}
              &nbsp;
              <span className="font-semibold">{data.title}</span>? &nbsp;
              <p>{t("workflow.modal.warning")}</p>
            </p>
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
