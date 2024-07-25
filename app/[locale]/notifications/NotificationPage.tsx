import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Header } from "./ui";
import {
  GetProfileResponse,
  RequestNotificationListTypes,
  TypeNotification,
} from "@/app/shared";
import { useQueryGetNotificationList } from "@/app/shared/hooks/useQueryNotificationMethods";
import NotificationTable from "./table/Table";
import cn from "classnames";

const filterZod = z.object({
  System: z.boolean().optional(),
  Deadline: z.boolean().optional(),
  Document: z.boolean().optional(),
  Progress: z.boolean().optional(),
  onlyRead: z.boolean(),
});
type ValidationSchema = z.infer<typeof filterZod>;

interface Props {
  profile?: GetProfileResponse;
  checkedFilerNotify?: boolean;
}
export const NotificationPage = ({ profile, checkedFilerNotify }: Props) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [queryParams, setQueryParams] = useState<RequestNotificationListTypes>({
    page: page,
    itemsPerPage: pageSize,
    onlyRead: undefined,
    typeNotification: undefined,
  });

  useEffect(() => {
    setQueryParams({ ...queryParams, onlyRead: checkedFilerNotify });
  }, [checkedFilerNotify]);

  const { data: dataSource, isLoading: loading } =
    useQueryGetNotificationList(queryParams);

  const updateQueryParams = (params: RequestNotificationListTypes) => {
    setQueryParams(params);
  };

  const filtersForm = useForm<ValidationSchema>({
    defaultValues: {
      System: true,
      Deadline: false,
      Document: false,
      Progress: false,
      onlyRead: false,
    },
    resolver: zodResolver(filterZod),
  });

  const changeTopFilter = (obj: {
    page: number;
    typeNotification?: TypeNotification;
    onlyRead?: boolean;
  }) => {
    setPage(obj.page);
    setQueryParams({ ...queryParams, ...obj });
  };

  return (
    <>
      <div
        className={cn(
          "h-full relative",
          profile?.roleType !== "Client" && "overflow-x-scroll"
        )}
      >
        <div className="px-6 pt-4">
          {profile?.roleType !== "Client" && (
            <Header
              form={filtersForm}
              changeTopFilter={changeTopFilter}
              dataSource={dataSource ?? undefined}
            />
          )}

          <NotificationTable
            setPageSize={setPageSize}
            setPage={setPage}
            updateQueryParams={updateQueryParams}
            dataSource={dataSource?.items ?? []}
            loading={loading}
            page={page}
            pageSize={pageSize}
            params={queryParams}
            totalItems={dataSource?.totalItems}
          />
        </div>
      </div>
    </>
  );
};
