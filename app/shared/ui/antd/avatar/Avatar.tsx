import React from "react";
import { Avatar as AntAvatar } from "antd";
import CameraIcon from "@/public/svg/photo-avatar.svg";

export function Avatar({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="w-14 h-14 aspect-square">
      <AntAvatar
        shape="square"
        size={56}
        src={imageUrl}
        icon={<CameraIcon />}
        style={{
          background: "#fff",
          borderRadius: "16px",
          border: "1px solid #EAF0F5",
        }}
        alt="avatar"
      />
    </div>
  );
}
