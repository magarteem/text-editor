import React from "react";
import FilterIconSideBar from "@/public/svg/filter-side-bar.svg";
import { useTranslation } from "react-i18next";
import { SidebarForm } from "./SidebarForm";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: any;
  form: any;
  onSubmit: any;
  totalItems: number;
  loading: boolean;
  curatorList: any;
  clientList: any;
  strategistList: any;
}

export function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  form,
  onSubmit,
  totalItems,
  loading,
  curatorList,
  clientList,
  strategistList,
}: SidebarProps) {
  const { t } = useTranslation();

  return (
    <div
      className={`absolute left-0 top-0 w-full h-full overflow-auto z-40 ${
        sidebarOpen ? "flex" : "hidden"
      }`}
    >
      <div
        className="w-full h-full relative bg-gray opacity-50"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      ></div>
      <div
        className={`absolute right-0 top-0 shadow-md bg-gray-200 w-[272px] p-6 h-full transition-all duration-300 bg-white z-50 ${
          sidebarOpen ? "flex" : "hidden"
        }`}
      >
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row gap-2 items-center text-sm text-gray font-semibold">
              <FilterIconSideBar />
              <p>{t("qa.filters.title")}</p>
              {!!totalItems && (
                <div className="bg-blue-bright-highlight px-2 py-1 text-blue-marian rounded-lg text-xs">
                  {loading ? (
                    <Spin
                      size="small"
                      indicator={
                        <LoadingOutlined style={{ fontSize: 12 }} spin />
                      }
                    />
                  ) : (
                    totalItems
                  )}
                </div>
              )}
            </div>
            <button onClick={() => setSidebarOpen(!sidebarOpen)}>
              <p className="text-sm font-semibold text-blue-highlight">
                {t("qa.filters.close")}
              </p>
            </button>
          </div>
          <SidebarForm
            form={form}
            loading={loading}
            onSubmit={onSubmit}
            curatorList={curatorList}
            strategistList={strategistList}
            clientList={clientList}
          />
        </div>
      </div>
    </div>
  );
}
