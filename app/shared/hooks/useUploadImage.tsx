import { useState } from "react";
import axios from "axios";
import { getCookie } from "@api/baseFetch";

interface UploadImageProps {
  file: File;
}

export function useUploadImage() {
  const [loading, setLoading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const uploadImage = async ({ file }: UploadImageProps) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("files", file);

      const response = await axios.post(
        "/api/storage/file?publicAccess=true",
        formData,
        {
          headers: {
            Authorization: `Bearer ${getCookie("jwt")}`,
            "Content-Type": "multipart/form-data",
            accept: "application/json",
          },
        }
      );

      if (response.data && response.data.length > 0) {
        setUploadedUrl("https://" + response.data[0].directUrl);
        return response.data[0];
      } else {
        throw new Error("No file URL received from server");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    uploadedUrl,
    uploadImage,
  };
}
