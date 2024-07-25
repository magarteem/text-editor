"use client";
import { Field } from "@widgets/index";
import { FormState } from "../types/types";
import { useController } from "react-hook-form";
import { TitleBlock } from "../ui";
import { useTranslation } from "react-i18next";
import { InputNumber } from "@ui/index";

export const FieldNumberOfUniversities = () => {
  const { t } = useTranslation();

  const controller = useController<FormState>({
    name: "targetDetailsNumberOfUniversities",
  });

  return (
    <Field>
      <TitleBlock title={t("widgets.ApplicationDetails.numberOfUniversities")}>
        <InputNumber
          value={Number(controller.field.value)}
          min={0}
          max={100}
          onChange={(e) => controller.field.onChange(e)}
        />
      </TitleBlock>
    </Field>
  );
};
