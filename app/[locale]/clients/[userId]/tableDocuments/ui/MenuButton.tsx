import RowMoreIcon from "@/public/svg/row-more.svg";
import TrashIcon from "@/public/svg/trash-icon.svg";
import Control from "@/public/svg/control.svg";
import { useModal } from "@/app/shared/modals/modal/ModalProvider";
import BigPenIcon from "@/public/svg/big-pen.svg";
import Download from "@/public/svg/download-icon.svg";
import { downloadFileOnClick } from "@/app/widgets/block-recent-docs/helpers";
import Link from "next/link";
import { ColumnsTypeResponse } from "../type/columnsType";
import { RoleType } from "@/app/shared";

const styleWrapModal = {
  classNames: "max-w-[692px]",
  classNamesClosed: "hidden",
};

interface Props extends ColumnsTypeResponse {
  role: RoleType | undefined;
  myUserId: number | undefined;
}

export function MenuButton({
  id,
  author,
  link,
  mimeType,
  originalName,
  visible,
  role,
  myUserId,
}: Props) {
  const { openModal } = useModal();

  const hiddenText = (elem: "hidden" | "show") => {
    const element = document.querySelector(
      `[data-created-key="${id}"]`
    ) as HTMLElement | null;

    if (element) {
      element.style.color =
        elem === "hidden" ? "rgb(255 255 255 / 0%)" : "rgb(38, 42, 57)";
    }
  };

  const rename = () => {
    if (mimeType === "directory") {
      openModal("renameDirectoryModal", {
        id: id,
        fullName: originalName,
        visible,
        ...styleWrapModal,
      });
    } else {
      openModal("renameDocFileModal", {
        id: id,
        link,
        fullName: originalName,
        ...styleWrapModal,
      });
    }
  };

  if (role === "Client" && mimeType === "directory") return;

  return (
    <div
      className="group relative cursor-pointer"
      onMouseEnter={() => hiddenText("hidden")}
      onMouseLeave={() => hiddenText("show")}
    >
      <div className="group-hover:flex hidden pr-4 pl-6 gap-x-4 items-center absolute right-4 -top-0.5">
        {mimeType !== "directory" && mimeType !== "link" && (
          <button
            type="button"
            onClick={() => {
              downloadFileOnClick({
                fileId: id,
                mimeType: mimeType ?? "",
                fileName: originalName,
              });
            }}
          >
            <Download />
          </button>
        )}

        {link && mimeType === "link" && (
          <Link target="_blank" href={link}>
            <Control />
          </Link>
        )}

        {role !== "Client" && (
          <button type="button" onClick={rename}>
            <BigPenIcon />
          </button>
        )}

        {(role !== "Client" || myUserId === author.id) && (
          <button
            type="button"
            onClick={() =>
              openModal("removeDirectoryModal", {
                id: id,
                fullName: originalName,
                mimeType,
              })
            }
          >
            <TrashIcon />
          </button>
        )}
      </div>
      <RowMoreIcon />
    </div>
  );
}
