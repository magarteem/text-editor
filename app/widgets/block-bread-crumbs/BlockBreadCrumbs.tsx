import Link from "next/link";
import ClientsIcon from "@/public/svg/user.svg";
import ArrowIcon from "@/public/svg/arrow.svg";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { GetProfileResponse } from "@/app/shared";

interface Props {
  data: GetProfileResponse;
}
export const BlockBreadCrumbs = ({ data }: Props) => {
  const pathName = usePathname().split("/");
  const { t } = useTranslation();

  return (
    <div className="flex flex-row gap-2 items-center" id="clientName">
      <Link
        href={pathName.slice(0, -2).join("/")}
        className="flex flex-row gap-2 items-center"
      >
        <ClientsIcon />
        <p className="text-sm text-gray font-semibold">
          {t("menuItems.clients")}
        </p>
      </Link>
      <ArrowIcon />

      <Link
        href={pathName.slice(0, -1).join("/")}
        className="flex flex-row gap-2 items-center"
      >
        <p className="text-sm text-gray font-semibold overflow-hidden text-ellipsis text-nowrap max-w-64">
          {`${data.firstName} ${data.lastName}`}
        </p>
      </Link>

      <ArrowIcon />
      <p className="text-sm font-bold">{t("storage.formText.select.docs")}</p>
    </div>
  );
};
