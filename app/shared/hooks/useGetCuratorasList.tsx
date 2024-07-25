import { useState } from "react";
import axios from "axios";
import { getCookie } from "@api/baseFetch";

export function useGetCuratorsList() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/user/employee/list", {
        params: {
          itemsPerPage: 100,
        },
        headers: {
          Authorization: `Bearer ${getCookie("jwt")}`,
        },
      });

      const transformedData = response.data.data.items.map((item: any) => {
        return {
          value: item.id,
          label: `${item.firstName} ${item.lastName}`,
          imageUrl: item.imageUrl,
          aboutMe: item.aboutMe,
        };
      });

      setDataSource(transformedData);
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
  };
}
