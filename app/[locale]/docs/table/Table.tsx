import { Spin, Table, ConfigProvider, Empty } from "antd";
import Icon, { LoadingOutlined } from "@ant-design/icons";
import { useColumns } from "./Columns";
import { useTranslation } from "react-i18next";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingSpinIcon from "@/public/svg/loading-spin-icon.svg";
import EmptyImage from "@/public/svg/empty-image.svg";
import NextPaginationImage from "@/public/svg/pagination-left.svg";
import PrevPaginationImage from "@/public/svg/pagination-right.svg";
import { RequestQaListType } from "@/app/shared";

interface ClientTableProps {
  totalItems?: number;
  loading?: boolean;
  dataSource: any;
  updateQueryParams: (params: RequestQaListType) => void;
  page?: number;
  pageSize?: number;
  setPage?: any;
  setPageSize: any;
  params?: any;
  fullName?: string;
}

const ClientTable = ({
  totalItems,
  loading,
  page,
  dataSource,
  updateQueryParams,
  setPage,
  pageSize,
  setPageSize,
  params,
  fullName,
}: ClientTableProps) => {
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const columns = useColumns();
  const { push } = useRouter();

  const lang = searchParams.get("lang") || "ru";

  const getLoadedRecordsText = () => (
    <span className="flex flex-row gap-2 items-center">
      <p>{t("qa.table.columns.client")}</p>
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
              description={t("qa.table.emptyTable")}
            />
          )}
        >
          <Table
            rowClassName="cursor-pointer"
            columns={customColumns}
            dataSource={dataSource}
            scroll={{ x: true }}
            style={{ background: "#fff" }}
            rowKey={(row) => String(row.id)}
            className={`${loading ? "blur-xs" : ""}`}
            onRow={(record, index) => {
              return {
                onClick: () =>
                  push(`/${lang}/clients/${record.client.id}/${record.id}`),
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
                  curr["itemsPerPage"] = newPageSize;
                  updateQueryParams(curr);
                } else {
                  setPage(pageNumber);
                  setPageSize(pageSize);
                  const curr = !!fullName
                    ? { fullName: fullName }
                    : { ...params };
                  curr["page"] = pageNumber;
                  curr["itemsPerPage"] = pageSize;
                  updateQueryParams(curr);
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
