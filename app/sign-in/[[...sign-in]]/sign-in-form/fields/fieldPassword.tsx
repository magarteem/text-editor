import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Field, Label } from "@/app/widgets";
import { Input } from "@ui/index";
import { useTranslation } from "react-i18next";
import { ErrorMessage } from "@hookform/error-message";
import OpenEyeIcon from "@/public/svg/open-eye.svg";
import CloseEyeIcon from "@/public/svg/close-eye.svg";

interface FieldPasswordProps {
  form: any;
}

export function FieldPassword({ form }: FieldPasswordProps) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Field>
      <div className="flex flex-col gap-2 mb-1 relative">
        <Label>{t("signIn.password")}</Label>
        <Controller
          control={form.control}
          name={"password"}
          rules={{
            minLength: {
              value: 4,
              message: t("signIn.passwordErrMin"),
            },
            maxLength: {
              value: 64,
              message: t("signIn.passwordErrMax"),
            },
          }}
          render={({ field }) => (
            <Input
              placeholder={t("signIn.passwordEnter")}
              size={"large"}
              isAtAllow={true}
              isSearch={true}
              type={showPassword ? "text" : "password"}
              suffix={
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  {showPassword ? <OpenEyeIcon /> : <CloseEyeIcon />}
                </button>
              }
              name={field.name}
              value={field.value as string}
              onChange={field.onChange}
            />
          )}
        />
        <ErrorMessage
          errors={form.formState.errors}
          name={"password"}
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
