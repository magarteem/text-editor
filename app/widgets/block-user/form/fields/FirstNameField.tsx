"use client";
import { Label, Field, FormState } from "@widgets/index";
import { Input } from "@ui/index";
import { useController } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ErrorMessage } from "@hookform/error-message";

export const FirstNameField = ({ isOnlyView }: { isOnlyView?: boolean }) => {
  const { t } = useTranslation();
  const controller = useController<FormState>({
    name: "firstName",
    rules: { required: t("widgets.chosenUniversities.error") },
  });

  return (
    <Field>
      <Label>{t("clients.userForm.firstName")}</Label>
      <Input
        placeholder={t("clients.userForm.firstName")}
        size={"large"}
        disabled={isOnlyView}
        name={controller.field.name}
        value={controller.field.value as string}
        onChange={controller.field.onChange}
      />
      <ErrorMessage
        errors={controller.formState.errors}
        name={controller.field.name}
        render={(error) => (
          <p className="text-xs text-red-saturated">{error.message}</p>
        )}
      ></ErrorMessage>
    </Field>
  );
};
