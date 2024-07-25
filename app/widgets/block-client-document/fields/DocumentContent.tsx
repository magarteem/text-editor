"use client";
import { useTranslation } from "react-i18next";
import Download from "@/public/svg/download-icon.svg";
import CopyIcon from "@/public/svg/copy-mail.svg";
import { Curator } from "@/app/shared/modals/сreateNewDocumentModal/fields";
import Eye from "@/public/svg/eye-icon.svg";
import { downloadFileOnClick } from "../../block-recent-docs/helpers";
import { InfoBlock } from "../ui";
import { InfoBlockIcon } from "../ui/InfoBlockIcon";
import { StatusDocumentTag } from "@/app/shared/ui/tags/StatusDocumentTag";
import { ResponseDocFileData } from "../types/type";
import Link from "next/link";
import { labels } from "../helpers/libDocType";
import cn from "classnames";
import { Manrope } from "next/font/google";

const manrope = Manrope({ subsets: ["latin", "cyrillic"] });

export function DocumentContent({
  visible,
  associatedWithTOPUniversity,
  status,
  mimeType,
  originalName,
  id,
  description,
  link,
  typeOfDocument,
  checkingCurator,
}: ResponseDocFileData) {
  const { t } = useTranslation();

  const handleActions = () => {
    if (link) {
      navigator.clipboard.writeText(link);
    } else {
      downloadFileOnClick({
        fileId: id,
        mimeType: mimeType ?? "",
        fileName: originalName,
      });
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4  px-6">
      <div className="flex flex-col gap-4 w-full text-sm text-black-not-so">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {link ? (
              <Link
                href={link}
                target="_blank"
                className="text-blue-highlight text-sm font-medium"
              >
                {originalName}
              </Link>
            ) : (
              <p className="font-semibold break-all">{originalName}</p>
            )}

            <StatusDocumentTag type={status} />
          </div>
          <button
            className="w-6 h-6 flex items-center justify-center"
            type="button"
            onClick={handleActions}
          >
            {link ? <CopyIcon /> : <Download />}
          </button>
        </div>

        {description && (
          <pre
            className={cn(
              manrope.className,
              "flex items-center gap-4  whitespace-pre-wrap break-all"
            )}
          >
            {description}
          </pre>
        )}

        <div className="grid grid-cols-2 gap-4">
          <InfoBlock
            title={t("storage.formText.titleFormDocType")}
            isEmpty={false}
            text={t(labels[typeOfDocument])}
          />

          <InfoBlockIcon
            title={t("storage.formText.titleFormVisible")}
            isEmpty={false}
            text={
              visible
                ? t("storage.formText.WeSee")
                : t("storage.formText.WeDontSee")
            }
            element={visible && <Eye />}
          />

          {checkingCurator ? (
            <Curator user={checkingCurator} />
          ) : (
            <InfoBlockIcon
              title={t("storage.formText.curatorDoc")}
              isEmpty={false}
              text={t("storage.formText.typeOfDocument.NotSelected")}
            />
          )}

          <InfoBlock
            title={t("storage.formText.titleFormDocOther")}
            isEmpty={false}
            text={
              associatedWithTOPUniversity
                ? t("storage.formText.checkboxFormDocOther")
                : t("storage.formText.NoInformation")
            }
          />
        </div>
      </div>
    </div>
  );
}
