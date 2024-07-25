import { TypeNotification } from "./responseNotificationListTypes";

export interface RequestNotificationListTypes {
  page: number;
  itemsPerPage: number;
  onlyRead?: boolean;
  typeNotification?: TypeNotification;
}
