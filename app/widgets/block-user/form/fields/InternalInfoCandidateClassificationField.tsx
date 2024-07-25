"use client";
import { InternalInfoCandidateClassification } from "@api/index";
import { Label, Field, FormState } from "@widgets/index";
import { Select } from "@ui/index";
import { useController } from "react-hook-form";
import { useTranslation } from "react-i18next";

const labels: Record<InternalInfoCandidateClassification, string> = {
  Questionable: "Не указано",
  Weak: "Слабый",
  Strong: "Сильный",
};
const options = Object.entries(labels).map(([key, label]) => ({
  label,
  value: key,
}));
export const InternalInfoCandidateClassificationField = () => {
  const { t } = useTranslation();
  const controller = useController<FormState>({
    name: "internalInfoCandidateClassification",
  });

  return (
    <Field>
      <Label>{t("clients.userForm.typeOfClient")}</Label>
      <Select
        placeholder={t("clients.userForm.typeOfClient")}
        size={"large"}
        options={options}
        value={controller.field.value}
        onChange={controller.field.onChange}
      />
    </Field>
  );
};
