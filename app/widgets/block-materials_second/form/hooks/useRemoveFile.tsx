import { useRef } from "react";
import { getCookie } from "@/app/shared/api/index";
import axios from "axios";
import { Role } from "@/app/shared/hooks/useGetFiles";
import { headers } from "next/headers";

interface ILink {
  originalName: string;
  link: string;
}

interface IUploadLinks {
  links: ILink[];
}

export function useRemoveFile(role: Role, stageId: number) {
  const loadingRemove = useRef(false);
  const removeFile = async (fileId: number) => {
    try {
      const fileIdParams = `fileId=${fileId}`;

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

      await axios.delete(url, config).catch((error) => {
        console.error("Error:", error);
      });

      loadingRemove.current = false;
    } catch (error: any) {
      loadingRemove.current = false;
      return error.code;
    }
  };

  return {
    removeFile,
    loadingRemove,
  };
}
