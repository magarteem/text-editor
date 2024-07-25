"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CaracterImage from "@/public/svg/sign-in_catacter.svg";
import { ConfigProvider, Select } from "antd";
import { Manrope } from "next/font/google";
import SignIn from "./SignIn";
import { useTranslation } from "react-i18next";

const manrope = Manrope({ subsets: ["latin", "cyrillic"] });

export function PageInner({ initialLang }: { initialLang: string }) {
  const [lang, setLang] = useState(initialLang);
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (value: string) => {
    setLang(value);
    i18n.changeLanguage(value);
    router.push(`/sign-in?lang=${value}`);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: manrope.style.fontFamily,
        },
      }}
    >
      <div className={"flex h-full overflow-scroll"}>
        <div className="w-full justify-center lg:w-1/2 flex items-center lg:justify-end relative">
          <div>
            <SignIn />
          </div>
        </div>
        <div className="hidden lg:flex w-1/2 bg-[#E0EAF14D] items-center justify-start relative">
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
            <CaracterImage />
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}
