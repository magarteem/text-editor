export interface MenuElementType {
  id: string;
  name: string;
}

export const menu: MenuElementType[] = [
  { id: "isNew", name: "qa.header.new" },
  { id: "inProgressMe", name: "qa.header.workIhave" },
  { id: "inProgressOthers", name: "qa.header.workForOthers" },
  { id: "isArchive", name: "qa.header.archive" },
];
