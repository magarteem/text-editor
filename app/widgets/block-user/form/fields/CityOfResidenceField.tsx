"use client";
import { Label, Field, FormState } from "@widgets/index";
import { Input } from "@ui/index";
import { useController } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const CityOfResidenceField = () => {
  const { t } = useTranslation();
  const controller = useController<FormState>({
    name: "cityOfResidence",
  });

  return (
    <Field>
      <Label>{t("clients.userForm.cityOfResidence")}</Label>
      <Input
        placeholder={t("clients.userForm.cityOfResidence")}
        size={"large"}
        name={controller.field.name}
        value={controller.field.value as string}
        onChange={controller.field.onChange}
      />
    </Field>
  );
};
