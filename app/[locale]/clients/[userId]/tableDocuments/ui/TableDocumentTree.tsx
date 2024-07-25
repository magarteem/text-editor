import { Tree, TreeDataNode, TreeProps } from "antd";
import React, { useEffect, useState } from "react";
import {
  useQueryGetAllStorageFiles,
  useQueryStorageMethods,
} from "@/app/shared/hooks/useQueryStorageMethods";
import { useParams } from "next/navigation";
import { useRenderNodeTitle } from "../useRenderNodeTitle";
import { ResponseDocFileData } from "@/app/widgets/block-client-document/types/type";
import { EventDataNode } from "antd/es/tree";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useProfileStore } from "@/app/shared/store/profile/useProfileStore";
import { useStore } from "zustand";

interface CustomEventDataNode extends ResponseDocFileData {
  parent?: number;
}

interface CustomTreeDragNodeEvent {
  event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>;
  node: EventDataNode<CustomEventDataNode>;
  dragNode: EventDataNode<CustomEventDataNode>;
  dragNodesKeys: React.Key[];
  dropPosition: number;
  dropToGap: boolean;
}

interface Props {
  setParentIdAction: (parent: number | null) => void;
}

export const TableDocumentTree = ({ setParentIdAction }: Props) => {
  const profile = useStore(useProfileStore);
  const { t } = useTranslation();
  const { userId }: { userId: string } = useParams();

  const { renderNodeTitle, onDragEnter, onDoubleClick, switcherIcon } =
    useRenderNodeTitle({
      role: profile?.roleType,
      myUserId: profile?.id,
    });

  const { renameDirectory, updateFileData } = useQueryStorageMethods();
  const { data: dataTable } = useQueryGetAllStorageFiles(userId ?? profile?.id);
  const [gData, setGData] = useState([]);

  const addKeysToTreeData = (data: any) => {
    const traverse = (node: any, parent?: number) => {
      node.key = node.id;
      node.parent = parent;
      if (node.children && node.children.length > 0) {
        node.children = node.children.map((child: any) => {
          return traverse(child, node.key);
        });
      }
      return node;
    };

    return data?.map((node: any) => traverse(node));
  };

  useEffect(() => {
    const newData = addKeysToTreeData(dataTable);
    setGData(newData);
  }, [dataTable]);

  const onSelect: TreeProps["onSelect"] = (selectedKeys, info: any) => {
    if (info.node.mimeType === "directory") {
      setParentIdAction(info.selected ? Number(info.node.key) : null);
    } else {
      setParentIdAction(info.selected ? info.node.parent ?? null : null);
    }
  };

  const onDrop: TreeProps["onDrop"] | any = (info: CustomTreeDragNodeEvent) => {
    if (info.node.mimeType !== "directory") {
      if (info.dragNode.mimeType === "directory") {
        const dir = {
          parentId: info.node.parent ?? null,
          id: info.dragNode.id,
        };
        renameDirectory.mutate(dir);
      } else {
        const dir = {
          parentId: info.node.parent ?? null,
          fileId: info.dragNode.id,
        };
        updateFileData.mutate(dir);
      }

      return;
    }

    if (info.dragNode.mimeType === "directory") {
      const dir = {
        parentId: info.dropPosition < 0 ? null : info.node.id,
        id: info.dragNode.id,
      };
      renameDirectory.mutate(dir);
    } else {
      const dir = {
        parentId: info.dropPosition < 0 ? null : info.node.id,
        fileId: info.dragNode.id,
      };
      updateFileData.mutate(dir);
    }
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split("-");
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (
      data: TreeDataNode[],
      key: React.Key,
      callback: (node: TreeDataNode, i: number, data: TreeDataNode[]) => void
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children!, key, callback);
        }
      }
    };
    const data = [...gData];

    let dragObj: TreeDataNode;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else {
      let ar: TreeDataNode[] = [];
      let i: number;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i!, 0, dragObj!);
      } else {
        ar.splice(i! + 1, 0, dragObj!);
      }
    }
    setGData(data);
  };

  const transformNode = (node: any) => ({
    ...node,
    title: renderNodeTitle(node),
    children: node.children ? node.children.map(transformNode) : [],
  });

  const treeData = gData?.map(transformNode);

  return (
    <>
      <div
        className="grid auto-rows-40px items-center gap-6 px-6 text-sm relative text-gray py-2"
        style={{
          display: "grid",
          gridTemplateColumns:
            profile?.roleType !== "Client"
              ? "minmax(150px, 1fr) 96px 200px 170px 120px 24px"
              : "minmax(150px, 1fr) 170px 120px 24px",
        }}
      >
        <p className="flex-grow flex-shrink-0 basis-auto">
          {t("storage.table.columns.name")}
        </p>
        {profile?.roleType !== "Client" && (
          <>
            <p className="flex justify-center w-[96px]">
              {t("storage.table.columns.visibility")}
            </p>
            <p className="w-[250px]">{t("storage.table.columns.status")}</p>
          </>
        )}
        <p>{t("storage.table.columns.author")}</p>
        <p className="w-[120px]">{t("storage.table.columns.dateOfCreation")}</p>
        <p className="w-[52px]"></p>
      </div>

      <table>
        <CustomTree
          switcherIcon={switcherIcon}
          onSelect={onSelect}
          onDoubleClick={onDoubleClick}
          className="draggable-tree"
          draggable={profile?.roleType !== "Client"}
          blockNode
          icon={false}
          onDragEnter={onDragEnter}
          onDrop={onDrop}
          showIcon={false}
          showLine={false}
          treeData={treeData}
        />
      </table>
    </>
  );
};

const CustomTree: any = styled(Tree)`
  .ant-tree-treenode {
    border-top: 1px solid #f5eaea !important;
    height: 40px;
    padding-bottom: 0;
    padding: 0 24px;

    &:hover {
      background-color: #f4faff !important;
      transition: none !important;
    }

    .ant-tree-switcher {
      transition: none !important;
      &:hover {
        background-color: rgba(255, 255, 255, 0) !important;
      }
    }

    .ant-tree-node-content-wrapper {
      height: 100%;
      transition: none !important;

      &:hover {
        background-color: inherit !important;
      }
    }

    .ant-tree-node-selected {
      background-color: inherit !important;
    }
  }
  .ant-tree-treenode.ant-tree-treenode-selected {
    background-color: #d7ecff !important;
  }

  .ant-tree-draggable-icon {
    display: none;
  }
`;
