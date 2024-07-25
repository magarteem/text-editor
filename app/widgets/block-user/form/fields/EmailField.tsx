"use client";
import { Label, Field, FormState } from "@widgets/index";
import { Input } from "@ui/index";
import { useController, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ErrorMessage } from "@hookform/error-message";

export const EmailField = ({
  isEditable,
  form,
}: {
  isEditable: boolean;
  form: any;
}) => {
  const { t } = useTranslation();
  const controller = useController<FormState>({
    name: "emailAddress",
  });

  return (
    <Field>
      <Label>{t("clients.userForm.mail")}</Label>
      <Controller
        control={form.control}
        name={"emailAddress"}
        rules={{
          required: t("widgets.chosenUniversities.error"),
          pattern: {
            value:
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{1,}$/,
            message: "Entered value does not match email format",
          },
        }}
        render={({ field }) => (
          <Input
            placeholder={t("clients.userForm.mail")}
            size={"large"}
            isEmail={true}
            disabled={!isEditable}
            isAtAllow={true}
            name={field.name}
            value={field.value as string}
            onChange={field.onChange}
          />
        )}
      />
      <ErrorMessage
        errors={form.formState.errors}
        name={"emailAddress"}
        render={() => (
          <p className="text-xs text-red-saturated">
            {t("clients.userForm.emailError")}
          </p>
        )}
      ></ErrorMessage>
    </Field>
  );
};
