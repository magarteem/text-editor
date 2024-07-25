"use client";

import React, { useState } from "react";
import { Header } from "./ui";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { useSignUp } from "@clerk/clerk-react";
import PasswordStrengthBar from "react-password-strength-bar";
import {
  FieldConfirmPassword,
  FieldEmail,
  FieldLastName,
  FieldName,
  FieldPassword,
} from "./fields";
import { Button } from "@ui/index";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface SignUpFormProps {
  form: any;
  isLoading: boolean;
  signUpWithEmail: ({
    emailAddress,
    password,
    firstName,
    lastName,
  }: {
    emailAddress: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => void;
}

export function SignUpForm({
  signUpWithEmail,
  form,
  isLoading,
}: SignUpFormProps) {
  const [passStreight, setPassStreight] = useState(0);

  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "ru";

  const onSubmit = async (data: any) => {
    signUpWithEmail({
      emailAddress: data.email,
      password: data.password,
      firstName: data.name,
      lastName: data.lastName,
    });
  };

  return (
    <div className="flex flex-col gap-6 w-96  m-auto lg:mx-0 lg:mr-36  lg:h-full pb-20 lg:pb-0">
      <div className="my-8 lg:my-auto">
        <Header>{t("signUp.title")}</Header>
        <FormProvider {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-row justify-between items-center gap-4">
              <FieldName form={form} />
              <FieldLastName form={form} />
            </div>
            <FieldEmail form={form} />
            <FieldPassword form={form} passStreight={passStreight} />
            <div>
              <div className="flex flex-row items-center gap-2">
                <h4 className="font-semibold text-sm text-gray mb-2">
                  {t("signIn.forgotPass.strongPass")}:
                </h4>
                {passStreight === 1 && (
                  <h3 className="text-sm font-semibold mb-2 text-[#FF7E60]">
                    {t("signUp.pass.streignt.weak")}
                  </h3>
                )}
                {passStreight === 2 && (
                  <h3 className="text-sm font-semibold mb-2 text-[#F2C836]">
                    {t("signUp.pass.streignt.okay")}
                  </h3>
                )}
                {passStreight === 3 && (
                  <h3 className="text-sm font-semibold mb-2 text-[#16BA1E]">
                    {t("signUp.pass.streignt.good")}
                  </h3>
                )}
                {passStreight === 4 && (
                  <h3 className="text-sm font-semibold mb-2 text-[#218159]">
                    {t("signUp.pass.streignt.strong")}
                  </h3>
                )}
              </div>
              <PasswordStrengthBar
                password={form.watch("password")}
                className="passwordStrength"
                barColors={[
                  "#EAF0F5",
                  "#FF7E60",
                  "#F2C836",
                  "#16BA1E",
                  "#218159",
                ]}
                shortScoreWord={""}
                scoreWords={[]}
                onChangeScore={(score) => setPassStreight(score)}
              />
              <h3 className="font-normal text-sm text-gray mt-2">
                {t("signIn.forgotPass.rec.title")}
              </h3>
              <ul>
                <li>
                  <p className="text-gray font-normal text-sm">
                    - {t("signIn.forgotPass.rec.min")}
                  </p>
                </li>
                <li>
                  <p className="text-gray font-normal text-sm">
                    - {t("signIn.forgotPass.rec.letter")}
                  </p>
                </li>
                <li>
                  <p className="text-gray font-normal text-sm">
                    - {t("signIn.forgotPass.rec.number")}
                  </p>
                </li>
                <li>
                  <p className="text-gray font-normal text-sm">
                    - {t("signIn.forgotPass.rec.symbol")}
                  </p>
                </li>
              </ul>
            </div>
            <FieldConfirmPassword form={form} />
            <div className="flex flex-row flex-wrap text-xs gap-0.5 font-normal">
              <p className="text-nowrap">{t("signUp.allowRef")}</p>
              <Link
                href="https://selfstartglobal.com/website_terms_of_use"
                target="_blank"
              >
                <p className="text-blue-highlight text-nowrap">
                  {t("signUp.terms")}
                  <span style={{ color: "black !important" }}>,&nbsp;</span>
                </p>
              </Link>
              <Link
                href="https://selfstartglobal.com/Privacy_Policy"
                target="_blank"
              >
                <p className="text-blue-highlight text-nowrap">
                  {t("signUp.privacy")}
                </p>
              </Link>
              <p>{t("signUp.and")}</p>
              <Link
                href="https://selfstartglobal.com/terms_of_service"
                target="_blank"
              >
                <p className="text-blue-highlight text-nowrap">
                  {t("signUp.service")}
                </p>
              </Link>
            </div>
            <div>
              <Button type="submit" disabled={isLoading}>
                <p className={isLoading ? "text-gray" : ""}>
                  {t("signUp.reg")}
                </p>
              </Button>
              {form.formState.errors.root && (
                <p className="text-xs text-red-saturated mt-2">
                  {form.formState.errors.root.message}
                </p>
              )}
            </div>
            <div className="flex flex-row text-xs gap-0.5 font-normal">
              <p>{t("signUp.haveAcc")}</p>
              <Link href={`/sign-in?lang=${lang}`}>
                <p className="text-blue-highlight">{t("signUp.enter")}</p>
              </Link>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
