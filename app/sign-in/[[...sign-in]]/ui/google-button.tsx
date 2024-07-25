import React from "react";
import { useTranslation } from "react-i18next";
import GoogleIcon from "@/public/svg/google-logo.svg";

export function GoogleButton({ handler }: { handler: any }) {
  const { t } = useTranslation();

  return (
    <button
      className="flex flex-row gap-2 items-center px-4 py-2 bg-blue-light rounded-xl hover:bg-blue-ukrainian"
      onClick={handler}
    >
      <GoogleIcon />
      <p className="font-semibold text-sm">{t("signIn.google")}</p>
    </button>
  );
}
