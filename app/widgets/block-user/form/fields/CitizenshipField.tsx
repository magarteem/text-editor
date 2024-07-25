"use client";
import { Label, Field, FormState } from "@widgets/index";
import { Select } from "@ui/index";
import { useController } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const CitizenshipField = ({
  countries,
}: {
  countries: { label: string; value: number }[];
}) => {
  const { t } = useTranslation();
  const { field } = useController<FormState>({
    name: "citizenship",
  });

  return (
    <Field>
      <Label htmlFor={"citizenship"}>{t("clients.userForm.citizenship")}</Label>
      <Select
        id={"citizenship"}
        placeholder={t("clients.userForm.citizenship")}
        optionFilterProp="label"
        showSearch={true}
        size={"large"}
        options={countries}
        value={field.value}
        onChange={field.onChange}
      />
    </Field>
  );
};
