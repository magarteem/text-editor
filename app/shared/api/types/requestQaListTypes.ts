export interface RequestQaListType {
  page: number;
  itemsPerPage: number;
  authorId?: number;
  checkingStrategistId?: number | null;
  checkingCuratorId?: number | null;
  clientId?: string | null;
  typeOfDocument?: string | null;
  isNew?: boolean;
  inProgressMe?: boolean;
  inProgressOthers?: boolean;
  isArchive?: boolean;
}
