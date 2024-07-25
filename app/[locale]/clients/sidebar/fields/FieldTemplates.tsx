"use client";
import { Field } from "@widgets/index";
import { useController } from "react-hook-form";
import { SelectCustom } from "@ui/index";
import { Label } from "@widgets/index";
import { useTranslation } from "react-i18next";

export function FieldTemplate({ templateList }: { templateList: any }) {
  const { t } = useTranslation();

  const controller = useController<any>({
    name: "workflowTemplateId",
  });

  return (
    <Field>
      <Label>{t("clients.filters.templateUsed")}</Label>
      <SelectCustom
        isCustom={true}
        options={templateList.dataSource}
        disabled={templateList.loading}
        size={"large"}
        value={controller.field?.value}
        className={"whitespace-nowrap"}
        placeholder={t("clients.filters.templateUsed")}
        onChange={controller.field.onChange}
        optionFilterProp="label"
        style={{
          maxWidth: "222px",
        }}
      />
    </Field>
  );
}
