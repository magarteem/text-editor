import React, { useState } from "react";
import { Block } from "@/app/features/block/Block";
import { Label } from "../block-user";
import { useTranslation } from "react-i18next";
import { DuplicateByEmail } from "./ui/DuplicateByEmail";
import { ItemNotification } from "./ui/ItemNotification";
import {
  useQueryNotificationInSettings,
  useQueryNotificationSettingsMethods,
} from "@/app/shared/hooks/useQueryNotificationInSettings";
import { Button } from "@/app/shared/ui/button/Button";
import { ResponseNotificationInSettings } from "@/app/shared/api/types/responseNotificationInSettings";
import { GetProfileResponse } from "@/app/shared";
import { useQueryPatchProfile } from "@/app/shared/hooks/useQueryPatchProfile";

interface Props {
  profile: GetProfileResponse | null;
}
export const Notifications = ({ profile }: Props) => {
  const { t } = useTranslation();
  const { updateNotification } = useQueryNotificationSettingsMethods();
  const { patchProfileFn } = useQueryPatchProfile(profile?.id);
  const { data, isLoading } = useQueryNotificationInSettings();
  let tempData = data ? data : [];
  const [toggle, setToggleSwitcher] = useState(profile?.notificationToEmail);
  const [changeItems, setChangeItems] = useState<
    ResponseNotificationInSettings[] | []
  >(tempData);

  if (isLoading) return;

  const changeItemsBd = (bd: ResponseNotificationInSettings) => {
    const findItems = changeItems.find((x) => x.uid === bd.uid);
    if (!findItems) {
      setChangeItems([...changeItems, { ...bd, allow: !bd.allow }]);
    } else {
      const mapItems = changeItems.filter((y) => y.uid !== bd.uid);
      setChangeItems(mapItems);
    }
  };

  const toggleUpdate = (checked: boolean) => setToggleSwitcher(checked);
  const setUpdateData = async () => {
    updateNotification.mutate(changeItems, {
      onSuccess() {
        setChangeItems([]);
      },
    });
    if (profile && toggle !== profile.notificationToEmail) {
      patchProfileFn.mutate(
        {
          id: profile?.id,
          notificationToEmail: toggle ?? false,
        },
        {
          onSuccess() {
            setToggleSwitcher(profile.notificationToEmail);
          },
        }
      );
    }
  };

  const valid =
    toggle === profile?.notificationToEmail && changeItems.length === 0;

  return (
    <Block isEditable={false} classNames="flex-grow flex-shrink-1 basis-full">
      <div className="flex justify-between">
        <Label>{t("settings.notifications.title")}</Label>
        <DuplicateByEmail
          notificationToEmail={toggle}
          toggleUpdate={toggleUpdate}
        />
      </div>
      <div className="flex flex-col gap-4">
        {data?.map((x) => (
          <ItemNotification
            key={x.uid}
            item={x}
            changeItemsBd={changeItemsBd}
          />
        ))}
      </div>

      <Button
        className="w-[108px]"
        type={"submit"}
        disabled={valid}
        onClick={setUpdateData}
      >
        <p className={valid ? "text-gray" : ""}>{t("button.save")}</p>
      </Button>
    </Block>
  );
};
