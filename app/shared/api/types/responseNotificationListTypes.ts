import { Meta } from "./mainTypesResponse";

export type TypeNotification = "System" | "Deadline" | "Document" | "Progress";

interface ItemNumberType {
  typeNotification: TypeNotification;
  totalNumber: number;
  readNumber: number;
}

export interface NumberTypeOfNotificationIner {
  numberTotalNotification: number;
  numberTotalNotificationRead: number;
  numberTypeOfNotification: ItemNumberType[];
}
export interface NumberTypeOfNotificationTypes {
  numberTypeOfNotification: NumberTypeOfNotificationIner;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  imageUrl?: string;
}

export interface NotificationItemType {
  id: number;
  author: User;
  typeNotification: TypeNotification;
  message: string;
  important: boolean;
  created: string;
  read: number | null;
}

export type ResponseNotificationListTypes = Meta<NotificationItemType[]> &
  NumberTypeOfNotificationTypes;
