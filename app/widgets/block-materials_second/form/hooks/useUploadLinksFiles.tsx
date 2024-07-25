import { useRef } from "react";
import { getCookie } from "@/app/shared/api/index";
import axios from "axios";
import { Role } from "@/app/shared/hooks/useGetFiles";

interface ILink {
  originalName: string;
  link: string;
}

interface IUploadLinks {
  links: ILink[];
}

export function useUploadLinksFiles(role: Role, stageId: number) {
  const loadingLinks = useRef(false);
  const uploadLinks = async ({ links }: IUploadLinks) => {
    try {
      loadingLinks.current = true;
      const response = await axios.post(`/api/storage/file/link`, links, {
        headers: {
          Authorization: `Bearer ${getCookie("jwt")}`,
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

      loadingLinks.current = false;
      return response.data;
    } catch (error: any) {
      loadingLinks.current = false;
      return error.code;
    }
  };

  return {
    uploadLinks,
    loadingLinks,
  };
}
