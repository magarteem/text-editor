import { useState, useCallback } from "react";
import axios from "axios";
import { getCookie } from "@api/baseFetch";
import { File as FileInfo, Role } from "./useGetFiles";

export type FileToUpload = File | { originalName: string; link: string };

export function useUploadAndAssignFiles(role: Role) {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const uploadAndAssignFiles = useCallback(
    async (filesToUpload: FileToUpload[], stageId: number) => {
      setLoading(true);
      setError(null);

      try {
        const uploadedFiles: FileInfo[] = [];

        const regularFiles = filesToUpload.filter(
          (file): file is File => file instanceof File
        );
        const linkFiles = filesToUpload.filter(
          (file): file is { originalName: string; link: string } =>
            "link" in file
        );

        if (regularFiles.length > 0) {
          const base64Files = await Promise.all(
            regularFiles.map(async (file) => {
              const reader = new FileReader();
              return new Promise<string>((resolve) => {
                reader.onload = (e) => resolve(e.target?.result as string);
                reader.readAsDataURL(file);
              });
            })
          );

          const regularUploadResponse = await axios.post(
            "/api/storage/file",
            base64Files,
            {
              headers: {
                Authorization: `Bearer ${getCookie("jwt")}`,
              },
            }
          );

          uploadedFiles.push(...regularUploadResponse.data);
        }

        if (linkFiles.length > 0) {
          const linkUploadResponse = await axios.post(
            "/api/storage/file/link",
            linkFiles,
            {
              headers: {
                Authorization: `Bearer ${getCookie("jwt")}`,
              },
            }
          );

          uploadedFiles.push(...linkUploadResponse.data);
        }

        setFiles(uploadedFiles);

        if (uploadedFiles.length > 0) {
          const fileIds = uploadedFiles.map((file) => file.id);
          const assignUrl =
            role === "client"
              ? "/api/workflow/file-for-client"
              : "/api/workflow/file-for-emploee/client";

          await axios.post(
            assignUrl,
            { stageId, fileId: fileIds },
            {
              headers: {
                Authorization: `Bearer ${getCookie("jwt")}`,
              },
            }
          );
        }

        return uploadedFiles;
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [role]
  );

  return {
    uploadAndAssignFiles,
    files,
    loading,
    error,
  };
}
