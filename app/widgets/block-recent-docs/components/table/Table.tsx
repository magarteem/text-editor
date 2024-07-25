import React from "react";
import { Table as AntTable, ConfigProvider, Empty } from "antd";
import { useTranslation } from "react-i18next";
import DocumentIcon from "@/public/svg/dock-icon.svg";
import DownloadIcon from "@/public/svg/download-icon.svg";
import InnerDownloadIcon from "@/public/svg/InnerDownloadIcon.svg";
import { downloadFileOnClick } from "../../helpers";

export function Table({ dataSource }: { dataSource: any }) {
  const { t } = useTranslation();

  const columns = [
    {
      title: "icon",
      dataIndex: "icon",
      key: "icon",
      width: 20,
      render: (icon: string) => {
        return (
          <div className="pl-5">
            {icon == null ? <DocumentIcon /> : <InnerDownloadIcon />}
          </div>
        );
      },
    },
    {
      title: "FileName",
      dataIndex: "FileName",
      key: "FileName",
    },
    {
      title: "author",
      dataIndex: "author",
      key: "author",
      render: (author: { firstName: string; lastName: string }) => {
        return (
          <p className="text-sm">
            {author
              ? `${author.firstName} ${author.lastName[0]}`
              : t("clients.table.defaultValues.curator")}
          </p>
        );
      },
    },
    {
      title: "created",
      dataIndex: "created",
      key: "created",
      classNames: "text-sm bg-black",
    },
    {
      title: "download",
      dataIndex: "download",
      key: "download",
      width: 30,
      render: (download: {
        link: string;
        id: number;
        type: string;
        name: string;
      }) => {
        return download.link == null ? (
          <a
            className="pr-5 flex items-center"
            onClick={() => {
              downloadFileOnClick({
                fileId: download.id,
                mimeType: download.type,
                fileName: download.name,
              });
            }}
          >
            <DownloadIcon />
          </a>
        ) : (
          <a
            className="pr-5 flex items-center"
            href={download.link}
            target="_blank"
          >
            <DownloadIcon />
          </a>
        );
      },
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            cellPaddingBlock: 8,
            cellPaddingInline: 4,
          },
        },
      }}
      renderEmpty={() => (
        <Empty image={false} description={t("clients.table.emptyTable")} />
      )}
    >
      <AntTable
        rowKey={(row) => String(row.id)}
        columns={columns}
        dataSource={dataSource}
        style={{ borderTop: "1px solid #f0f0f0" }}
        pagination={false}
        showHeader={false}
        rowClassName="text-sm font-normal"
      />
    </ConfigProvider>
  );
}
