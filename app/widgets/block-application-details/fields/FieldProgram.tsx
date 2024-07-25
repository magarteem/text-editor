"use client";
import { Field } from "@widgets/index";
import { FormState } from "../types/types";
import { useController } from "react-hook-form";
import { TitleBlock } from "../ui";
import { useTranslation } from "react-i18next";
import { Input } from "@ui/index";

export function FieldProgram() {
  const { t } = useTranslation();

  const controller = useController<FormState>({
    name: "targetDetailsProgram",
  });

  return (
    <Field>
      <TitleBlock title={t("widgets.ApplicationDetails.program")}>
        <Input
          className="borderedSelect"
          defaultValue={controller.field.value}
          onChange={(e: any) => controller.field.onChange(e)}
        />
      </TitleBlock>
    </Field>
  );
}
