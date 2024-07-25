"use client";
import { Field, Label } from "@widgets/index";
import { useController } from "react-hook-form";
import { SelectCustom } from "@ui/index";
import { useTranslation } from "react-i18next";

export function FieldGrade() {
  const { t } = useTranslation();

  const controller = useController<any>({
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
      <Label>{t("widgets.ApplicationDetails.degree")}</Label>
      <SelectCustom
        isCustom={true}
        options={options}
        size={"large"}
        value={controller.field.value}
        placeholder={t("widgets.ApplicationDetails.degree")}
        onChange={controller.field.onChange}
      />
    </Field>
  );
}
