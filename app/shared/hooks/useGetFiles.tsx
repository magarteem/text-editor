import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "@api/baseFetch";

export type Author = {
  id: number;
  firstName: string;
  lastName: string;
  imageUrl: string;
  role: string;
};

export type File = {
  id: number;
  author: Author;
  created: number;
  mimeType: string;
  deleted: boolean;
  visible: boolean;
  originalName: string;
  size: number;
  link: string;
  status: string;
  reviewPriority: string;
  associatedWithTOPUniversity: boolean;
  approvedByStrategist: boolean;
  description: string;
  checkingStrategist: Author;
  checkingCurator: Author;
  startDate: number;
  typeOfDocument: string;
  directUrl: string;
};

export type Role = "client" | "employee";

export function useGetFiles(stageId: number, role: Role) {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const url =
        role === "client"
          ? "/api/workflow/file-for-client"
          : "/api/workflow/file-for-employee";

      const response = await axios.get(url, {
        params: { stageId },
        headers: {
          Authorization: `Bearer ${getCookie("jwt")}`,
        },
      });

      setFiles(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [stageId, role]);

  return {
    files,
    loading,
    refetch: fetchFiles,
  };
}
