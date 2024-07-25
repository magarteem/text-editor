"use client";
import { Label, Field } from "@widgets/index";
import { Select } from "@ui/index";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { labels } from "@/app/widgets/block-client-document/helpers/libDocType";
import { ErrorMessage } from "@hookform/error-message";

interface Props {
  form: any;
}

export const FieldTypeDocument = ({ form }: Props) => {
  const { t } = useTranslation();

  const options = Object.entries(labels).map(([key, label]) => ({
    label: t(label),
    value: key,
  }));
  console.log("form.formState", form.formState);
  return (
    <Field>
      <Label>{t("storage.formText.titleFormDocType")}</Label>
      <Controller
        name="docType"
        control={form.control}
        render={({ field: { onChange, ...field } }) => (
          <div className="flex flex-col gap-2 w-full relative">
            <Select
              placeholder={t("storage.formText.titleFormDocNotSelected")}
              size={"large"}
              options={options}
              onChange={onChange}
              {...field}
            />
            <ErrorMessage
              errors={form.formState.errors}
              name={"docType"}
              render={(error) => (
                <p className="text-xs text-red-saturated absolute -bottom-4">
                  {t(error.message)}
                </p>
              )}
            />
          </div>
        )}
      />
    </Field>
  );
};
