import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Field, Label } from "@/app/widgets";
import { Input } from "@ui/index";
import { useTranslation } from "react-i18next";
import { ErrorMessage } from "@hookform/error-message";

interface FieldConfirmPassProps {
  form: any;
}

export function FieldName({ form }: FieldConfirmPassProps) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Field>
      <div className="flex flex-col gap-2 mb-1 relative">
        <Label>{t("signUp.name")}</Label>
        <Controller
          control={form.control}
          name={"name"}
          rules={{
            required: t("signIn.emptyErr"),
          }}
          render={({ field }) => (
            <Input
              placeholder={t("signUp.namePlaceholder")}
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
          name={"name"}
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
