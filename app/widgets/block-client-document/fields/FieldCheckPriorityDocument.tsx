"use client";
import { Select } from "@ui/index";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Field, Label } from "../ui";

type TypeSelectorStatus = "Standard" | "High";

interface Props {
  form: any;
}

export const FieldCheckPriorityDocument = ({ form }: Props) => {
  const { t } = useTranslation();

  const labels: Record<TypeSelectorStatus, string> = {
    Standard: t("storage.formText.reviewPriority.Standard"),
    High: t("storage.formText.reviewPriority.High"),
  };

  const options = Object.entries(labels).map(([key, label]) => ({
    label,
    value: key,
  }));

  return (
    <Field classNames="max-w-96">
      <Label>{t("storage.formText.titleFormDocPriority")}</Label>

      <Controller
        name="reviewPriority"
        control={form.control}
        render={({ field }) => (
          <Select
            placeholder={t("storage.formText.titleFormDocNotSelected")}
            size={"large"}
            options={options}
            {...field}
          />
        )}
      />
    </Field>
  );
};
