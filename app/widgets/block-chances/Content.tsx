import { Progress as ProgressBar } from "antd";
import ChancesCaracter from "@/public/svg/chances-caracter.svg";
import React from "react";
import { Props } from "../block-user";

export const Content = ({ value }: { value: number }) => {
  return (
    <>
      <div className="flex flex-row">
        <ProgressBar
          size={80}
          percent={value}
          strokeWidth={12}
          className="font-semibold"
          strokeColor={"#FF7E60"}
          trailColor={"#FFE5DD"}
          type="circle"
        />
        <ChancesCaracter className={"absolute bottom-0 right-0"} />
      </div>
    </>
  );
};
