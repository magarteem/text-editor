import React from "react";
import { Controller } from "react-hook-form";
import { Field, Label } from "@/app/widgets";
import { Input } from "@ui/index";
import { useTranslation } from "react-i18next";
import { ErrorMessage } from "@hookform/error-message";

interface FieldEmailProps {
  form: any;
}

export function FieldEmail({ form }: FieldEmailProps) {
  const { t } = useTranslation();

  return (
    <Field>
      <div className="flex flex-col gap-3 mb-1 relative">
        <Label>{t("signUp.email")}</Label>
        <Controller
          control={form.control}
          name={"email"}
          rules={{
            required: t("signIn.emptyErr"),
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{1,}$/,
              message: t("clients.userForm.emailError"),
            },
          }}
          render={({ field }) => (
            <Input
              isEmail={true}
              placeholder={t("signUp.emailPlaceholder")}
              size={"large"}
              isAtAllow={true}
              name={field.name}
              value={field.value as string}
              onChange={field.onChange}
            />
          )}
        />
        <ErrorMessage
          errors={form.formState.errors}
          name={"email"}
          render={(error) => (
            <p className="text-xs text-red-saturated absolute -bottom-4">
              {error.message}
            </p>
          )}
        ></ErrorMessage>
      </div>
    </Field>
  );
}
