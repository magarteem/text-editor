import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Field, Label } from "@/app/widgets";
import { Input } from "@ui/index";
import { useTranslation } from "react-i18next";
import { ErrorMessage } from "@hookform/error-message";
import OpenEyeIcon from "@/public/svg/open-eye.svg";
import CloseEyeIcon from "@/public/svg/close-eye.svg";

interface FieldConfirmPassProps {
  form: any;
}

export function ConfirmPassField({ form }: FieldConfirmPassProps) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Field>
      <div className="flex flex-col gap-2 mb-1 relative">
        <Label>{t("signIn.forgotPass.confirmPass")}</Label>
        <Controller
          control={form.control}
          name={"confirm"}
          rules={{
            required: t("signIn.emptyErr"),
            minLength: {
              value: 8,
              message: t("signIn.passwordErrMin"),
            },
            maxLength: {
              value: 64,
              message: t("signIn.passwordErrMax"),
            },
            validate: {
              validator: (value) =>
                value === form.getValues("newPassword") ||
                t("signIn.passwordErrConfirm"),
            },
          }}
          render={({ field }) => (
            <Input
              placeholder={t("signIn.forgotPass.confirmPass")}
              size={"large"}
              isAtAllow={true}
              type={showPassword ? "text" : "password"}
              isSearch={true}
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
          name={"confirm"}
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
