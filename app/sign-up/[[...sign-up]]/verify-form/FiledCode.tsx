import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Field, Label } from "@/app/widgets";
import { Input } from "@ui/index";
import { useTranslation } from "react-i18next";
import { ErrorMessage } from "@hookform/error-message";

interface FieldCodeProps {
  form: any;
}

export function CodeField({ form }: FieldCodeProps) {
  const { t } = useTranslation();

  return (
    <Field>
      <div className="flex flex-col gap-2 mb-1 relative">
        <Label>{t("signIn.forgotPass.code")}</Label>
        <Controller
          control={form.control}
          name={"code"}
          rules={{
            required: t("signIn.emptyErr"),
          }}
          render={({ field }) => (
            <Input
              placeholder={t("signIn.forgotPass.codePlaceholder")}
              size={"large"}
              isAtAllow={true}
              type={"text"}
              name={field.name}
              value={field.value as string}
              onChange={field.onChange}
            />
          )}
        />
        <ErrorMessage
          errors={form.formState.errors}
          name={"code"}
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
