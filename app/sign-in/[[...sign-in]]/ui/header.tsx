import React from "react";
import LogoSmallImage from "@/public/svg/logo-small.svg";
import LogoSmallTextImage from "@/public/svg/logo-small-text.svg";
import EditFile from "@/public/svg/edit-file.svg";

interface HeaderProps {
  children: React.ReactNode;
  isSignedIn: boolean | undefined;
  createNewPAssword?: string;
}

export function Header({
  children,
  isSignedIn,
  createNewPAssword,
}: HeaderProps) {
  if (isSignedIn) {
    return (
      <h1 className={"flex items-center gap-2 text-gray text-base font-bold"}>
        <EditFile />
        {createNewPAssword}
      </h1>
    );
  }

  return (
    <>
      <div className="whitespace-nowrap flex flex-row items-center gap-2">
        <LogoSmallImage />
        <LogoSmallTextImage />
      </div>
      <h3 className="font-semibold">{children}</h3>
    </>
  );
}
