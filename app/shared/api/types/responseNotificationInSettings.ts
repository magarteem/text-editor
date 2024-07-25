export type TypeNotification = "System" | "Deadline" | "Document" | "Progress";

export interface ResponseNotificationInSettings {
  uid: string;
  allow: boolean;
  typeNotification: TypeNotification;
}
