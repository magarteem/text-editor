import { useState } from "react";
import axios from "axios";
import { GetProfileResponse, getCookie } from "../api";

export function useGetUserById({ userId }: { userId: number }) {
  const [data, setData] = useState<GetProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRecords = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/user/profile", {
        params: { userId: userId },
        headers: {
          Authorization: `Bearer ${getCookie("jwt")}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    fetchRecords,
  };
}
