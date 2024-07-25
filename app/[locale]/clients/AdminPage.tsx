import React, { useState, useEffect } from "react";
import ClientTable from "./table/Table";
import { Header, FilterTagsBar } from "./ui";
import { Sidebar } from "./sidebar";
import { useForm } from "react-hook-form";
import useFetchRecords from "./table/hooks/useTableData";
import { useGetCuratorsList } from "@hooks/useGetCuratorasList";
import { useGetCountriesList } from "@hooks/useGetCountriesList";
import { useGetTemplatesList } from "@hooks/useGetTemplatesList";
import { useModal } from "@/app/shared/modals/modal/ModalProvider";

export const AdminPage = () => {
  const { dataSource, loading, fetchRecords, totalItems } = useFetchRecords();
  const { closeModal } = useModal();

  const admissionCountriesList = useGetCountriesList({
    forAdmission: true,
  });
  const countriesList = useGetCountriesList({
    forAdmission: false,
  });
  const curatorList = useGetCuratorsList();

  const templateList = useGetTemplatesList();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [filterCount, setFilterCount] = useState(0);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [sortBy, setSortBy] = useState("profileCreated");
  const [sortType, setSortType] = useState("desc");

  const [fullName, setFullName] = useState("");
  const [activeFilters, setActiveFilters] = useState({});

  const [queryParams, setQueryParams] = useState<any>({
    page: page,
    pageSize: pageSize,
    sortBy: `${sortBy}:${sortType}`,
  });

  const filtersForm = useForm({
    defaultValues: {
      targetDetailsTypeOfService: null,
      countryOfDestination: null,
      targetDetailsPersonDegree: null,
      countryOfResidence: null,
      typeOfClient: null,
      targetDetailsYear: null,
      passedExam: null,
      numberOfUniversities: null,
      hasTopUniversities: null,
      curatorId: null,
      workflowTemplateId: null,
      certainStageNumber: null,
      certainStageStatus: null,
      allStagesCompleted: null,
    },
  });

  const setNameHandler = () => {
    setSidebarOpen(false);
    setFilterCount(0);
    setActiveFilters({});
    setPage(1);
    filtersForm.reset();

    const curr = { fullName: fullName, sortBy, page: 1, pageSize };

    curr["sortBy"] = `${sortBy}:${sortType}`;
    curr["page"] = 1;
    curr["pageSize"] = pageSize;

    fetchRecords(curr);
  };

  const onSubmit = async (data: any) => {
    try {
      setSidebarOpen(false);
      setFullName("");
      setActiveFilters(data);
      setPage(1);

      const selectedExams = [];

      if (data.TOEFL) selectedExams.push("TOEFL");
      if (data.IELTS) selectedExams.push("IELTS");
      if (data.SAT) selectedExams.push("SAT");
      if (data.GRE) selectedExams.push("GRE");
      if (data.GMAT) selectedExams.push("GMAT");
      if (data.Other) selectedExams.push("Other");

      const filterCount = Object.values(data).reduce((acc: number, value) => {
        if (Array.isArray(value)) {
          return acc + (value.length > 0 ? 1 : 0);
        }
        return acc + (value ? 1 : 0);
      }, 0);

      setFilterCount(filterCount as number);

      const params = {
        page: 1,
        pageSize: pageSize,
        typeOfClient: data.typeOfClient,
        passedExam: selectedExams,
        targetDetailsTypeOfService: data.targetDetailsTypeOfService,
        countryOfResidence: data.countryOfResidence,
        countryOfDestination: data.countryOfDestination,
        targetDetailsYear: data.targetDetailsYear,
        targetDetailsPersonDegree: data.targetDetailsPersonDegree,
        numberOfUniversities: data.numberOfUniversities,
        hasTopUniversities: data.hasTopUniversities,
        curatorId: data.curatorId,
        workflowTemplateId: data.workflowTemplateId,
        certainStageNumber: data.certainStageNumber,
        certainStageStatus: data.certainStageStatus,
        allStagesCompleted: data.allStagesCompleted,
        sortBy: `${sortBy}:${sortType}`,
      };

      setQueryParams(params);
      fetchRecords(params);
    } catch (err: any) {
      setFullName("");
      setActiveFilters({});
      setPage(1);
    }
  };

  useEffect(() => {
    const curr = !!fullName ? { fullName: fullName } : { ...queryParams };
    setPage(1);

    curr["sortBy"] = `${sortBy}:${sortType}`;
    curr["page"] = 1;
    curr["pageSize"] = pageSize;

    fetchRecords(curr);
  }, [sortBy, sortType]);

  useEffect(() => {
    curatorList.fetchRecords();
    countriesList.fetchRecords();
    admissionCountriesList.fetchRecords();
    templateList.fetchRecords();

    return () => closeModal();
  }, []);

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
          countriesList={countriesList}
          admissionCountriesList={admissionCountriesList}
          templateList={templateList}
        />
        <div className="px-6 pt-6">
          <Header
            refetchTable={() =>
              fetchRecords({
                page: 1,
                pageSize: pageSize,
                sortBy: `${sortBy}:${sortType}`,
              })
            }
            setSidebarOpen={setSidebarOpen}
            setSortBy={setSortBy}
            setSortType={setSortType}
            sortType={sortType}
            form={filtersForm}
            filterCount={filterCount}
            handleSearch={setNameHandler}
            name={fullName}
            setName={setFullName}
          />
          <FilterTagsBar
            onSubmit={onSubmit}
            activeFilters={activeFilters}
            form={filtersForm}
            curatorList={curatorList}
            countriesList={countriesList}
            admissionCountriesList={admissionCountriesList}
            templateList={templateList}
          />
          <ClientTable
            fullName={fullName}
            setPageSize={setPageSize}
            setPage={setPage}
            fetchRecords={fetchRecords}
            dataSource={dataSource}
            loading={loading}
            page={page}
            pageSize={pageSize}
            params={queryParams}
            totalItems={totalItems}
            sort={`${sortBy}:${sortType}`}
          />
        </div>
      </div>
    </>
  );
};
