import React, { useEffect } from "react";
import { Spin, Table, ConfigProvider, Empty } from "antd";
import Icon, { LoadingOutlined } from "@ant-design/icons";
import { useColumns } from "./Columns";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "next/navigation";
import LoadingSpinIcon from "@/public/svg/loading-spin-icon.svg";
import EmptyImage from "@/public/svg/empty-image.svg";
import NextPaginationImage from "@/public/svg/pagination-left.svg";
import PrevPaginationImage from "@/public/svg/pagination-right.svg";

interface ClientTableProps {
  totalItems?: number;
  loading?: boolean;
  dataSource?: any;
  fetchRecords?: any;
  page?: number;
  pageSize?: number;
  setPage?: any;
  setPageSize: any;
  sort?: string;
  params?: any;
  fullName?: string;
}

const ClientTable = ({
  totalItems,
  loading,
  page,
  dataSource,
  fetchRecords,
  setPage,
  pageSize,
  setPageSize,
  sort,
  params,
  fullName,
}: ClientTableProps) => {
  const { t } = useTranslation();
  const columns = useColumns();
  const pathName = usePathname();
  const router = useRouter();

  const getLoadedRecordsText = () => (
    <span className="flex flex-row gap-2 items-center">
      <p>{t("clients.table.columns.client")}</p>
      <div className="bg-blue-bright-highlight px-2 py-1 text-blue-marian rounded-lg text-xs">
        {loading ? (
          <Spin
            size="small"
            indicator={<LoadingOutlined style={{ fontSize: 12 }} spin />}
          />
        ) : (
          totalItems
        )}
      </div>
    </span>
  );

  const customColumnTitle = (
    <div>
      <span>{getLoadedRecordsText()}</span>
    </div>
  );

  const customColumns = columns.map((column) => {
    if (column.key === "client") {
      return {
        ...column,
        title: customColumnTitle,
      };
    }
    return column;
  });

  return (
    <div
      className="mb-20 lg:mb-10 mt-2 bg-white overflow-clip shadow-sm"
      style={{
        borderRadius: "32px",
        display: "block",
        height: "100%",
        background: "#fff !important",
      }}
    >
      <Spin
        spinning={loading}
        size="large"
        indicator={
          <Icon component={LoadingSpinIcon} style={{ fontSize: 96 }} spin />
        }
      >
        <ConfigProvider
          renderEmpty={() => (
            <Empty
              className="max-h-80 text-lg font-normal"
              image={<EmptyImage />}
              imageStyle={{
                maxHeight: "270px",
                height: "auto",
              }}
              description={t("clients.table.emptyTable")}
            />
          )}
        >
          <Table
            columns={customColumns}
            dataSource={dataSource}
            scroll={{ x: true }}
            style={{ background: "#fff" }}
            rowKey={(row) => String(row.id)}
            className={`${loading ? "blur-xs" : ""}`}
            onRow={(record, index) => {
              return {
                onClick: () => router.push(`${pathName}/${record.id}`),
              };
            }}
            pagination={{
              pageSizeOptions: [10, 20, 30],
              showSizeChanger: true,
              nextIcon: <NextPaginationImage />,
              prevIcon: <PrevPaginationImage />,
              position: ["bottomCenter"],
              locale: { items_per_page: "" },
              current: page,
              responsive: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total}`,
              onChange: (pageNumber, newPageSize) => {
                if (pageSize !== newPageSize) {
                  setPage(1);
                  setPageSize(newPageSize);
                  const curr = !!fullName
                    ? { fullName: fullName }
                    : { ...params };
                  curr["page"] = 1;
                  curr["pageSize"] = newPageSize;
                  curr["sortBy"] = sort;

                  fetchRecords(curr);
                } else {
                  setPage(pageNumber);
                  setPageSize(pageSize);
                  const curr = !!fullName
                    ? { fullName: fullName }
                    : { ...params };
                  curr["page"] = pageNumber;
                  curr["pageSize"] = pageSize;
                  curr["sortBy"] = sort;

                  fetchRecords(curr);
                }
              },
              total: totalItems,
              style: {
                position: "relative",
                background: "#fff !important",
                display: "flex !important",
                flexDirection: "row",
              },
            }}
          />
        </ConfigProvider>
      </Spin>
    </div>
  );
};

export default ClientTable;
