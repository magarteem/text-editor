"use client";

import { useState } from "react";
import { SignInForm } from "./sign-in-form/SignInForm";
import { ForgotPasswordForm } from "./forgot-pass-form/ForgotPasswordForm";
import { useTranslation } from "react-i18next";
import BackIcon from "@/public/svg/back-arrow.svg";

export default function SignIn() {
  const { t } = useTranslation();

  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [stepOneFlag, setStepOneFlag] = useState(false);
  const [anotherType, setAnotherType] = useState(false);
  const [timer, setTimer] = useState(30);
  const [email, setEmail] = useState("");
  const [activeSignIn, setActiveSignIn] = useState<any>();

  const forgotPasswordHandler = () => {
    setIsForgotPassword((prev) => !prev);
  };

  const anotherTypeHandler = () => {
    setAnotherType((prev) => !prev);
  };

  const handleBack = () => {
    isForgotPassword
      ? forgotPasswordHandler()
      : anotherType
        ? setAnotherType(false)
        : setStepOneFlag(false);
  };

  return (
    <>
      {(isForgotPassword || stepOneFlag) && (
        <button
          className="absolute top-6 left-9 flex flex-row gap-2 items-center"
          onClick={handleBack}
        >
          <BackIcon />
          <p className="text-sm text-blue-highlight font-semibold">
            {t("signIn.return")}
          </p>
        </button>
      )}
      <div className="container lg:ml-auto h-full flex items-center justify-end max-w-5xl relative overflow-scroll lg:overflow-hidden">
        <div
          className={"flex flex-col gap-6 w-96 lg:mx-0 lg:mr-36 h-full mx-auto"}
        >
          {isForgotPassword ? (
            <ForgotPasswordForm
              email={email}
              otp={anotherType}
              anotherTypeHandler={handleBack}
              timer={timer}
              setTimer={setTimer}
              activeSignIn={activeSignIn}
            />
          ) : (
            <SignInForm
              toggle={forgotPasswordHandler}
              setEmail={setEmail}
              email={email}
              anotherType={anotherType}
              setActiveSignIn={setActiveSignIn}
              anotherTypeHandler={anotherTypeHandler}
              stepOneFlag={stepOneFlag}
              setStepOneFlag={setStepOneFlag}
            />
          )}
        </div>
      </div>
    </>
  );
}
