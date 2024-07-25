import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Header } from "./ui";
import ClientTable from "./table/Table";
import { Sidebar } from "./sidebar";
import { FilterTagsBar } from "./ui/FilterTagsBar";
import { useQueryGetCuratorList } from "@/app/shared/hooks/useQueryGetCuratorList";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryGetQaList } from "@/app/shared/hooks/useQueryGetQaList";
import { RequestQaListType } from "@/app/shared/api/types/requestQaListTypes";
import { useQueryGetClientList } from "@/app/shared/hooks/useQueryGetClientList";
import { GetProfileResponse } from "@/app/shared";

const filterZod = z.object({
  curatorId: z.number().nullable().optional(),
  strategistId: z.number().nullable().optional(),
  typeOfClient: z.any().nullable().optional(),
  typeOfDocument: z.any().nullable().optional(),
});
type ValidationSchema = z.infer<typeof filterZod>;

interface Props {
  profile: GetProfileResponse;
}

export const QaPage = ({ profile }: Props) => {
  const curatorList = useQueryGetCuratorList({ role: "Curator" });
  const strategistList = useQueryGetCuratorList({ role: "Strategist" });
  const clientList = useQueryGetClientList();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [filterCount, setFilterCount] = useState(0);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [fullName, setFullName] = useState("");
  const [activeFilters, setActiveFilters] = useState({});

  const [queryParams, setQueryParams] = useState<RequestQaListType>({
    page: page,
    itemsPerPage: pageSize,
  });

  const { data: dataSource, isLoading: loading } =
    useQueryGetQaList(queryParams);

  const updateQueryParams = (params: RequestQaListType) => {
    setQueryParams(params);
  };

  const filtersForm = useForm<ValidationSchema>({
    defaultValues: {
      curatorId: null,
      strategistId: null,
      typeOfClient: null,
      typeOfDocument: null,
    },
    resolver: zodResolver(filterZod),
    mode: "all",
  });

  const changeTopFilter = (obj: {
    page: number;
    [key: string]: boolean | number | undefined;
  }) => {
    queryParams["inProgressOthers"] &&
      delete queryParams["checkingStrategistId"];
    setQueryParams({ ...queryParams, ...obj });
  };

  const onSubmit = async (data: ValidationSchema) => {
    try {
      setSidebarOpen(false);
      setFullName("");
      setActiveFilters(data);
      setPage(1);

      const filterCount = Object.values(data).reduce((acc: number, value) => {
        if (Array.isArray(value)) {
          return acc + (value.length > 0 ? 1 : 0);
        }
        return acc + (value ? 1 : 0);
      }, 0);

      setFilterCount(filterCount as number);

      const params: RequestQaListType = {
        page: 1,
        itemsPerPage: pageSize,
        checkingCuratorId: data.curatorId,
        checkingStrategistId: data.strategistId,
        typeOfDocument: data.typeOfDocument,
        clientId: data.typeOfClient,
      };

      setQueryParams({
        ...queryParams,
        ...params,
      });
    } catch (err: any) {
      setFullName("");
      setActiveFilters({});
      setPage(1);
    }
  };

  return (
    <>
      <div className="overflow-x-scroll h-full relative">
        <Sidebar
          onSubmit={onSubmit}
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
          form={filtersForm}
          totalItems={filterCount}
          loading={loading}
          curatorList={curatorList}
          clientList={clientList}
          strategistList={strategistList}
        />
        <div className="px-6 pt-4">
          <Header
            profile={profile}
            setSidebarOpen={setSidebarOpen}
            form={filtersForm}
            filterCount={filterCount}
            changeTopFilter={changeTopFilter}
          />
          <FilterTagsBar
            onSubmit={onSubmit}
            activeFilters={activeFilters}
            form={filtersForm}
            curatorList={curatorList}
            strategistList={strategistList}
            clientList={clientList}
          />
          <ClientTable
            fullName={fullName}
            setPageSize={setPageSize}
            setPage={setPage}
            updateQueryParams={updateQueryParams}
            dataSource={dataSource?.items ?? []}
            loading={loading}
            page={page}
            pageSize={pageSize}
            params={queryParams}
            totalItems={dataSource?.totalItems}
          />
        </div>
      </div>
    </>
  );
};
