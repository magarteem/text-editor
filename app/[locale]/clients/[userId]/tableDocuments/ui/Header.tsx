import React, { useState } from "react";
import { Input } from "@ui/index";
import ClientsIcon from "@/public/svg/user.svg";
import FilterIcon from "@/public/svg/filters-icon.svg";
import FilterIconDown from "@/public/svg/sort-desc.svg";
import SortIcon from "@/public/svg/sort-icon.svg";
import SearchIcon from "@/public/svg/search-icon.svg";
import ArrowIconDown from "@/public/svg/chevron-down-big.svg";
import CrossIcon from "@/public/svg/blue-cross.svg";
import { useTranslation } from "react-i18next";
import { Dropdown } from "antd";
import { useModal } from "@/app/shared/modals/modal/ModalProvider";

interface HeaderProps {
  setSidebarOpen: any;
  setSortBy: any;
  setSortType: any;
  sortType: any;
  form: any;
  handleSearch?: any;
  name?: string;
  setName?: any;
  filterCount?: number;
  nameInput?: string;
}

export function Header({
  setSidebarOpen,
  setSortType,
  sortType,
  setSortBy,
  filterCount,
  handleSearch,
  name,
  setName,
}: HeaderProps) {
  const { t } = useTranslation();
  const [isFocused, setIsFocused] = useState(false);
  const { openModal } = useModal();

  const items: any["items"] = [
    {
      key: "profileCreated",
      label: (
        <p className="text-xs text-gray font-semibold">
          {t("clients.filters.sort.dateCreate")}
        </p>
      ),
    },
    {
      key: "targetDetailsStartDate",
      label: (
        <p className="text-xs text-gray font-semibold">
          {t("clients.filters.sort.dateStart")}
        </p>
      ),
    },
    {
      key: "targetDetailsEndDate",
      label: (
        <p className="text-xs text-gray font-semibold">
          {t("clients.filters.sort.dateAnd")}
        </p>
      ),
    },
    {
      key: "cwsCompleted",
      label: (
        <p className="text-xs text-gray font-semibold">
          {t("clients.filters.sort.countFinish")}
        </p>
      ),
    },
    {
      key: "chanceOfScholarship",
      label: (
        <p className="text-xs text-gray font-semibold">
          {t("clients.filters.sort.chance")}
        </p>
      ),
    },
    {
      key: "targetDetailsYear",
      label: (
        <p className="text-xs text-gray font-semibold">
          {t("clients.filters.sort.year")}
        </p>
      ),
    },
    {
      key: "personDegree",
      label: (
        <p className="text-xs text-gray font-semibold">
          {t("clients.filters.sort.grade")}
        </p>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4 items-center">
        <div className="flex flex-row gap-2 items-center">
          <ClientsIcon />
          <p className="text-sm text-gray font-semibold">
            {t("menuItems.clients")}
          </p>
        </div>
        <div className="flex">
          <Input
            id="fullNameSearch"
            isSearch={true}
            suffix={<SearchIcon />}
            className={isFocused ? "custom-input focused" : "custom-input"}
            placeholder={t("clients.filters.search")}
            value={name}
            onChange={(e: any) => setName(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onPressEnter={() => {
              handleSearch();
            }}
          />
        </div>
      </div>
      <div className="flex flex-row gap-6 items-center text-sm font-semibold text-blue-highlight">
        <div className="flex flex-row items-center gap-2">
          <button
            onClick={() =>
              setSortType((prev: any) => {
                if (prev === "asc") {
                  return "desc";
                } else {
                  return "asc";
                }
              })
            }
          >
            {sortType === "desc" ? <SortIcon /> : <FilterIconDown />}
          </button>
          <Dropdown
            menu={{
              items,
              selectable: true,
              onClick: (key) => setSortBy(key.key),
              defaultSelectedKeys: ["profileCreated"],
            }}
          >
            <button className="flex flex-row gap-2 items-center">
              <h1>{t("clients.sort")}</h1>
              <ArrowIconDown />
            </button>
          </Dropdown>
        </div>
        <button
          className="flex flex-row gap-2 items-center"
          onClick={() => setSidebarOpen((prev: boolean) => !prev)}
        >
          <FilterIcon />
          <h1>{t("clients.filter")}</h1>
          {!!filterCount && (
            <div className="bg-blue-bright-highlight px-2 py-1 text-blue-marian rounded-lg text-xs">
              {filterCount}
            </div>
          )}
        </button>
        <button
          className="ml-auto flex flex-row gap-2 items-center"
          onClick={() => openModal("createUserModal")}
        >
          <CrossIcon />
          <h3>{t("clients.create")}</h3>
        </button>
      </div>
    </div>
  );
}
