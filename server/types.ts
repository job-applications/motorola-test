import { z } from "zod";

export type UserRecord = {
  id: string;
  createdAt: Date;
  isAdministrator?: boolean;
};

export type FileEntry = {
  name: string;
  filename: string;
  type: string;
  data: Buffer;
};

export type ImageRecord = {
  id: string;
  userId: string;
  createdAt: Date;
  note: string;
  file: FileEntry;
  thumb?: FileEntry;
  status: ImageStatus;
  faces: Number;
};

export type ImageRecordWithoutBuffer = Omit<ImageRecord, "file" | "thumb">;

export enum ImageStatus {
  Enqueued = "enqueued",
  Processing = "processing",
  Completed = "completed",
}
