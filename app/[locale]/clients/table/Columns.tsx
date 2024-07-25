import { useTranslation } from "react-i18next";
import { Avatar, TableColumnsType } from "antd";
import { usePathname } from "next/navigation";
import {
  CompletedTasksTag,
  TypeOfClientTag,
  TypeOfServiceTag,
} from "@ui/index";
import { IClientTableColumns } from "./types/columnTypes";
import RefFlagIcon from "@/public/svg/redFlag.svg";
import OrangeFlagIcon from "@/public/svg/orangeFlag.svg";
import Link from "next/link";
import { DeleteButton } from "../ui";

export const useColumns = () => {
  const { t } = useTranslation();
  const pathName = usePathname();
  const statuses = new Set(["Completed", "Skipped"]);

  const Columns: TableColumnsType<IClientTableColumns> = [
    {
      title: () => t("clients.table.columns.client"),
      dataIndex: "client",
      key: "client",
      render: (client) => (
        <Link href={`${pathName}/${client.id}`}>
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
        </Link>
      ),
    },
    {
      title: t("clients.table.columns.type"),
      dataIndex: "typeOfClient",
      key: "typeOfClient",
      align: "center",
      render: (type) => {
        return <TypeOfClientTag type={type} />;
      },
    },
    {
      title: t("clients.table.columns.country"),
      dataIndex: "targetCountry",
      key: "targetCountry",
      render: (targetCountry) => {
        if (!targetCountry)
          return (
            <p className="text-sm text-gray opacity-60 whitespace-nowrap text-ellipsis max-w-48 overflow-hidden">
              {t("clients.table.defaultValues.country")}
            </p>
          );

        switch (targetCountry.length) {
          case 1:
            return (
              <p
                className="text-sm whitespace-nowrap text-ellipsis"
                title={targetCountry[0].country}
              >
                {targetCountry[0].country}
              </p>
            );
          default:
            const stringsArray = targetCountry.map(function (
              obj: Record<string, number | string>
            ) {
              return obj.country;
            });
            return (
              <p
                className={`whitespace-nowrap max-w-60 text-ellipsis overflow-hidden cursor-pointer`}
                title={stringsArray.join(", ")}
              >
                {stringsArray.join(", ")}
              </p>
            );
        }
      },
    },
    {
      title: t("clients.table.columns.year"),
      dataIndex: "targetDetailsYear",
      key: "targetDetailsYear",
      align: "center",
      render: (year) =>
        !!year ? (
          <p>{year}</p>
        ) : (
          <p>{t("clients.table.defaultValues.universities")}</p>
        ),
    },
    {
      title: t("clients.table.columns.degree"),
      dataIndex: "targetDetailsPersonDegree",
      key: "targetDetailsPersonDegree",
      render: (degree) => {
        switch (degree) {
          case "Master":
            return <p>{t("clients.degree.master")}</p>;
          case "Bachelor":
            return <p>{t("clients.degree.bachelor")}</p>;
          case "GraduateStudent":
            return <p>{t("clients.degree.graduateStudent")}</p>;
          default:
            return (
              <p className="text-gray opacity-60 whitespace-nowrap text-ellipsis">
                {t("clients.table.defaultValues.degree")}
              </p>
            );
        }
      },
    },
    {
      title: () => (
        <p className="whitespace-nowrap">
          {t("clients.table.columns.typeOfService")}
        </p>
      ),
      dataIndex: "targetDetailsTypeOfService",
      key: "targetDetailsTypeOfService",
      align: "center",
      render: (typeOfService) => {
        return <TypeOfServiceTag type={typeOfService} />;
      },
    },
    {
      title: t("clients.table.columns.curator"),
      dataIndex: "curator",
      key: "curator",
      render: (curator) => (
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
              {t("clients.table.defaultValues.curator")}
            </p>
          )}
        </div>
      ),
    },
    {
      title: t("clients.table.columns.terms"),
      dataIndex: "terms",
      key: "terms",
      align: "center",
      render: (terms) => {
        const redFlags =
          terms.redStage && terms.redStage.length
            ? terms.redStage.filter(
                (item: any) => !statuses.has(item.status) && item.visibility
              )
            : 0;
        const orangeFlags =
          terms.orangeStage && terms.orangeStage.length
            ? terms.orangeStage.filter(
                (item: any) => !statuses.has(item.status) && item.visibility
              )
            : 0;

        return (
          <div className="flex flex-row gap-2">
            {!!terms.orangeStage && orangeFlags.length >= 1 && (
              <div className="flex flex-row gap-1 items-center justify-center">
                <p className="text-sm text-yellow-deep">{orangeFlags.length}</p>
                <div className="h-3">
                  <OrangeFlagIcon />
                </div>
              </div>
            )}
            {!!terms.redStage && redFlags.length >= 1 && (
              <div className="flex flex-row gap-1 items-center justify-center">
                <p className="text-sm text-orange-giants">{redFlags.length}</p>
                <div className="h-3">
                  <RefFlagIcon />
                </div>
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: t("clients.table.columns.progress"),
      dataIndex: "progress",
      key: "progress",
      align: "center",
      render: (progress) => (
        <div>
          {!!progress.total && (
            <CompletedTasksTag
              completed={progress.completed}
              total={progress.total}
            />
          )}
        </div>
      ),
    },
    {
      title: t("clients.table.columns.chances"),
      dataIndex: "chances",
      key: "chances",
      align: "center",
      render: (chances) => {
        return !!chances ? (
          <p>{chances}%</p>
        ) : (
          <p className="text-gray opacity whitespace-nowrap text-ellipsis opacity-60">
            {t("clients.table.defaultValues.chances")}
          </p>
        );
      },
    },
    {
      title: t("clients.table.columns.program"),
      dataIndex: "program",
      key: "program",
      render: (program) =>
        program ? (
          <p
            className="overflow-ellipsis whitespace-nowrap max-w-40 overflow-hidden cursor-pointer"
            title={program}
          >
            {program}
          </p>
        ) : (
          <p className="text-gray whitespace-nowrap text-ellipsis opacity-60 overflow-hidden">
            {t("clients.table.defaultValues.program")}
          </p>
        ),
    },
    {
      title: t("clients.table.columns.universities"),
      dataIndex: "universities",
      key: "universities",
      align: "center",
      render: (universities) =>
        !!universities.simple && !!universities.top ? (
          <p>{`${universities.simple}/${universities.top}`}</p>
        ) : (
          <p className="text-gray opacity whitespace-nowrap text-ellipsis opacity-60">
            {t("clients.table.defaultValues.universities")}
          </p>
        ),
    },
    {
      title: () => (
        <p className="whitespace-nowrap">
          {t("clients.table.columns.periodOfСooperation")}
        </p>
      ),
      dataIndex: "periodOfСooperation",
      key: "periodOfСooperation",
      render: (date) => {
        const startDate = new Date(date.start * 1000);
        const endDate = new Date(date.end * 1000);

        return date.start || date.end ? (
          <p className="overflow-ellipsis whitespace-nowrap">{`${
            date.start
              ? startDate.toLocaleDateString("ru-RU", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : t("clients.table.defaultValues.curator")
          }-${
            date.end
              ? endDate.toLocaleDateString("ru-RU", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : t("clients.table.defaultValues.curator")
          }`}</p>
        ) : (
          <p className="text-gray opacity whitespace-nowrap text-ellipsis opacity-60">
            {t("clients.table.defaultValues.curator")}
          </p>
        );
      },
    },
    {
      dataIndex: "delete",
      key: "delete",
      render: (data) => <DeleteButton id={data.id} fullName={data.fullName} />,
    },
  ];
  return Columns;
};
