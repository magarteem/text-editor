import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getCookie } from "../api";
import {
  RequestDocumentFileType,
  ResponseDocFileData,
} from "@/app/widgets/block-client-document/types/type";
import queryString from "query-string";
import { ColumnsTypeResponseChildren } from "@/app/[locale]/clients/[userId]/tableDocuments/type/columnsType";
import { TypeSelectorType } from "@/app/widgets/block-client-document/types/statusDocument";

export interface EditDirectoryType {
  id: number;
  name?: string;
  parentId?: number | null;
  visible?: boolean;
}

export interface CreateNewDirectoryType {
  ownerId: string;
  name: string;
  parentId: number;
  visible: boolean;
}

export interface CreateNewDocFileType {
  files: Blob;
  associatedWithTOPUniversity?: boolean;
  parentId?: number;
  visible?: boolean;
  description?: string;
  status?: string;
  checkingCuratorId?: number;
  typeOfDocument?: TypeSelectorType;
  ownerId?: number;
}

export interface CreateNewDocFileTypeAsLink {
  associatedWithTOPUniversity?: boolean;
  parentId: number;
  visible?: boolean;
  description?: string;
  status?: string;
  checkingCuratorId?: number;
  typeOfDocument: TypeSelectorType | string;
  ownerId: number;
  originalName: string;
  link: string;
}

const headerBaseConfig = {
  headers: {
    Authorization: `Bearer ${getCookie("jwt")}`,
  },
};

export function useQueryGetAllStorageFiles(ownerId: string) {
  return useQuery({
    queryKey: ["useQueryGetAllStorageFiles"],
    queryFn: async () => {
      const response = await axios.get<ColumnsTypeResponseChildren[]>(
        `/api/storage/list`,
        {
          ...headerBaseConfig,
          params: {
            ownerId,
          },
        }
      );

      return response.data[0].children;
    },
  });
}

export function useQueryGetStorageFileId(filesId: string) {
  return useQuery({
    queryKey: ["useQueryGetStorageFileId"],
    queryFn: async () => {
      const response = await axios.get<ResponseDocFileData>(
        `/api/storage/file/${filesId}`,
        headerBaseConfig
      );

      return response.data;
    },
  });
}

export const useQueryStorageMethods = () => {
  const queryClient = useQueryClient();

  const updateFileData = useMutation({
    mutationFn: (data: RequestDocumentFileType) => {
      let stringParams = queryString.stringify(data, {});
      return axios.patch("/api/storage/file", data, headerBaseConfig);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["useQueryGetStorageFileId"] });
      queryClient.invalidateQueries({
        queryKey: ["useQueryGetAllStorageFiles"],
      });
    },
  });

  const createDirectory = useMutation({
    mutationFn: (params: CreateNewDirectoryType) => {
      return axios.post("/api/storage/directory", params, headerBaseConfig);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["useQueryGetAllStorageFiles"],
      });
    },
  });

  const createNewDocFileAsLink = useMutation({
    mutationFn: (params: CreateNewDocFileTypeAsLink) => {
      let stringParams = queryString.stringify(params, {});
      return axios.post("/api/storage/file/link", [params], headerBaseConfig);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["useQueryGetAllStorageFiles"],
      });
    },
  });

  const renameDirectory = useMutation({
    mutationFn: (params: EditDirectoryType) => {
      return axios.patch("/api/storage/directory", params, headerBaseConfig);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["useQueryGetAllStorageFiles"],
      });
    },
  });

  const deleteDirectory = useMutation({
    mutationFn: (directoryId: number) => {
      return axios.delete("/api/storage/directory", {
        ...headerBaseConfig,
        params: {
          directoryId,
        },
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["useQueryGetAllStorageFiles"],
      });
    },
  });

  const deleteFile = useMutation({
    mutationFn: (fileId: number) => {
      return axios.delete("/api/storage/file", {
        ...headerBaseConfig,
        params: {
          fileId,
        },
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["useQueryGetAllStorageFiles"],
      });
    },
  });

  return {
    updateFileData,
    createDirectory,
    createNewDocFileAsLink,
    renameDirectory,
    deleteDirectory,
    deleteFile,
  };
};
