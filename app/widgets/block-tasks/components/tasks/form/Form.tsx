import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@ui/index";
import { FieldDeadline, FieldDescription, FiledCompleted } from "./fields";

export function Form({
  index,
  cancel,
  form,
  onSubmit,
  loading,
  disable,
}: {
  index: number;
  cancel: () => void;
  form: any;
  onSubmit: any;
  loading: boolean;
  disable: boolean;
}) {
  const { t } = useTranslation();

  return (
    <form {...form} onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <p className="font-semibold text-gray">
            <span>{t("workflow.tasks.tasks.item")}</span>&nbsp;
            <span>{index + 1}</span>
          </p>
        </div>
        {!disable && <FiledCompleted form={form} />}
      </div>
      <div className="mt-2 flex flex-row gap-4">
        <FieldDescription form={form} />
        <FieldDeadline form={form} />
      </div>
      <div className={"flex items-center gap-4 mt-4"}>
        <Button type={"button"} $type={"secondary"} onClick={cancel}>
          {t("button.cancel")}
        </Button>
        <Button type={"submit"} disabled={!form.formState.isDirty || loading}>
          <p className={!form.formState.isDirty ? "text-gray" : ""}>
            {t("button.save")}
          </p>
        </Button>
      </div>
    </form>
  );
}
