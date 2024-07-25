"use client";
import { Label, FormState, Field } from "@widgets/index";
import { Input } from "@ui/index";
import { useController } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const TelegramField = () => {
  const { t } = useTranslation();
  const controller = useController<FormState>({
    name: "telegramId",
  });

  return (
    <Field>
      <Label>{t("clients.userForm.telegram")}</Label>
      <Input
        placeholder={t("clients.userForm.telegram")}
        size={"large"}
        isAtAllow={true}
        name={controller.field.name}
        value={controller.field.value as string}
        onChange={controller.field.onChange}
      />
    </Field>
  );
};
