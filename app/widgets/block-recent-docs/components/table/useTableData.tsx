import { useState } from "react";
import axios from "axios";
import { getCookie } from "@api/baseFetch";

type TFetchProps = {
  [key: string]: number;
};

export function useTableData() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecords = async ({ ownerId }: TFetchProps) => {
    setLoading(true);
    try {
      const response = await axios.get("/api/storage/latest", {
        params: { ownerId },
        headers: {
          Authorization: `Bearer ${getCookie("jwt")}`,
        },
      });

      const transformedData = response.data.map((item: any) => {
        const date = new Date(item.created);

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        const formattedDate = `${day}.${month}.${year}, ${hours}:${minutes}`;

        return {
          icon: item.link,
          id: item.id,
          FileName: item.originalName,
          created: formattedDate,
          author: item.author,
          download: {
            link: item.link,
            id: item.id,
            type: item.mimeType,
            name: item.originalName,
          },
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
