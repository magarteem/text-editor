"use client";
import { Label, Field, FormState } from "@widgets/index";
import { Select } from "@ui/index";
import { useController } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const CountryOfResidenceField = ({
  countries,
}: {
  countries: { label: string; value: number }[];
}) => {
  const { t } = useTranslation();
  const { field } = useController<FormState>({
    name: "countryOfResidence",
  });

  return (
    <Field>
      <Label>{t("clients.userForm.countryOfResidence")}</Label>
      <Select
        placeholder={t("clients.userForm.countryOfResidence")}
        optionFilterProp="label"
        size={"large"}
        options={countries}
        showSearch={true}
        value={field.value}
        onChange={field.onChange}
      />
    </Field>
  );
};
