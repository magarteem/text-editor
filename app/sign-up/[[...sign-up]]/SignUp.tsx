"use client";

import React, { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { SignUpForm } from "./sign-up-form";
import { VerifyForm } from "./verify-form";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useRouter, useSearchParams } from "next/navigation";
import BackIcon from "@/public/svg/back-arrow.svg";

export function SignUp({ setFinish }: { setFinish: (value: boolean) => void }) {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "ru";

  const { signUp, setActive } = useSignUp();

  const [verifying, setVerifying] = useState(false);
  const [isVerifyingSuccess, setIsVerifyingSuccess] = useState(false);

  const [email, setEmail] = useState("");

  const [isLoadingSignUp, setIsLoadingSignUp] = useState(false);
  const [isLoadingVerify, setIsLoadingVerify] = useState(false);

  const signUpForm = useForm({
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const verifyForm = useForm({
    defaultValues: {
      code: "",
    },
  });

  const signUpWithEmail = async ({
    emailAddress,
    password,
    firstName,
    lastName,
  }: {
    emailAddress: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    if (!signUp) {
      return;
    }
    try {
      setIsLoadingSignUp(true);
      await signUp.create({
        emailAddress,
        password,
        firstName,
        lastName,
      });
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      setEmail(emailAddress);
      setVerifying(true);
      setIsLoadingSignUp(false);
    } catch (err: any) {
      setIsLoadingSignUp(false);
      setEmail("");
      for (let error of err.errors) {
        switch (error.code) {
          case "form_identifier_exists":
            signUpForm.setError("email", {
              type: "deps",
              message: t("signUp.emailErrExist"),
            });
            return;

          case "too_many_requests":
            signUpForm.setError("root", {
              message: t("signUp.tooManyRequests"),
            });
            return;

          case "form_password_pwned":
            signUpForm.setError("root", {
              message: t("signUp.passwordErrLeak"),
            });
            return;

          default:
            signUpForm.setError("root", {
              message: t("signUp.unknownErr"),
            });
            return;
        }
      }
      setIsLoadingSignUp(false);
    }
  };

  const handleVerify = async ({ code }: { code: string }) => {
    if (!signUp) return;

    try {
      setIsLoadingSignUp(true);
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        setFinish(true);
        await setActive({ session: completeSignUp.createdSessionId });
        setIsVerifyingSuccess(true);
        setIsLoadingVerify(false);
      } else {
        setFinish(false);
        setIsVerifyingSuccess(false);
        setIsLoadingVerify(false);
      }
    } catch (err: any) {
      setIsLoadingSignUp(false);
      setIsVerifyingSuccess(false);
      for (let error of err.errors) {
        switch (error.code) {
          case "too_many_requests":
            verifyForm.setError("root", {
              message: t("signUp.tooManyRequests"),
            });
            return;

          case "form_code_incorrect":
            verifyForm.setError("code", {
              message: t("signUp.verification.codeErr"),
            });
            return;
        }
      }
    }
  };

  const handleRedirect = () => {
    router.push(`/${lang}/me`);
  };

  return (
    <>
      {verifying && (
        <button
          className="absolute top-6 left-9 flex flex-row gap-2 items-center"
          onClick={() => setVerifying(false)}
        >
          <BackIcon />
          <p className="text-sm text-blue-highlight font-semibold">
            {t("signIn.return")}
          </p>
        </button>
      )}
      {verifying ? (
        <VerifyForm
          form={verifyForm}
          isLoading={isLoadingVerify}
          isSuccess={isVerifyingSuccess}
          email={email}
          handle={handleVerify}
          handleRedirect={handleRedirect}
        />
      ) : (
        <SignUpForm
          signUpWithEmail={signUpWithEmail}
          form={signUpForm}
          isLoading={isLoadingSignUp}
        />
      )}
    </>
  );
}
