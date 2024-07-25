import React from "react";
import { Tag } from "antd";
import CrownIcon from "@/public/svg/corwn.svg";

export function TopTag() {
  return (
    <Tag
      color="#FCEDE3"
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "4px",
        alignItems: "center",
      }}
    >
      <CrownIcon />
      <p className="text-yellow-deep font-bold text-[9px]">TOP</p>
    </Tag>
  );
}
