import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { getCookie } from "@/app/shared/api/baseFetch";
import { RequestQaListType } from "../api/types/requestQaListTypes";
import { QaListTypes, ResponseQaListTypes } from "../api";
import queryString from "query-string";

const headerBaseConfig = {
  headers: {
    Authorization: `Bearer ${getCookie("jwt")}`,
  },
};

export function useQueryGetQaList(params: RequestQaListType) {
  return useQuery({
    queryKey: [`useQueryGetQaList` + JSON.stringify(params)],
    queryFn: async () => {
      let stringParams = queryString.stringify(params, {
        skipNull: true,
      });
      const response = await axios.get<AxiosResponse<ResponseQaListTypes>>(
        "/api/storage/quality-control/search?" + stringParams,
        {
          ...headerBaseConfig,
        }
      );

      return response.data;
    },
    select: (data: AxiosResponse<ResponseQaListTypes>) => {
      const transformedData = {
        ...data.data,
        items: data.data.items.map((item: QaListTypes) => {
          return {
            ...item,
            client: {
              fullName: item.client.firstName + " " + item.client.lastName,
              imageUrl: item.client.imageUrl ?? "",
              id: item.client.id,
            },
            curator: {
              firstName: item.checkingCurator
                ? item.checkingCurator.firstName
                : null,
              lastName: item.checkingCurator
                ? item.checkingCurator.lastName
                : null,
              imageUrl: item.checkingCurator
                ? item.checkingCurator.imageUrl
                : null,
            },
            strategist: {
              firstName: item.checkingStrategist
                ? item.checkingStrategist.firstName
                : null,
              lastName: item.checkingStrategist
                ? item.checkingStrategist.lastName
                : null,
              imageUrl: item.checkingStrategist
                ? item.checkingStrategist.imageUrl
                : null,
            },
            candidateClassification: item.client.candidateClassification,
            targetDetailsTypeOfService: item.client.typeOfService,
            priority: item.reviewPriority,
          };
        }),
      };

      return transformedData;
    },
  });
}
