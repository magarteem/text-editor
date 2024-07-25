import { getCookie } from "@api/index";
import axios from "axios";

export const downloadFileOnClick = async ({
  fileId,
  mimeType,
  fileName,
}: {
  fileId: number;
  mimeType: string;
  fileName: string;
}) => {
  try {
    const response = await axios.get("/api/storage/file", {
      headers: {
        Authorization: `Bearer ${getCookie("jwt")}`,
      },
      params: {
        fileId: fileId,
      },
      responseType: "blob",
    });

    const blob = new Blob([response.data], { type: mimeType });
    const blobURL = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobURL;
    link.download = fileName;
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  } catch (error) {
    console.error("Error downloading file", error);
  }
};
