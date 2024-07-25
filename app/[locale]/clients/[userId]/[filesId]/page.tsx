"use client";

import { Loader, RightSide } from "@ui/index";
import { useGetUserById } from "@/app/shared/hooks/useGetUserById";
import { BlockBreadCrumbs } from "@/app/widgets/block-bread-crumbs";
import { useEffect, useState } from "react";
import { BlockUser } from "@/app/widgets";
import { BlockClientDocument } from "@/app/widgets/block-client-document";
import cn from "classnames";

type Props = { params: { userId: string; filesId: string } };

const Page = ({ params: { userId, filesId } }: Props) => {
  const { data, fetchRecords } = useGetUserById({
    userId: Number(userId),
  });

  useEffect(() => {
    !data && fetchRecords();
  }, [data]);

  if (!data) return <Loader />;

  return (
    <>
      {data && <BlockBreadCrumbs data={data} />}
      <div className={`grid md:grid-cols-[auto_272px] py-4 gap-6 mt-2`}>
        <BlockClientDocument />

        <div className="hidden md:block">
          <RightSide>
            <div className="flex flex-col gap-6">
              <BlockUser
                profile={data}
                id="BlockUser"
                isClient={false}
                currTab="storage"
              />
            </div>
          </RightSide>
        </div>
      </div>
    </>
  );
};

export default Page;
