import { Avatar } from "antd";
import { Select } from "@/app/shared/ui/antd/select/Select";
import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export function Body({
  curator,
  isCurator,
}: {
  curator: any;
  isCurator?: boolean;
}) {
  const { t } = useTranslation();

  return (
    <div>
      <div className="flex flex-row items-center gap-2">
        <Avatar src={curator.imageUrl} size={24}></Avatar>
        <p
          className="whitespace-nowrap font-normal max-w-48 overflow-hidden text-ellipsis text-sm"
          title={curator.label}
        >
          {curator.label}
        </p>
      </div>
      <p className="text-sm font-normal mt-4">
        {!!curator.aboutMe && (
          <div
            dangerouslySetInnerHTML={{ __html: curator.aboutMe.slice(1, -1) }}
          />
        )}
      </p>
      {isCurator && (
        <Link href="/settings">
          <p className="text-sm font-semibold text-blue-highlight mt-4">
            {t("widgets.curator.add")}
          </p>
        </Link>
      )}
    </div>
  );
}
