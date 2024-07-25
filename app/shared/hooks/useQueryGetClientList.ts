import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { getCookie } from "../api";
import { ResponseClientList } from "../api/types/clientList";

export interface TransformResponse {
  value: number;
  label: string;
  imageUrl: string;
  aboutMe: string;
}

const headerBaseConfig = {
  headers: {
    Authorization: `Bearer ${getCookie("jwt")}`,
  },
};

export function useQueryGetClientList(fullName?: string) {
  return useQuery({
    queryKey: ["useQueryGetClientList"],
    queryFn: async () => {
      const response = await axios.get<AxiosResponse<ResponseClientList>>(
        "/api/user/client/search",
        {
          ...headerBaseConfig,
          params: { itemsPerPage: 1000, fullName },
        }
      );

      return response.data.data;
    },
    select: (data) => {
      const transformedData: TransformResponse[] = data.items.map((item) => {
        return {
          value: item.id,
          label: item.fullName,
          imageUrl: item.imageUrl,
          aboutMe: "",
        };
      });

      return transformedData;
    },
  });
}

interface InfScroll {
  itemsPerPage: number;
  fullName?: string;
}
export function useInfiniteQueryRequestClients({
  itemsPerPage,
  fullName,
}: InfScroll) {
  return useInfiniteQuery({
    queryKey: ["useInfiniteQueryRequestClients"],
    queryFn: async ({ pageParam }) => {
      const response = await axios.get<AxiosResponse<ResponseClientList>>(
        "/api/user/client/search",
        {
          ...headerBaseConfig,
          params: { itemsPerPage: 20, fullName, page: pageParam },
        }
      );

      return response.data.data;
    },
    select: (data) => {
      const transformedData: any = data.pages.map((y) =>
        y.items.map((item) => {
          return {
            value: item.id,
            label: item.fullName,
            imageUrl: item.imageUrl,
            aboutMe: "",
          };
        })
      );

      return transformedData.flat();
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.items.length === 0) return undefined;
      return lastPageParam + 1;
    },
  });
}
