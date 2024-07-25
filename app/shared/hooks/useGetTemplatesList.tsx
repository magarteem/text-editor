import { useState } from "react";
import axios from "axios";
import { getCookie } from "@api/baseFetch";

export function useGetTemplatesList() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/workflow/template", {
        headers: {
          Authorization: `Bearer ${getCookie("jwt")}`,
        },
      });

      const transformedData = response.data.map((item: any) => {
        return {
          value: item.id,
          label: item.name,
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
