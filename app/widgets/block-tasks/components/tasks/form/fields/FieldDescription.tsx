import { Input } from "@/app/shared/ui/antd/input/index";
import { Label } from "@/app/widgets/block-user";
import React from "react";
import { useTranslation } from "react-i18next";
import { useController } from "react-hook-form";

export function FieldDescription({ form }: { form: any }) {
  const { t } = useTranslation();

  const {
    field,
    fieldState: { error },
  } = useController({
    name: "shortDescription",
    control: form.control,
    rules: { required: t("workflow.tasks.form.descriptionRequired") },
  });

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>{t("workflow.tasks.form.description")}</Label>
      <Input value={field.value} onChange={field.onChange} isPaste={true} />
      {error && <p className="text-red text-xs">{error.message}</p>}
    </div>
  );
}
