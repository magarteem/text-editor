"use client";
import { Field } from "@widgets/index";
import { FormState } from "../types/types";
import { useController } from "react-hook-form";
import { TitleBlock } from "../ui";
import { SelectCustom } from "@ui/index";
import { useTranslation } from "react-i18next";

export function FieldDegree() {
  const { t } = useTranslation();

  const controller = useController<FormState>({
    name: "targetDetailsPersonDegree",
  });

  const labels: Record<string, string> = {
    Bachelor: t("clients.degree.bachelor"),
    Master: t("clients.degree.master"),
    GraduateStudent: t("clients.degree.graduateStudent"),
  };

  const options = Object.entries(labels).map(([key, label]) => ({
    label,
    value: key,
  }));

  return (
    <Field>
      <TitleBlock title={t("widgets.ApplicationDetails.degree")}>
        <SelectCustom
          options={options}
          value={controller.field.value}
          onChange={controller.field.onChange}
        />
      </TitleBlock>
    </Field>
  );
}
