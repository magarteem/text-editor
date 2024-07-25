import { useTranslation } from "react-i18next";
import { Avatar, TableColumnsType, Tag } from "antd";
import {
  NotificationItemType,
  RequestNotificationListTypes,
} from "@/app/shared";
import { useLanguage } from "@/app/shared/hooks/useLanguage";
import { TypeOfNotificationTag } from "@/app/shared/ui/tags/TypeOfNotificationTag";
import { useQueryNotificationMethods } from "@/app/shared/hooks/useQueryNotificationMethods";
import { dateDeclension } from "@/app/shared/helpers/dateDeclension";

export const useColumns = (params: RequestNotificationListTypes) => {
  const { lang } = useLanguage();
  const { t } = useTranslation();
  const { readNotification, unreadNotification } =
    useQueryNotificationMethods(params);

  const changeRead = (read: number | null, id: number) => {
    if (read) {
      unreadNotification.mutate(id);
    } else {
      readNotification.mutate(id);
    }
  };

  const Columns: TableColumnsType<NotificationItemType> = [
    {
      dataIndex: "columnOne",
      key: "columnOne",
      className: "pl-2",
      render: (columnOne) => {
        return (
          <div className="flex flex-row gap-2 align-middle items-center overflow-ellipsis whitespace-nowrap">
            {!columnOne.read && (
              <div className="flex items-center w-2 h-2 bg-blue-highlight rounded-full" />
            )}
            <Avatar
              src={columnOne.author.imageUrl}
              size={24}
              style={{ background: "#FADDE8" }}
            >
              {!columnOne.author.imageUrl && (
                <p className="text-xs text-raspberries font-semibold">
                  {columnOne.author.firstName && columnOne.author.lastName
                    ? columnOne.author.firstName.split(" ").join("")[0] +
                      columnOne.author.lastName.split(" ").join("")[0]
                    : ""}
                </p>
              )}
            </Avatar>
            <p
              className="whitespace-nowrap font-bold	 text-gray max-w-48 overflow-hidden text-ellipsis"
              title={`${columnOne.author.firstName} ${columnOne.author.lastName}`}
            >
              {`${columnOne.author.firstName} ${columnOne.author.lastName}`}
            </p>

            <div className="text-black-not-so">
              <span
                className="flex flex-wrap"
                dangerouslySetInnerHTML={{ __html: columnOne.message }}
              ></span>
            </div>
          </div>
        );
      },
    },
    {
      dataIndex: "columnTwo",
      key: "columnTwo",
      className: "pr-6",
      render: (columnTwo) => {
        return (
          <div className="relative">
            <div
              data-notify-created-key={columnTwo.id}
              className="flex justify-end items-center gap-4"
            >
              <Tag
                color="#FFE5DD"
                className="flex items-center justify-end rounded h-4 mx-0"
              >
                <p className="font-extrabold text-orange-true text-[9px] ">
                  {columnTwo.important && t("notification.table.important")}
                </p>
              </Tag>

              {columnTwo.created && (
                <p className="text-gray w-[150px]">
                  {dateDeclension(new Date(columnTwo.created).getTime(), lang)}
                </p>
              )}
              <TypeOfNotificationTag type={columnTwo.typeNotification} />
            </div>

            <div
              data-show-btn-key={columnTwo.id}
              className="font-semibold text-blue-highlight right-0 top-0 hidden absolute h-full justify-end items-center"
            >
              <p
                onClick={() => {
                  changeRead(columnTwo.read, columnTwo.id);
                }}
                className="cursor-pointer p-2 min-w-52"
              >
                {columnTwo.read
                  ? t("notification.table.read")
                  : t("notification.table.notRead")}
              </p>
            </div>
          </div>
        );
      },
    },
  ];
  return Columns;
};
