import { useState, useCallback } from "react";
import axios from "axios";
import { getCookie } from "@/app/shared/api/index";
import { Role } from "@/app/shared/hooks/useGetFiles";

interface IUploadFiles {
  files: File[];
}

export function useUploadFiles(role: Role, stageId: number) {
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFiles = useCallback(
    async ({ files }: IUploadFiles) => {
      setLoadingFiles(true);
      setError(null);

      try {
        const formData = new FormData();

        files.forEach((file, index) => {
          formData.append(`files`, (file as any).file);
        });

        const response = await axios.post(`/api/storage/file`, formData, {
          headers: {
            Authorization: `Bearer ${getCookie("jwt")}`,
            "Content-Type": "multipart/form-data",
          },
        });

        const fileIds = response.data.map((link: any) => link.id);

        const fileIdParams = fileIds
          .map((id: number) => `fileId=${id}`)
          .join("&");

        const baseUrl =
          role === "client"
            ? "/api/workflow/file-for-client"
            : "/api/workflow/file-for-employee";

        const url = `${baseUrl}?stageId=${stageId}&${fileIdParams}`;

        const config = {
          headers: {
            Authorization: `Bearer ${getCookie("jwt")}`,
            "Content-Type": "application/json",
          },
        };

        await axios
          .post(url, {}, config)
          .then((response) => {
            console.log("Response:", response.data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        setLoadingFiles(false);
      } catch (error: any) {
        console.error("Error in uploadFiles:", error);
        setLoadingFiles(false);
        setError(error.message || "An error occurred while uploading files");
        throw error;
      }
    },
    [role, stageId]
  );

  return {
    uploadFiles,
    loadingFiles,
    error,
  };
}
