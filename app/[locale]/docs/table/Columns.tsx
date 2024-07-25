import { useTranslation } from "react-i18next";
import { Avatar, TableColumnsType } from "antd";
import { TypeOfClientTag, TypeOfServiceTag } from "@ui/index";
import Equals from "@/public/svg/equals.svg";
import DoubleArrowUp from "@/public/svg/double-arrow-up.svg";
import { labels } from "./hooks/libDocType";
import { TypeSelectorType } from "./types/typeOfDocument";
import { QaListTypes } from "@/app/shared";

export const useColumns = () => {
  const { t } = useTranslation();

  const Columns: TableColumnsType<QaListTypes> = [
    {
      title: () => t("qa.table.columns.client"),
      dataIndex: "client",
      key: "client",
      render: (client) => {
        return (
          <div className="flex flex-row gap-2 align-middle items-center overflow-ellipsis whitespace-nowrap">
            <Avatar
              src={client.imageUrl}
              size={24}
              style={{ background: "#FADDE8" }}
            >
              {!client.imageUrl && (
                <p className="text-xs text-raspberries font-semibold">
                  {client.firstName && client.lastName
                    ? client.firstName.split(" ").join("")[0] +
                      client.lastName.split(" ").join("")[0]
                    : ""}
                </p>
              )}
            </Avatar>
            <p
              className="whitespace-nowrap font-semibold text-gray max-w-48 overflow-hidden text-ellipsis"
              title={`${client.fullName}`}
            >
              {client.fullName}
            </p>
          </div>
        );
      },
    },
    {
      title: t("qa.table.columns.documentType"),
      dataIndex: "typeOfDocument",
      key: "typeOfDocument",
      render: (type: TypeSelectorType) => {
        return (
          <p
            className="whitespace-nowrap max-w-48 overflow-hidden text-ellipsis"
            title={t(labels[type])}
          >
            {t(labels[type])}
          </p>
        );
      },
    },
    {
      title: t("qa.table.columns.curator"),
      dataIndex: "curator",
      key: "curator",
      render: (curator) => {
        return (
          <div className="flex flex-row gap-2 align-middle items-center overflow-ellipsis text-nowrap">
            {!!curator.firstName ? (
              <>
                <Avatar
                  src={curator.imageUrl}
                  size={24}
                  style={{ background: "#E7E8FF" }}
                >
                  {!curator.imageUrl && (
                    <p className="text-xs text-gray font-semibold">
                      {curator.firstName.split(" ").join("")[0] +
                        curator.lastName.split(" ").join("")[0]}
                    </p>
                  )}
                </Avatar>
                <p
                  className="whitespace-nowrap font-medium max-w-48 overflow-hidden text-ellipsis"
                  title={`${curator.firstName} ${curator.lastName}`}
                >
                  {curator.firstName}&nbsp;{curator.lastName}
                </p>
              </>
            ) : (
              <p className="text-gray opacity whitespace-nowrap text-ellipsis opacity-60">
                {t("qa.table.columns.defaultValues")}
              </p>
            )}
          </div>
        );
      },
    },
    {
      title: t("qa.table.columns.strategist"),
      dataIndex: "strategist",
      key: "strategist",
      render: (strategist) => (
        <div className="flex flex-row gap-2 align-middle items-center overflow-ellipsis text-nowrap">
          {!!strategist.firstName ? (
            <>
              <Avatar
                src={strategist.imageUrl}
                size={24}
                style={{ background: "#E7E8FF" }}
              >
                {!strategist.imageUrl && (
                  <p className="text-xs text-gray font-semibold">
                    {strategist.firstName.split(" ").join("")[0] +
                      strategist.lastName.split(" ").join("")[0]}
                  </p>
                )}
              </Avatar>
              <p
                className="whitespace-nowrap font-medium max-w-48 overflow-hidden text-ellipsis"
                title={`${strategist.firstName} ${strategist.lastName}`}
              >
                {strategist.firstName}&nbsp;{strategist.lastName}
              </p>
            </>
          ) : (
            <p className="text-gray opacity whitespace-nowrap text-ellipsis opacity-60">
              {t("qa.table.columns.defaultValues")}
            </p>
          )}
        </div>
      ),
    },
    {
      title: t("qa.table.columns.priority"),
      dataIndex: "priority",
      key: "priority",
      align: "center",
      render: (priority) => {
        return (
          <div className="flex justify-center">
            {priority === "High" && <DoubleArrowUp />}
            {priority === "Standard" && <Equals />}
          </div>
        );
      },
    },
    {
      title: t("qa.table.columns.clientType"),
      dataIndex: "candidateClassification",
      key: "candidateClassification",
      align: "center",
      render: (type) => {
        return <TypeOfClientTag type={type} />;
      },
    },
    {
      title: () => (
        <p className="whitespace-nowrap">{t("qa.table.columns.service")}</p>
      ),
      dataIndex: "targetDetailsTypeOfService",
      key: "targetDetailsTypeOfService",
      align: "center",
      render: (typeOfService) => {
        return <TypeOfServiceTag type={typeOfService} />;
      },
    },
  ];
  return Columns;
};
