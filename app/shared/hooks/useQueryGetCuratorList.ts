import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { RoleType, getCookie } from "../api";
import { ResponseCuratorList } from "../api/types/curatorList";

const headerBaseConfig = {
  headers: {
    Authorization: `Bearer ${getCookie("jwt")}`,
  },
};

interface Props {
  role?: RoleType;
}

export function useQueryGetCuratorList({ role }: Props) {
  return useQuery({
    queryKey: ["useQueryGetCuratorList" + role],
    queryFn: async () => {
      const response = await axios.get<AxiosResponse<ResponseCuratorList>>(
        "/api/user/employee/list",
        {
          ...headerBaseConfig,
          params: { itemsPerPage: 100, role },
        }
      );

      return response.data;
    },
    select: (data) => {
      const transformedData = data.data.items.map((item) => {
        return {
          value: item.id,
          label: `${item.firstName} ${item.lastName}`,
          imageUrl: item.imageUrl,
          aboutMe: item.aboutMe,
        };
      });

      return transformedData;
    },
  });
}
