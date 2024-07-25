import { StatusDocument } from "../types/statusDocument";

type ExcludeCheckedByTheStrategist<T> = T extends "CheckedByTheStrategist"
  ? never
  : T;
type StatusDocumentWithoutChecked =
  ExcludeCheckedByTheStrategist<StatusDocument>;

export const libDocStatus: Record<StatusDocumentWithoutChecked, string> = {
  WorkingWithCurator: "storage.docTypes.WorkingWithCurator",
  ReadyToBeSentToTheClient: "storage.docTypes.ReadyToBeSentToTheClient",
  SentToClient: "storage.docTypes.SentToClient",
};
export const libDocStatusForDocAsLink: Record<StatusDocument, string> = {
  ...libDocStatus,
  CheckedByTheStrategist: "storage.docTypes.CheckedByTheStrategist",
};
