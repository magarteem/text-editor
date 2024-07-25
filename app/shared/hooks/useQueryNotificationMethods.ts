import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { getCookie } from "@/app/shared/api/baseFetch";
import {
  NotificationItemType,
  RequestNotificationListTypes,
  ResponseNotificationListTypes,
  TypeNotification,
  User,
} from "../api";
import queryString from "query-string";

interface ColumnOne {
  read: number | null;
  author: User;
  message: string;
}

interface СolumnTwo {
  read: number | null;
  id: number;
  important: boolean;
  created: string;
  typeNotification: TypeNotification;
}

export interface ReturnTransformedData
  extends Omit<ResponseNotificationListTypes, "items"> {
  items: Array<{
    columnOne: ColumnOne;
    columnTwo: СolumnTwo;
  }>;
}

const headerBaseConfig = {
  headers: {
    Authorization: `Bearer ${getCookie("jwt")}`,
  },
};

export function useQueryGetNotificationList(
  params: RequestNotificationListTypes
) {
  return useQuery({
    queryKey: [`useQueryGetNotificationList` + JSON.stringify(params)],
    queryFn: async () => {
      let stringParams = queryString.stringify(params, {
        skipNull: true,
      });
      const response = await axios.get<
        AxiosResponse<ResponseNotificationListTypes>
      >("/api/notification/search?" + stringParams, {
        ...headerBaseConfig,
      });

      return response.data;
    },
    select: (data: AxiosResponse<ResponseNotificationListTypes>) => {
      const transformedData = {
        ...data.data,
        items: data.data.items.map((item: NotificationItemType) => {
          return {
            ...item,
            columnOne: {
              read: item.read,
              author: item.author,
              message: item.message,
            },
            columnTwo: {
              read: item.read,
              id: item.id,
              important: item.important,
              created: item.created,
              typeNotification: item.typeNotification,
            },
          };
        }),
      };

      return transformedData;
    },
  });
}

export const useQueryNotificationMethods = (
  params: RequestNotificationListTypes
) => {
  const queryClient = useQueryClient();

  const readNotification = useMutation({
    mutationFn: (id: number) => {
      const stringParams = queryString.stringify({ id });
      return axios.post(
        "/api/notification/mark-as-read?" + stringParams,
        null,
        headerBaseConfig
      );
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [`useQueryGetNotificationList` + JSON.stringify(params)],
      });
      queryClient.invalidateQueries({
        queryKey: [
          `useQueryGetNotificationList` +
            JSON.stringify({
              page: 1,
              itemsPerPage: 10,
            }),
        ],
      });
    },
  });

  const unreadNotification = useMutation({
    mutationFn: (id: number) => {
      const stringParams = queryString.stringify({ id });
      return axios.post(
        "/api/notification/mark-as-unread?" + stringParams,
        null,
        headerBaseConfig
      );
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [`useQueryGetNotificationList` + JSON.stringify(params)],
      });
      queryClient.invalidateQueries({
        queryKey: [
          `useQueryGetNotificationList` +
            JSON.stringify({
              page: 1,
              itemsPerPage: 10,
            }),
        ],
      });
    },
  });

  return {
    readNotification,
    unreadNotification,
  };
};
