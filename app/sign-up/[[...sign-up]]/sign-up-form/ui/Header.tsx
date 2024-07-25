import React from "react";
import LogoSmallImage from "@/public/svg/logo-small.svg";
import LogoSmallTextImage from "@/public/svg/logo-small-text.svg";

interface HeaderProps {
  children: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  return (
    <div className="mb-6">
      <div className="whitespace-nowrap flex flex-row items-center gap-2">
        <LogoSmallImage />
        <LogoSmallTextImage />
      </div>
      <h3 className="font-semibold text-wrap lg:text-nowrap mt-6">
        {children}
      </h3>
    </div>
  );
}
