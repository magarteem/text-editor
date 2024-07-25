import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "../../ui";
import { useTranslation } from "react-i18next";
import AttentionIcon from "@/public/svg/attention-icon.svg";
import { useModal } from "../modal/ModalProvider";
import { useAssignWorkflow } from "../../hooks/useAssignWorkflow";

export function SubmitTemplateModalForm({ data }: { data: any }) {
  const { t } = useTranslation();

  const form = useForm();

  const { closeModal } = useModal();
  const { assignWorkflow } = useAssignWorkflow();

  const onSubmit = async () => {
    const result = await assignWorkflow({
      workflowId: data.workflowId,
      clientId: data.clientId,
    });
    data.setWorkflow(result);
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
              {t("workflow.choose")}
              &nbsp;
              <span className="font-semibold">{data.label}</span>
            </p>
          </div>
          <div className="flex flex-row gap-4">
            <Button type={"button"} $type={"secondary"} onClick={closeModal}>
              {t("button.cancel")}
            </Button>
            <Button type={"submit"}>
              <p>{t("button.add")}</p>
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
