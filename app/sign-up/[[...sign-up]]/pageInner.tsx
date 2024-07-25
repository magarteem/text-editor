"use client";

import CaracterImage from "@/public/svg/sign-up-caracter.svg";
import CaracterImageStart from "@/public/svg/sign-up-caracter-start.svg";
import { ConfigProvider, Select } from "antd";
import { Manrope } from "next/font/google";
import { SignUp } from "./SignUp";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const manrope = Manrope({ subsets: ["latin", "cyrillic"] });

export function PageInner({ initialLang }: { initialLang: string }) {
  const [finish, setFinish] = useState(false);

  const [lang, setLang] = useState(initialLang);
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (value: string) => {
    setLang(value);
    i18n.changeLanguage(value);
    router.push(`/sign-up?lang=${value}`);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: manrope.style.fontFamily,
        },
      }}
    >
      <main className="flex h-full overflow-x-scroll">
        <div className="w-full justify-center lg:w-1/2 flex items-center lg:justify-end h-full">
          <SignUp setFinish={setFinish} />
        </div>
        <div className="hidden lg:flex lg:w-1/2 bg-[#E0EAF14D] items-center justify-start h-full relative">
          <Select
            value={lang}
            onChange={handleLanguageChange}
            style={{
              position: "absolute",
              top: "24px",
              right: "24px",
            }}
          >
            <Select.Option value="ru">Русский</Select.Option>
            <Select.Option value="en">English</Select.Option>
          </Select>
          <div className="p-16">
            {finish ? <CaracterImage /> : <CaracterImageStart />}
          </div>
        </div>
      </main>
    </ConfigProvider>
  );
}
