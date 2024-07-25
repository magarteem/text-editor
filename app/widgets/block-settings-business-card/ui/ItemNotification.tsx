import { ResponseNotificationInSettings } from "@/app/shared/api/types/responseNotificationInSettings";
import { TypeOfNotificationTag } from "@/app/shared/ui/tags/TypeOfNotificationTag";
import { Checkbox } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  item: ResponseNotificationInSettings;
  changeItemsBd: (item: ResponseNotificationInSettings) => void;
}

export const ItemNotification = ({ item, changeItemsBd }: Props) => {
  const { t } = useTranslation();

  const change = () => changeItemsBd(item);

  return (
    <div className="flex justify-between">
      <div className="flex gap-2 items-center text-black-not-so font-medium	text-sm">
        <TypeOfNotificationTag type={item.typeNotification} />
        {t(`settings.notifications.apiResponse.` + item.uid)}
      </div>

      <Checkbox onChange={change} defaultChecked={item.allow} />
    </div>
  );
};
