"use client";
import { useEffect } from "react";
import { Label, Field, FormState } from "@widgets/index";
import { Select } from "@ui/index";
import { useController } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useGetCountriesList } from "../../../../shared/hooks/useGetCountriesList";

export const FieldCountryOfResidence = ({
  countriesList,
}: {
  countriesList: any;
}) => {
  const { t } = useTranslation();

  const controller = useController<FormState>({
    name: "countryOfResidence",
  });

  return (
    <Field>
      <Label>{t("clients.userForm.countryOfResidence")}</Label>
      <Select
        placeholder={t("clients.userForm.countryOfResidence")}
        optionFilterProp="label"
        size={"large"}
        options={countriesList.dataSource}
        disabled={countriesList.loading}
        showSearch={true}
        value={controller.field.value}
        onChange={controller.field.onChange}
      />
    </Field>
  );
};
