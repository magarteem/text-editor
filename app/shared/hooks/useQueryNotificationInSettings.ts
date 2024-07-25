import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getCookie } from "@/app/shared/api/baseFetch";
import { ResponseNotificationInSettings } from "../api/types/responseNotificationInSettings";

const headerBaseConfig = {
  headers: {
    Authorization: `Bearer ${getCookie("jwt")}`,
  },
};

export function useQueryNotificationInSettings() {
  return useQuery({
    queryKey: [`useQueryNotificationInSettings`],
    queryFn: async () => {
      const response = await axios.get<ResponseNotificationInSettings[]>(
        "/api/setting/notification",
        {
          ...headerBaseConfig,
        }
      );
      return response.data;
    },
  });
}

export const useQueryNotificationSettingsMethods = () => {
  const queryClient = useQueryClient();

  const updateNotification = useMutation({
    mutationFn: (params: ResponseNotificationInSettings[]) => {
      return axios.patch("/api/setting/notification", params, headerBaseConfig);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [`useQueryNotificationInSettings`],
      });
    },
  });

  return {
    updateNotification,
  };
};
