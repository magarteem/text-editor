import React, { useEffect, useState } from "react";
import { Header } from "../ui";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Button } from "@ui/index";
import { useSignIn, useUser } from "@clerk/nextjs";
import { CodeField, ConfirmPassField, NewPasswordField } from "./ui";
import { EmailCodeFactor, SignInFirstFactor } from "@clerk/types";
import PasswordStrengthBar from "react-password-strength-bar";
import { useForm, FormProvider } from "react-hook-form";
import { OtpForm } from "./OtpForm";
import cn from "classnames";
import { CurrentPasswordField } from "./ui/CurrentPasswordField";

interface FormPasswordProps {
  email: string;
  otp: boolean;
  anotherTypeHandler: () => void;
  timer: number;
  setTimer: any;
  activeSignIn: any;
  closeModal?: () => void;
}

interface FormProps {
  code: string;
  newPassword: string;
  confirm: string;
  currentPassword?: string;
}

export function ForgotPasswordForm({
  email,
  timer,
  otp,
  anotherTypeHandler,
  setTimer,
  activeSignIn,
  closeModal,
}: FormPasswordProps) {
  const { t } = useTranslation();
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "ru";

  const [isLoading, setIsLoading] = useState(false);
  const [passStreight, setPassStreight] = useState(0);

  const { signIn, setActive } = useSignIn();

  const otpForm = useForm({
    defaultValues: {
      code: null,
    },
  });

  const handleOtp = async () => {
    if (signIn && activeSignIn) {
      try {
        const isEmailCodeFactor = (
          factor: SignInFirstFactor
        ): factor is EmailCodeFactor => {
          return factor.strategy === "email_code";
        };
        const emailCodeFactor =
          activeSignIn.supportedFirstFactors?.find(isEmailCodeFactor);
        if (emailCodeFactor) {
          const { emailAddressId } = emailCodeFactor;
          await signIn.prepareFirstFactor({
            strategy: "email_code",
            emailAddressId,
          });
        }
      } catch (err: any) {
        setIsLoading(false);
        for (let error of err.errors) {
          switch (error.code) {
            case "too_many_requests":
              otpForm.setError("root", {
                message: t("signUp.tooManyRequests"),
              });
              return;

            case "form_code_incorrect":
              otpForm.setError("code", {
                message: t("signUp.verification.codeErr"),
              });
              return;

            default:
              otpForm.setError("root", {
                message: t("signUp.unknownErr"),
              });
              return;
          }
        }
      }
    }
  };

  async function create() {
    setIsLoading(true);
    if (otp) {
      handleOtp();
    } else {
      await signIn
        ?.create({
          strategy: "reset_password_email_code",
          identifier: email,
        })
        .catch((err) => {
          console.error("error", err.errors[0].longMessage);
        });
    }
    setIsLoading(false);
  }

  const form = useForm({
    defaultValues: {
      code: "",
      newPassword: "",
      confirm: "",
    },
  });

  useEffect(() => {
    !isSignedIn && create();
  }, []);

  const validationErrMessage = (err: any) => {
    for (let error of err.errors) {
      switch (error.code) {
        case "too_many_requests":
          form.setError("root", {
            message: t("signUp.tooManyRequests"),
          });
          return;

        case "verification_failed":
          form.setError("root", {
            message: t("signUp.tooManyRequests"),
          });
          return;

        case "form_password_pwned":
          form.setError("root", {
            message: t("signUp.passwordErrLeak"),
          });
          return;

        case "form_code_incorrect":
          form.setError("code", {
            message: t("signUp.verification.codeErr"),
          });
          return;
        case "form_password_validation_failed":
          form.setError("root", {
            message: t("createNewPAssword.updatePassErr"),
          });
          return;

        default:
          form.setError("root", {
            message: t("signUp.unknownErr"),
          });
          return;
      }
    }
  };

  const updatePassword = async (data: FormProps) => {
    if (user) {
      try {
        await user
          .updatePassword({
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
            signOutOfOtherSessions: true,
          })
          .then((res) => {
            closeModal && closeModal();
          })
          .catch((err) => {
            setIsLoading(false);
            validationErrMessage(err);
          });
        console.log("Password updated successfully");
      } catch (error) {
        console.error("Error updating password:", error);
        form.setError("root", { message: "Error update Password" });
      }
    }
  };

  const onSubmit = async (data: FormProps) => {
    setIsLoading(true);
    await signIn
      ?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: data.code,
        password: data.newPassword,
      })
      .then((result) => {
        if (result.status === "complete") {
          setActive({ session: result.createdSessionId });
          router.push(`/${lang}/me`);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        validationErrMessage(err);
      });
  };

  return (
    <div className="flex flex-col gap-6 my-14 pb-14 lg:pb-0 lg:my-auto ">
      <Header
        isSignedIn={isSignedIn}
        createNewPAssword={
          isSignedIn ? t("createNewPAssword.title") : undefined
        }
      >
        {otp ? t("signUp.verification.title") : t("signIn.forgotPass.title")}
      </Header>
      <div>
        {!isSignedIn && (
          <>
            <h3 className="font-normal whitespace-nowrap text-sm">
              {t("signIn.forgotPass.codeTitle")}
            </h3>
            <span className="font-semibold text-sm">{email}</span>
          </>
        )}
        {otp ? (
          <>
            <OtpForm
              timer={timer}
              setTimer={setTimer}
              handleOtp={handleOtp}
              activeSignIn={activeSignIn}
              form={otpForm}
              setActive={setActive}
            />
            <button
              onClick={anotherTypeHandler}
              type="button"
              className="mt-2 flex flex-row justify-between text-sm text-blue-highlight font-semibold"
            >
              {t("signIn.otp.useAnother")}
            </button>
          </>
        ) : (
          <FormProvider {...form}>
            <form
              className={cn("flex flex-col gap-4", !isSignedIn && "mt-4")}
              onSubmit={form.handleSubmit(
                isSignedIn ? updatePassword : onSubmit
              )}
            >
              {isSignedIn ? (
                <CurrentPasswordField form={form} />
              ) : (
                <CodeField form={form} required={isSignedIn} />
              )}

              <h3 className="text-sm font-normal">
                {t("signIn.forgotPass.passRec")}
              </h3>
              <NewPasswordField form={form} passStreight={passStreight} />
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
                  password={form.watch("newPassword")}
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
              <ConfirmPassField form={form} />
              <div>
                <Button type="submit" disabled={isLoading}>
                  <p className={isLoading ? "text-gray" : ""}>
                    {t("signIn.forgotPass.save")}
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
    </div>
  );
}
