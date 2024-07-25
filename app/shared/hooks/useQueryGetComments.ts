import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  ReSponseCommentsType,
  RequestSentNewComment,
  RequestUpdateNewComment,
} from "@/app/widgets/block-client-comment/types/types";
import axios from "axios";
import { getCookie } from "../api";

interface RequestCommentsType {
  queryKey: string;
  apiUrlComments: string;
  page?: number;
  itemsPerPage: number;
  fileId: string;
  isWorkflow?: boolean;
}

export function useInfiniteQueryRequest({
  queryKey,
  apiUrlComments,
  fileId,
  itemsPerPage,
  isWorkflow = false,
}: RequestCommentsType) {
  return useInfiniteQuery({
    queryKey: ["useQueryGetComments" + queryKey],
    queryFn: async ({ pageParam }) => {
      const response = await axios.get<ReSponseCommentsType>(apiUrlComments, {
        headers: {
          Authorization: `Bearer ${getCookie("jwt")}`,
        },
        params: isWorkflow
          ? { stageId: fileId, itemsPerPage, page: pageParam }
          : { fileId, itemsPerPage, page: pageParam },
      });

      return response.data.data;
    },

    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.items.length === 0) return undefined;
      return lastPageParam + 1;
    },
  });
}

interface ParamsApiComment {
  queryKey: string;
  apiUrlComments: string;
  isWorkflow?: boolean;
}
export const useQueryCommentsMethod = ({
  queryKey,
  apiUrlComments,
  isWorkflow = false,
}: ParamsApiComment) => {
  const queryClient = useQueryClient();
  const headerBaseConfig = {
    headers: {
      Authorization: `Bearer ${getCookie("jwt")}`,
    },
  };

  const sendNewComment = useMutation({
    mutationFn: ({ fileId, text, stageId }: RequestSentNewComment) => {
      if (stageId) {
        return axios.post<ReSponseCommentsType>(
          apiUrlComments,
          { stageId, text },
          headerBaseConfig
        );
      }
      return axios.post<ReSponseCommentsType>(
        apiUrlComments,
        { fileId, text },
        headerBaseConfig
      );
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["useQueryGetComments" + queryKey],
      });
    },
  });

  const updateComment = useMutation({
    mutationFn: ({ commentId, text }: RequestUpdateNewComment) => {
      return axios.patch(apiUrlComments, { commentId, text }, headerBaseConfig);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["useQueryGetComments" + queryKey],
      });
    },
  });

  const deleteComment = useMutation({
    mutationFn: (commentId: number) => {
      return axios.delete(apiUrlComments, {
        params: { commentId },
        ...headerBaseConfig,
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["useQueryGetComments" + queryKey],
      });
    },
  });

  return {
    sendNewComment,
    updateComment,
    deleteComment,
  };
};
