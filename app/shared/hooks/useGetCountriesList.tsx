import { useState } from "react";
import axios from "axios";
import { getCookie } from "@api/baseFetch";

export function useGetCountriesList({
  forAdmission,
}: {
  forAdmission: boolean;
}) {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/country", {
        params: { forAdmission: forAdmission },
        headers: {
          Authorization: `Bearer ${getCookie("jwt")}`,
        },
      });

      const transformedData = response.data.data.map(
        (country: { id: number; country: string }) => ({
          label: country.country,
          value: country.id,
        })
      );

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
