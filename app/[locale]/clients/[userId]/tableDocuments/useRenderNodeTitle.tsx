import { StatusDocumentTag } from "@/app/shared/ui/tags/StatusDocumentTag";
import { TreeProps } from "antd";
import Eye from "@/public/svg/eye-icon.svg";
import Arrow from "@/public/svg/pagination-left.svg";
import Folder from "@/public/svg/folder.svg";
import DockIcon from "@/public/svg/dock-icon.svg";
import InnerDownloadIcon from "@/public/svg/InnerDownloadIcon.svg";
import { MenuButton } from "./ui";
import { format } from "date-fns";
import { useModal } from "@/app/shared/modals/modal/ModalProvider";
import { usePathname, useRouter } from "next/navigation";
import { ResponseDocFileData } from "@/app/widgets/block-client-document/types/type";
import { InnerChildren } from "./type/columnsType";
import { RoleType } from "@/app/shared";
import cn from "classnames";
import { downloadFileOnClick } from "@/app/widgets/block-recent-docs/helpers";

interface Props {
  role: RoleType | undefined;
  myUserId: number | undefined;
}

export const useRenderNodeTitle = ({ role, myUserId }: Props) => {
  const { push } = useRouter();
  const pathName = usePathname();
  const { openModal } = useModal();

  const renderNodeTitle = (node: ResponseDocFileData) => {
    let haveVisible = false;
    const transformNode = (node: InnerChildren) => {
      if (node.mimeType !== "directory" && node.visible) haveVisible = true;

      if (node.children?.length > 0) {
        node.children.map((x) => transformNode(x));
      }
    };

    node.children?.map((x) => transformNode(x));

    const styleOpacity =
      node.mimeType === "directory" && !node.visible
        ? "opacity-50"
        : "opacity-100";
    return (
      <tr
        data-row-table-key={node.id}
        className="grid auto-rows-40px items-center gap-6 w-full h-full"
        style={{
          gridTemplateColumns:
            role !== "Client"
              ? "minmax(150px, 1fr) 96px 200px 170px 120px 24px"
              : "minmax(150px, 1fr) 170px 120px 24px",
        }}
      >
        <td
          className={cn("flex items-center gap-4", styleOpacity)}
          data-global-tooltip={node?.originalName}
        >
          <div className={cn("w-[15px]", styleOpacity)}>
            {node.mimeType === "directory" ? (
              <Folder />
            ) : node.mimeType === "link" ? (
              <InnerDownloadIcon />
            ) : (
              <DockIcon />
            )}
          </div>
          <span className="px-[10px] overflow-hidden text-ellipsis whitespace-nowrap">
            {node?.originalName}
          </span>
        </td>
        {role !== "Client" && (
          <>
            <td
              className={cn(
                "flex justify-center items-center h-[40px]",
                styleOpacity
              )}
            >
              {(node?.visible ||
                (node.mimeType === "directory" &&
                  !node?.visible &&
                  haveVisible)) && (
                <div
                  className="flex justify-center items-center w-[50px] h-full"
                  onClick={() =>
                    openModal("visibleStorageModal", {
                      id: node.id,
                      mimeType: node.mimeType,
                      visible: node.visible,
                      originalName: node.originalName,
                    })
                  }
                >
                  <Eye />
                </div>
              )}
            </td>
            <td className={cn("w-[250px] overflow-hidden", styleOpacity)}>
              <StatusDocumentTag type={node.status} />
            </td>
          </>
        )}
        <td
          className={cn("flex", styleOpacity)}
          data-global-tooltip={`${node.author?.firstName} ${node.author?.lastName}`}
        >
          <span className="px-[10px] overflow-hidden text-ellipsis whitespace-nowrap">
            {node.author.firstName
              ? `${node.author.firstName} ${node.author.lastName}`
              : "-"}
          </span>
        </td>
        <td className={cn("flex w-[120px]", styleOpacity)}>
          <p className="text-nowrap" data-created-key={node.id}>
            {node.created && format(node.created, "dd.MM.yyyy, HH:mm")}
          </p>
        </td>
        <td className="flex w-[24px]">
          <MenuButton role={role} myUserId={myUserId} {...node} />
        </td>
      </tr>
    );
  };

  const onDragEnter: TreeProps["onDragEnter"] = (info) => {};

  const onDoubleClick: TreeProps["onDoubleClick"] | any = (
    _selectedKeys: any,
    info: ResponseDocFileData
  ) => {
    if (info.mimeType === "directory") return;

    if (role === "Client") {
      info.link
        ? window.open(info.link, "_blank")
        : downloadFileOnClick({
            fileId: info.id,
            mimeType: info.mimeType ?? "",
            fileName: info.originalName,
          });

      return;
    }

    push(`${pathName}/${info.id}`);
  };

  const switcherIcon = () => {
    return (
      <span className="h-full transform rotate-90 flex items-center content-center">
        <Arrow />
      </span>
    );
  };

  return { renderNodeTitle, onDragEnter, onDoubleClick, switcherIcon };
};
