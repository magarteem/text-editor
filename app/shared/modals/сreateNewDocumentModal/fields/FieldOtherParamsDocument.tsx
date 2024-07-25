import React from "react";
import { Checkbox } from "antd";
import { Label, Field } from "@widgets/index";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface Props {
  form: any;
}

export function FieldOtherParamsDocument({ form }: Props) {
  const { t } = useTranslation();

  return (
    <Field>
      <div className="gap-3">
        <Controller
          name="docOther"
          control={form.control}
          render={({ field: { onChange, ...field } }) => (
            <Label>
              {t("storage.formText.titleFormDocOther")}

              <div className="flex items-center gap-3 text-sm font-normal mt-2 ml-2 h-10">
                <Checkbox
                  checked={field.value}
                  className="text-black-not-so"
                  onChange={onChange}
                  {...field}
                />
                <p>{t("storage.formText.checkboxFormDocOther")}</p>
              </div>
            </Label>
          )}
        />
      </div>
    </Field>
  );
}
