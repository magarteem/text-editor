"use client";
import cn from "classnames";
import { Avatar as AvatarAnt } from "antd";
import { Field, Label } from "@/app/widgets";
import { useTranslation } from "react-i18next";
import { User } from "@/app/[locale]/clients/[userId]/tableDocuments/type/columnsType";

interface Props {
  text?: string;
  user: User | null | undefined;
}
export const Curator = ({ text, user }: Props) => {
  const { t } = useTranslation();

  return (
    <Field>
      <Label>{!!text ? text : t("storage.formText.curatorDoc")}</Label>
      <div
        className={cn({
          "w-full flex gap-2 items-center font-bold text-gray cursor-pointer":
            true,
        })}
      >
        <AvatarAnt
          src={!!user && user.imageUrl}
          size={32}
          style={{ background: "#FADDE8", minWidth: "32px" }}
        >
          {!!user && !user.imageUrl && (
            <p className="text-xs text-raspberries font-semibold">
              {user.firstName.split(" ").join("")[0] +
                user.lastName.split(" ").join("")[0]}
            </p>
          )}
        </AvatarAnt>

        <div
          className={
            "text-sm font-medium	text-black-not-so whitespace-nowrap overflow-hidden text-ellipsis"
          }
        >
          {user?.firstName} {user?.lastName}
        </div>
      </div>
    </Field>
  );
};
