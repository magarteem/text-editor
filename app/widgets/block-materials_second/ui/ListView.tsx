import React from "react";
import { File } from "@/app/shared/hooks/useGetFiles";
import { downloadFileOnClick } from "../../block-recent-docs/helpers";

interface ListViewProps {
  title: string;
  itemList: File[];
  Icon: React.ComponentType;
}

interface ListItemProps {
  file: File;
  index: number;
}

const ListItem: React.FC<ListItemProps> = ({ file, index }) => {
  const commonClasses = "flex flex-row gap-2 relative";
  const content = (
    <>
      <p className="absolute left-0">{index + 1}</p>
      <p className="ml-5">{file.originalName}</p>
    </>
  );

  if (file.link) {
    return (
      <a
        href={file.link}
        target="_blank"
        key={file.id}
        className={commonClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <li
      className={`${commonClasses} cursor-pointer`}
      onClick={() =>
        downloadFileOnClick({
          fileId: file.id,
          mimeType: file.mimeType,
          fileName: file.originalName,
        })
      }
    >
      {content}
    </li>
  );
};

export const ListView: React.FC<ListViewProps> = ({
  title,
  itemList,
  Icon,
}) => {
  return (
    <div>
      <header className="flex flex-row items-center gap-1 text-sm text-gray">
        <Icon />
        <h3>{title}</h3>
      </header>
      <ul className="mt-3 text-blue-highlight gap-2 text-sm flex flex-col">
        {itemList.map((file, index) => (
          <ListItem key={file.id} file={file} index={index} />
        ))}
      </ul>
    </div>
  );
};
