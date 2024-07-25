import { useInfiniteQueryRequest } from "@/app/shared/hooks/useQueryGetComments";
import { CardsComments } from "./CardsComments";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface Props {
  filesId: string;
  queryKey: string;
  apiUrlComments: string;
  isWorkflow?: boolean;
}

export const CardsCommentsMain = ({
  filesId,
  queryKey,
  apiUrlComments,
  isWorkflow = false,
}: Props) => {
  const { ref, inView, entry } = useInView();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQueryRequest({
      queryKey,
      apiUrlComments,
      isWorkflow: isWorkflow,
      fileId: filesId,
      itemsPerPage: 20,
      page: 1,
    });

  useEffect(() => {
    if (entry && inView) {
      fetchNextPage();
    }
  }, [entry]);

  if (!isLoading && !data) return;

  return (
    <div className="flex flex-col gap-8">
      {data?.pages.map((page) => {
        return page.items?.map((x) => {
          return (
            <CardsComments
              key={x.id}
              item={x}
              queryKey={queryKey}
              apiUrlComments={apiUrlComments}
            />
          );
        });
      })}

      {isFetchingNextPage ? (
        <Spin
          size="large"
          indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
        />
      ) : (
        hasNextPage && <span ref={ref} />
      )}
    </div>
  );
};
