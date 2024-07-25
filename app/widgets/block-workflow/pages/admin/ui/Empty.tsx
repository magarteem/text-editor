import React, { useEffect } from "react";
import { Button, SelectCustom } from "@ui/index";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useGetTemplatesList } from "@/app/shared/hooks/useGetTemplatesList";
import { useModal } from "@/app/shared/modals/modal/ModalProvider";
import { IStage } from "../../../Workflow-block";

interface EmptyProps {
  clientId: number;
  refetchHandler: () => void;
  setWorkflow: (workflow: { name: string; stages: IStage[] }) => void;
  setFlag: (value: boolean) => void;
}

export function Empty({
  clientId,
  refetchHandler,
  setWorkflow,
  setFlag,
}: EmptyProps) {
  const { t } = useTranslation();

  const { loading, dataSource, fetchRecords } = useGetTemplatesList();
  const { openModal } = useModal();

  const form = useForm();

  useEffect(() => {
    fetchRecords();
  }, []);

  const onSubmit = (data: any) => {
    if (data.workflowId) {
      const template = dataSource.find(
        (template: { label: string; value: number }) =>
          template.value === data.workflowId
      ) as any;

      if (template.label) {
        openModal("submitTemplate", {
          workflowId: data.workflowId,
          label: template.label,
          clientId: clientId,
          refetchHandler: refetchHandler,
          setWorkflow: setWorkflow,
          setFlag: setFlag,
        });
      }
    }
  };

  return (
    <div>
      <FormProvider {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <SelectCustom
            size={"large"}
            disable={loading}
            options={dataSource}
            onChange={(value: number) => form.setValue("workflowId", value)}
            placeholder={t("workflow.empty.admin.placeholder")}
          />
          <div>
            <Button type={"submit"} disabled={form.formState.isDirty}>
              <p className={form.formState.isDirty ? "text-gray" : ""}>
                {t("button.save")}
              </p>
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
