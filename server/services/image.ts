import { nanoid } from "nanoid";
import {
  FileEntry,
  ImageRecord,
  ImageRecordWithoutBuffer,
  ImageStatus,
  UserRecord,
} from "../types";
import { imageStore } from "../stores";

export const addImage = (
  user: UserRecord,
  file: FileEntry,
  note: string,
): ImageRecordWithoutBuffer => {
  const imageId = nanoid();
  const imageRecord: ImageRecord = {
    id: imageId,
    userId: user.id,
    createdAt: new Date(),
    note,
    file,
    status: ImageStatus.Enqueued,
    faces: 0,
  };

  imageStore[imageId] = imageRecord;

  return getImageWithoutBuffer(imageRecord);
};

export const getImages = (user: UserRecord): ImageRecordWithoutBuffer[] => {
  return Object.values(imageStore)
    .filter((image) => image.userId === user.id)
    .map(getImageWithoutBuffer);
};

export const getImageWithoutBuffer = (
  image: ImageRecord,
): ImageRecordWithoutBuffer => {
  const { file, thumb, ...rest } = image;
  return rest;
};
