"use client";
import { Field } from "@widgets/index";
import { FormState } from "../types/types";
import { InputNumber } from "@ui/index";
import { useController } from "react-hook-form";
import { TitleBlock } from "../ui";
import { useTranslation } from "react-i18next";

export function FieldYearOfEnrollment() {
  const { t } = useTranslation();

  const controller = useController<FormState>({
    name: "targetDetailsYear",
  });
  const currentDate = new Date();

  return (
    <Field>
      <TitleBlock title={t("widgets.ApplicationDetails.yearOfEnrollment")}>
        <InputNumber
          min={2000}
          max={2100}
          onChange={controller.field.onChange}
          defaultValue={Number(controller.field.value)}
        />
      </TitleBlock>
    </Field>
  );
}
