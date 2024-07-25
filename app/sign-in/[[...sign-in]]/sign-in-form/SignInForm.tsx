"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { FieldEmail, FieldPassword } from "./fields/index";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { GoogleButton, Header, OtpButton } from "../ui";
import { useSignIn } from "@clerk/nextjs";
import { Button } from "@ui/index";

interface FormValues {
  emailAddress: string;
  password: string;
  remember: boolean;
}

interface SignInFormProps {
  toggle: () => void;
  setEmail: (email: string) => void;
  email: string;
  stepOneFlag: boolean;
  setStepOneFlag: React.Dispatch<React.SetStateAction<boolean>>;
  anotherType: boolean;
  anotherTypeHandler: () => void;
  setActiveSignIn: React.Dispatch<React.SetStateAction<any | null>>;
}

export function SignInForm({
  toggle,
  setEmail,
  email,
  stepOneFlag,
  setStepOneFlag,
  anotherType,
  anotherTypeHandler,
  setActiveSignIn,
}: SignInFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, setActive } = useSignIn();
  const form = useForm<FormValues>({
    defaultValues: {
      emailAddress: "",
      password: "",
      remember: false,
    },
  });
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "ru";

  const handleStep = () => setStepOneFlag((prev) => !prev);

  const handleGoogleAuth = () => {
    signIn?.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: `/sign-in?lang=${lang}`,
      redirectUrlComplete: `/${lang}/me`,
    });
  };

  const handleErrors = (err: any) => {
    setIsLoading(false);
    setActiveSignIn(null);
    for (let error of err.errors) {
      switch (error.code) {
        case "form_identifier_not_found":
          form.setError("emailAddress", {
            type: "deps",
            message: t("signIn.emailErr"),
          });
          break;
        case "form_password_incorrect":
          form.setError("password", {
            type: "deps",
            message: t("signIn.passwordErr"),
          });
          break;
        case "too_many_requests":
        case "form_password_pwned":
        default:
          form.setError("root", {
            message: t(
              error.code === "too_many_requests"
                ? "signUp.tooManyRequests"
                : error.code === "form_password_pwned"
                  ? "signUp.passwordErrLeak"
                  : "signUp.unknownErr"
            ),
          });
      }
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setIsLoading(true);
      if (!stepOneFlag) {
        if (data.emailAddress && signIn) {
          const result = await signIn.create({
            identifier: data.emailAddress,
          });
          setActiveSignIn(result);
          if (result.status === "needs_first_factor") {
            handleStep();
            setEmail(data.emailAddress);
          }
        }
      } else if (signIn) {
        const result = await signIn.create({
          identifier: email,
          password: data.password,
        });

        if (result.status === "complete") {
          await setActive({ session: result.createdSessionId });
          router.push(`/${lang}/me`);
        }
      }
    } catch (err: any) {
      handleErrors(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="my-auto flex flex-col gap-6">
      <Header>{t("signIn.enter")}</Header>
      <div>
        {!stepOneFlag && (
          <div className="flex flex-col gap-4">
            <GoogleButton handler={handleGoogleAuth} />
            <div className="flex flex-row items-center gap-4 px-4">
              <p className="text-sm text-gray max-w-6">{t("signIn.or")}</p>
              <div className="h-[1px] w-full bg-[#EAF0F5]"></div>
            </div>
          </div>
        )}
        <FormProvider {...form}>
          <form
            className={`${!stepOneFlag ? "mt-4" : ""}`}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {!stepOneFlag && <FieldEmail form={form} />}
            {!form.formState.errors.emailAddress &&
              stepOneFlag &&
              !anotherType && <FieldPassword form={form} />}
            {!form.formState.errors.emailAddress &&
              stepOneFlag &&
              anotherType && (
                <div className="flex flex-col gap-2">
                  <GoogleButton handler={handleGoogleAuth} />
                  <OtpButton handler={toggle} email={email} />
                </div>
              )}
            {!form.formState.errors.emailAddress &&
              stepOneFlag &&
              !anotherType && (
                <div className="mt-2 flex flex-row justify-between text-sm text-blue-highlight font-semibold">
                  <button onClick={anotherTypeHandler} type="button">
                    {t("signIn.otp.useAnother")}
                  </button>
                  <button onClick={toggle} type="button">
                    {t("signIn.forgotPass.label")}
                  </button>
                </div>
              )}
            {!anotherType && (
              <Button className="mt-6" type="submit" disabled={isLoading}>
                <p className={isLoading ? "text-gray" : ""}>
                  {t("signIn.continue")}
                </p>
              </Button>
            )}
            {form.formState.errors.root && (
              <p className="text-xs text-red-saturated mt-2">
                {form.formState.errors.root.message}
              </p>
            )}
          </form>
        </FormProvider>
        <div className="flex flex-row text-xs gap-0.5 font-normal mt-6">
          <p>{t("signIn.noAcc")}</p>
          <Link href={`/sign-up?lang=${lang}`}>
            <p className="text-blue-highlight">{t("signIn.signUp")}</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
