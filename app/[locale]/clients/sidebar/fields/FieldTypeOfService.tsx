"use client";
import { Field } from "@widgets/index";
import { useController } from "react-hook-form";
import { Select, SelectCustom } from "@ui/index";
import { useTranslation } from "react-i18next";
import { Label } from "@widgets/index";

export function FieldTypeOfService() {
  const { t } = useTranslation();

  const controller = useController<any>({
    name: "targetDetailsTypeOfService",
  });

  const labels: Record<string, string> = {
    FullSupport: t("clients.typeOfServiceFull.FullSupport"),
    Mentoring: t("clients.typeOfServiceFull.Mentoring"),
    PersonalBrand: t("clients.typeOfServiceFull.PersonalBrand"),
  };

  const options = Object.entries(labels).map(([key, label]) => ({
    label,
    value: key,
  }));

  return (
    <Field>
      <Label>{t("widgets.ApplicationDetails.typeOfService")}</Label>
      <SelectCustom
        isCustom={true}
        options={options}
        size={"large"}
        className={"whitespace-nowrap"}
        placeholder={t("widgets.ApplicationDetails.typeOfService")}
        value={controller.field.value}
        onChange={controller.field.onChange}
      />
    </Field>
  );
}
