import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchProfile } from "../api";

interface PatchProfileType {
  id: number;
  notificationToEmail: boolean;
}

export const useQueryPatchProfile = (userId: number | undefined) => {
  const queryClient = useQueryClient();

  const patchProfileFn = useMutation({
    mutationFn: (params: PatchProfileType) => {
      return patchProfile(params);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["myProfile", userId],
      });
    },
  });

  return {
    patchProfileFn,
  };
};
