import { useState } from "react";
import axios from "axios";
import { getCookie } from "@api/baseFetch";
import { IResponseItem } from "../types/queryTypes";

type TFetchProps = {
  [key: string]: any;
  targetDetailsTypeOfService?: any;
  countryOfResidence?: number;
  countryOfDestination?: number;
  targetDetailsPersonDegree?: string;
  targetDetailsYear?: number;
  typeOfClient?: string;
  passedExam?: string[];
  hasTopUniversities?: boolean;
  numberOfUniversities?: number;
  curatorId?: number;
  sortBy?: string;
  fullName?: string;
  workflowTemplateId?: string;
  certainStageNumber?: number;
  certainStageStatus?: string;
  allStagesCompleted?: boolean;
};
const useFetchRecords = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  const fetchRecords = async ({
    page,
    pageSize,
    targetDetailsTypeOfService,
    countryOfResidence,
    countryOfDestination,
    targetDetailsPersonDegree,
    targetDetailsYear,
    typeOfClient,
    passedExam,
    hasTopUniversities,
    numberOfUniversities,
    curatorId,
    sortBy,
    fullName,
    workflowTemplateId,
    certainStageNumber,
    certainStageStatus,
    allStagesCompleted,
  }: TFetchProps) => {
    setLoading(true);
    try {
      const response = await axios.get("/api/user/client/search", {
        params: {
          page,
          itemsPerPage: pageSize,
          targetDetailsTypeOfService,
          countryOfResidence,
          countryOfDestination,
          targetDetailsPersonDegree,
          targetDetailsYear,
          typeOfClient,
          passedExam,
          hasTopUniversities,
          numberOfUniversities,
          curatorId,
          sortBy,
          fullName,
          workflowTemplateId,
          certainStageNumber,
          certainStageStatus,
          allStagesCompleted,
        },
        headers: {
          Authorization: `Bearer ${getCookie("jwt")}`,
        },
        paramsSerializer: {
          indexes: null,
        },
      });

      const { items, totalPages: total, totalItems } = response.data.data;

      const transformedData = items.map((item: IResponseItem) => {
        return {
          ...item,
          client: {
            fullName: item.fullName,
            imageUrl: item.imageUrl,
            id: item.id,
          },
          curator: {
            firstName: item.curator ? item.curator.firstName : null,
            lastName: item.curator ? item.curator.lastName : null,
            imageUrl: item.curator ? item.curator.imageUrl : null,
          },
          progress: {
            completed: item.cwsCompleted,
            total: item.cwsTotal,
          },
          chances: item.chanceOfScholarship,
          program: item.targetDetailsProgram,
          universities: {
            simple: item.numberOfUniversities,
            top: item.numberOfTopUniversities,
          },
          periodOfСooperation: {
            start: item.targetDetailsStartDate,
            end: item.targetDetailsEndDate,
          },
          terms: {
            redStage: item.redStage,
            orangeStage: item.orangeStage,
          },
          delete: { id: item.id, fullName: item.fullName },
        };
      });

      setDataSource(transformedData);
      setTotalItems(totalItems);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    dataSource,
    loading,
    fetchRecords,
    totalItems,
  };
};

export default useFetchRecords;
