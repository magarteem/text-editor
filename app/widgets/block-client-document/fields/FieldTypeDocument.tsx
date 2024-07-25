"use client";
import { Select } from "@ui/index";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Field, Label } from "../ui";
import { labels } from "../helpers/libDocType";

interface Props {
  form: any;
}

export const FieldTypeDocument = ({ form }: Props) => {
  const { t } = useTranslation();

  const options = Object.entries(labels).map(([key, label]) => ({
    label: t(label),
    value: key,
  }));

  return (
    <Field classNames="max-w-96">
      <Label>{t("storage.formText.titleFormDocType")}</Label>
      <Controller
        name="typeOfDocument"
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
