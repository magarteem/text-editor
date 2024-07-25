"use client";
import { Field } from "@widgets/index";
import { InputNumber } from "@ui/index";
import { useController } from "react-hook-form";
import { TitleBlock } from "@/app/widgets/block-education/ui";
import { useTranslation } from "react-i18next";

export function FieldYearOfEnrollment() {
  const { t } = useTranslation();

  const controller = useController<any>({
    name: "targetDetailsYear",
  });
  const currentDate = new Date();

  return (
    <Field>
      <TitleBlock title={t("widgets.ApplicationDetails.yearOfEnrollment")}>
        <InputNumber
          min={2000}
          max={2100}
          formatter={(value) =>
            `${value == undefined || value == null ? "" : value}`
          }
          onChange={controller.field.onChange}
          value={controller.field.value}
        />
      </TitleBlock>
    </Field>
  );
}
