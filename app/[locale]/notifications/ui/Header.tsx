import BellActive from "@/public/svg/bell.svg";
import { useTranslation } from "react-i18next";
import { FieldRadioBtnFilter } from "./FieldRadioBtnFilter";
import { FieldOnlyReady } from "./FieldOnlyReady";
import { menu } from "../helpers/menuItems";
import { ReturnTransformedData } from "@/app/shared/hooks/useQueryNotificationMethods";
import { TypeNotification } from "@/app/shared";
import { useEffect, useState } from "react";

type NotificationKey = {
  System: number;
  Deadline: number;
  Document: number;
  Progress: number;
};
const initialCount = {
  System: 0,
  Deadline: 0,
  Document: 0,
  Progress: 0,
};
interface HeaderProps {
  dataSource: ReturnTransformedData | undefined;
  form: any;
  changeTopFilter: (obj: {
    page: number;
    typeNotification?: TypeNotification;
    onlyRead?: boolean;
  }) => void;
}

export function Header({ form, dataSource, changeTopFilter }: HeaderProps) {
  const { t } = useTranslation();
  const [count, setCount] = useState<NotificationKey>(initialCount);

  useEffect(() => {
    if (dataSource) {
      const {
        numberTypeOfNotification,
        numberTotalNotification,
        numberTotalNotificationRead,
      } = dataSource?.numberTypeOfNotification;

      let obj = numberTypeOfNotification?.reduce((object, value) => {
        return {
          ...object,
          [value.typeNotification]: value.totalNumber - value.readNumber,
        };
      }, {}) as NotificationKey;
      obj["System"] = numberTotalNotification - numberTotalNotificationRead;
      setCount(obj);
    }
  }, [dataSource]);

  return (
    <div className="flex flex-col gap-4 mb-5">
      <div className="flex flex-row gap-2 items-center">
        <BellActive />
        <p className="text-sm leading-6 text-gray font-semibold">
          {t("notification.header.title")}
        </p>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex font-semibold">
          {menu.map((x) => {
            return (
              <FieldRadioBtnFilter
                key={x.id}
                form={form}
                x={x}
                counts={count[x.id] ? count[x.id] : undefined}
                changeTopFilter={changeTopFilter}
              />
            );
          })}
        </div>

        <FieldOnlyReady form={form} changeTopFilter={changeTopFilter} />
      </div>
    </div>
  );
}
