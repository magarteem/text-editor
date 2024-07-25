"use client";
import { Field } from "@widgets/index";
import { FormState } from "../types/types";
import { useController } from "react-hook-form";
import { TitleBlock } from "../ui";
import { SelectCustom } from "@ui/index";
import { useTranslation } from "react-i18next";

export function FieldTypeOfService() {
  const { t } = useTranslation();

  const controller = useController<FormState>({
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
      <TitleBlock title={t("widgets.ApplicationDetails.typeOfService")}>
        <SelectCustom
          options={options}
          value={controller.field.value}
          onChange={controller.field.onChange}
        />
      </TitleBlock>
    </Field>
  );
}
