"use client";

import React from "react";
import { Header } from "../sign-up-form/ui";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@ui/index";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { CodeField } from "./FiledCode";
import Link from "next/link";

interface VerifyFormProps {
  form: any;
  email: string;
  isLoading: boolean;
  isSuccess: boolean;
  handle: any;
  handleRedirect: any;
}

export function VerifyForm({
  form,
  isLoading,
  isSuccess,
  email,
  handle,
  handleRedirect,
}: VerifyFormProps) {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6 w-80 lg:w-96 mx-auto lg:mx-0 lg:mr-36">
      <Header>
        {isSuccess
          ? t("signUp.greeting.title")
          : t("signUp.verification.title")}
      </Header>
      {isSuccess ? (
        <>
          <p className="text-sm font-normal">{t("signUp.greeting.desc")}</p>
        </>
      ) : (
        <FormProvider {...form}>
          <form
            className="flex flex-col gap-6"
            onSubmit={form.handleSubmit(handle)}
          >
            <div>
              <h3 className="font-normal whitespace-nowrap text-sm">
                {t("signUp.verification.desc")}
              </h3>
              <p className="font-semibold text-sm">{email}</p>
            </div>
            <CodeField form={form} />
            <div className="flex flex-row text-xs gap-0.5 font-normal text-nowrap flex-wrap">
              <p>{t("signUp.allowRef")}</p>
              <Link
                href="https://selfstartglobal.com/website_terms_of_use"
                target="_blank"
              >
                <p className="text-blue-highlight">
                  {t("signUp.terms")}
                  <span style={{ color: "black !important" }}>,&nbsp;</span>
                </p>
              </Link>
              <Link
                href="https://selfstartglobal.com/Privacy_Policy"
                target="_blank"
              >
                <p className="text-blue-highlight">{t("signUp.privacy")}</p>
              </Link>
              <p>{t("signUp.and")}</p>
              <Link
                href="https://selfstartglobal.com/terms_of_service"
                target="_blank"
              >
                <p className="text-blue-highlight">{t("signUp.service")}</p>
              </Link>
            </div>
            <div>
              <Button type="submit" disabled={isLoading}>
                <p className={isLoading ? "text-gray" : ""}>
                  {t("signUp.continue")}
                </p>
              </Button>
              {form.formState.errors.root && (
                <p className="text-xs text-red-saturated mt-2">
                  {form.formState.errors.root.message}
                </p>
              )}
            </div>
          </form>
        </FormProvider>
      )}
    </div>
  );
}
