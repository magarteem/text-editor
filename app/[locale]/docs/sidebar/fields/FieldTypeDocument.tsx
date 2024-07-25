"use client";
import { SelectCustom } from "@ui/index";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { labels } from "../../helpers/libDocType";
import { Field } from "../../ui/Field";
import { Label } from "../../ui/Label";

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
          <SelectCustom
            isCustom={true}
            mode="multiple"
            options={options}
            size={"large"}
            //className={"whitespace-nowrap"}
            className={"whitespace-normal"}
            placeholder={t("storage.formText.titleFormDocNotSelected")}
            optionFilterProp="label"
            style={{
              maxWidth: "222px",
            }}
            {...field}
          />
        )}
      />
    </Field>
  );
};

//style={{
//textOverflow: "ellipsis",
//maxWidth: "160px",
//overflow: "hidden",
//}}
