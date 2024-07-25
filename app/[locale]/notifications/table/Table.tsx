import { Spin, Table, ConfigProvider, Empty } from "antd";
import Icon from "@ant-design/icons";
import { useColumns } from "./Columns";
import { useTranslation } from "react-i18next";
import LoadingSpinIcon from "@/public/svg/loading-spin-icon.svg";
import EmptyImage from "@/public/svg/empty-image.svg";
import NextPaginationImage from "@/public/svg/pagination-left.svg";
import PrevPaginationImage from "@/public/svg/pagination-right.svg";
import { NotificationItemType, RequestQaListType } from "@/app/shared";
import cn from "classnames";

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
}

const NotificationTable = ({
  totalItems,
  loading,
  page,
  dataSource,
  updateQueryParams,
  setPage,
  pageSize,
  setPageSize,
  params,
}: ClientTableProps) => {
  const { t } = useTranslation();
  const columns = useColumns(params);

  const hiddenText = (elem: "hidden" | "show", id: number) => {
    const element = document.querySelector(
      `[data-notify-created-key="${id}"]`
    ) as HTMLElement | null;

    const showBtnKey = document.querySelector(
      `[data-show-btn-key="${id}"]`
    ) as HTMLElement | null;

    if (element && showBtnKey) {
      element.style.display = elem === "hidden" ? "none" : "flex";
      showBtnKey.style.display = elem === "hidden" ? "flex" : "none";
    }
  };

  const rowClassName = (record: NotificationItemType) => {
    return record.read ? "cursor-pointer" : "bg-blue-light cursor-pointer";
  };

  return (
    <div
      className="mb-20 lg:mb-10 mt-2 bg-white overflow-clip shadow-sm"
      style={{
        borderRadius: "32px",
        display: "block",
        height: "100%",
        background: "#fff !important",
        padding: "24px 0",
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
            showHeader={false}
            rowClassName={rowClassName}
            columns={columns}
            dataSource={dataSource}
            scroll={{ x: true }}
            style={{ background: "#fff" }}
            rowKey={(row) => String(row.id)}
            className={`${loading ? "blur-xs" : ""}`}
            onRow={(record, index) => {
              return {
                onClick: () => {},
                // push(`/${lang}/clients/${record.client.id}/${record.id}`),
                onMouseEnter: () => {
                  hiddenText("hidden", record.id);
                },
                onMouseLeave: () => {
                  hiddenText("show", record.id);
                },
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
                  params["page"] = 1;
                  params["itemsPerPage"] = newPageSize;
                  updateQueryParams(params);
                } else {
                  setPage(pageNumber);
                  setPageSize(pageSize);
                  params["page"] = pageNumber;
                  params["itemsPerPage"] = pageSize;
                  updateQueryParams(params);
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

export default NotificationTable;
