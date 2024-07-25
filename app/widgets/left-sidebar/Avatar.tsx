"use client";
import cn from "classnames";
import { Avatar as AvatarAnt } from "antd";
import { useProfileStore } from "@store/index";
import { useStore } from "zustand";

export const Avatar = ({ collapsed }: { collapsed: boolean }) => {
  const profile = useStore(useProfileStore);

  return (
    <div>
      <div
        className={cn({
          "w-fit flex items-center font-bold text-gray cursor-pointer": true,
          "gap-2 p-2": !collapsed,
          "pl-1": collapsed,
        })}
      >
        <AvatarAnt
          src={!!profile && profile.imageUrl}
          size={32}
          style={{ background: "#FADDE8" }}
        >
          {!!profile && !profile.imageUrl && (
            <p className="text-xs text-raspberries font-semibold">
              {profile.firstName.split(" ").join("")[0] +
                profile.lastName.split(" ").join("")[0]}
            </p>
          )}
        </AvatarAnt>
        {!collapsed && (
          <div className={"text-sm whitespace-nowrap"}>
            {profile?.firstName} {profile?.lastName}
          </div>
        )}
      </div>
    </div>
  );
};
