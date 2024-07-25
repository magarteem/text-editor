import LibraryIcon from "@/public/svg/library.svg";
import FilterIcon from "@/public/svg/filters-icon.svg";
import { useTranslation } from "react-i18next";
import { menu } from "../helpers/menuItems";
import { FieldRadioBtnFilter } from "./FieldRadioBtnFilter";
import { useQueryGetQaList } from "@/app/shared/hooks/useQueryGetQaList";
import { GetProfileResponse } from "@/app/shared";

interface HeaderProps {
  setSidebarOpen: any;
  form: any;
  profile: GetProfileResponse;
  filterCount?: number;
  changeTopFilter: (obj: {
    page: number;
    [key: string]: boolean | number | undefined;
  }) => void;
}

const params = {
  page: 1,
  itemsPerPage: 1,
};

export function Header({
  setSidebarOpen,
  form,
  profile,
  filterCount,
  changeTopFilter,
}: HeaderProps) {
  const { data: isNew } = useQueryGetQaList({
    ...params,
    isNew: true,
  });
  const { data: inProgressMe } = useQueryGetQaList({
    ...params,
    inProgressMe: true,
  });
  const { data: inProgressOthers } = useQueryGetQaList({
    ...params,
    inProgressOthers: true,
  });
  const { data: isArchive } = useQueryGetQaList({
    ...params,
    isArchive: true,
  });

  const { t } = useTranslation();

  const lib: { [key: string]: number | undefined } = {
    isNew: isNew?.totalItems,
    inProgressMe: inProgressMe?.totalItems,
    inProgressOthers: inProgressOthers?.totalItems,
    isArchive: isArchive?.totalItems,
  };

  const filterMenu =
    profile.roleType !== "Administrator"
      ? menu
      : menu.filter((x) => x.id !== "inProgressMe");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2 items-center">
        <LibraryIcon />
        <p className="text-sm leading-6 text-gray font-semibold">
          {t("qa.header.title")}
        </p>
      </div>

      <div className="flex flex-row items-center text-sm font-semibold">
        {filterMenu.map((x) => {
          return (
            <FieldRadioBtnFilter
              key={x.id}
              form={form}
              x={x}
              counts={lib[x.id] ? lib[x.id] : undefined}
              changeTopFilter={changeTopFilter}
            />
          );
        })}
      </div>
      <div className="flex flex-row gap-6 items-center text-sm font-semibold text-blue-highlight">
        <button
          className="flex flex-row gap-2 items-center"
          onClick={() => setSidebarOpen((prev: boolean) => !prev)}
        >
          <FilterIcon />
          <h1 className="leading-6 py-2">{t("clients.filter")}</h1>
          {!!filterCount && (
            <div className="bg-blue-bright-highlight px-2 py-1 text-blue-marian rounded-lg text-xs">
              {filterCount}
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
