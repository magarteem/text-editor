import React from "react";
import { useTranslation } from "react-i18next";
import OtpIcon from "@/public/svg/opt-icon.svg";

export function OtpButton({ handler, email }: { handler: any; email: string }) {
  const { t } = useTranslation();

  return (
    <button
      className="flex flex-row gap-2 items-center px-4 py-2 bg-blue-light rounded-xl  hover:bg-blue-ukrainian"
      onClick={handler}
    >
      <OtpIcon />
      <p className="font-semibold text-sm text-nowrap text-ellipsis overflow-hidden">
        {t("signIn.otp.code")}
        &nbsp;
        {email}
      </p>
    </button>
  );
}
