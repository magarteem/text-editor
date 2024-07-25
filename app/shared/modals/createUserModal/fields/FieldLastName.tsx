import React from "react";
import { Controller } from "react-hook-form";
import { Field, Label } from "@/app/widgets";
import { Input } from "@ui/index";
import { useTranslation } from "react-i18next";
import { ErrorMessage } from "@hookform/error-message";

interface FieldConfirmPassProps {
  form: any;
}

export function FieldLastName({ form }: FieldConfirmPassProps) {
  const { t } = useTranslation();

  return (
    <Field>
      <div className="flex flex-col gap-2 mb-1 relative">
        <Label>{t("signUp.lastName")}</Label>
        <Controller
          control={form.control}
          name={"lastName"}
          rules={{
            required: t("signIn.emptyErr"),
          }}
          render={({ field }) => (
            <Input
              placeholder={t("signUp.lastNamePlaceholder")}
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
          name={"lastName"}
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
