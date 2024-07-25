"use client";

import React, { useState, useEffect } from "react";
import { CodeField } from "./ui";
import { Button } from "@ui/index";
import { useTranslation } from "react-i18next";
import { useRouter, useSearchParams } from "next/navigation";

export function OtpForm({
  timer,
  form,
  setTimer,
  handleOtp,
  activeSignIn,
  setActive,
}: {
  timer: number;
  form: any;
  setTimer: any;
  handleOtp: () => void;
  activeSignIn: any;
  setActive: any;
}) {
  const { t } = useTranslation();
  const [isDisabled, setIsDisabled] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "ru";

  const onSubmit = async (data: any) => {
    try {
      const signInAttempt = await activeSignIn.attemptFirstFactor({
        strategy: "email_code",
        code: data.code,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push(`/${lang}/me`);
      }
    } catch (err: any) {
      for (let error of err.errors) {
        switch (error.code) {
          case "too_many_requests":
            form.setError("root", {
              message: t("signUp.tooManyRequests"),
            });
            return;

          default:
            form.setError("root", {
              message: t("signUp.unknownErr"),
            });
            return;
        }
      }
    }
  };

  useEffect(() => {
    if (isDisabled) {
      const interval = setInterval(() => {
        setTimer((prev: any) => {
          if (prev === 1) {
            clearInterval(interval);
            setIsDisabled(false);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isDisabled]);

  const handleButtonClick = () => {
    setIsDisabled(true);
    setTimer(30);
    handleOtp();
  };

  return (
    <form
      className="flex flex-col gap-4 mt-4"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <CodeField form={form} required={false} />
      <div
        className={`flex flex-row justify-between items-center text-sm font-semibold text-blue-highlight ${isDisabled ? "opacity-50" : ""}`}
      >
        <button type="button" onClick={handleButtonClick} disabled={isDisabled}>
          {t("signIn.otp.codeNotExist")}
          &nbsp;
          {t("signIn.otp.send")}
          &nbsp;
          {isDisabled && <span>({timer})</span>}
        </button>
      </div>
      <div>
        <Button type="submit">
          <p>{t("button.submit")}</p>
        </Button>
        {form.formState.errors.root && (
          <p className="text-xs text-red-saturated mt-2">
            {form.formState.errors.root.message}
          </p>
        )}
      </div>
    </form>
  );
}
