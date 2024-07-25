import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@api/index";
import { useEffect } from "react";
import { useProfileStore } from "@store/index";

export const useGetProfile = () => {
  const { userId } = useAuth();
  const { data } = useQuery({
    queryKey: ["myProfile", userId],
    queryFn: () => getProfile({ userUid: userId || "" }),
  });

  useEffect(() => {
    if (!data) return;

    useProfileStore.setState(data);
  }, [data]);
};
