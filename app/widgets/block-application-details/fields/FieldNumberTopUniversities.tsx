"use client";
import { Field } from "@widgets/index";
import { FormState } from "../types/types";
import { useController } from "react-hook-form";
import { TitleBlock } from "../ui";
import { useTranslation } from "react-i18next";
import { InputNumber } from "@ui/index";

export const FieldNumberTopUniversities = () => {
  const { t } = useTranslation();

  const controller = useController<FormState>({
    name: "targetDetailsNumberOfTopUniversities",
  });

  return (
    <Field>
      <TitleBlock
        title={t("widgets.ApplicationDetails.numberOfTopUniversities")}
      >
        <InputNumber
          min={0}
          max={100}
          value={Number(controller.field.value)}
          onChange={(e) => controller.field.onChange(e)}
        />
      </TitleBlock>
    </Field>
  );
};
