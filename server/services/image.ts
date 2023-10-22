import { nanoid } from "nanoid";
import {
  FileEntry,
  ImageRecord,
  ImageRecordWithoutBuffer,
  ImageStatus,
  UserRecord,
} from "../types";
import { imageStore } from "../stores";
import { detectFaces } from "./face";

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

  // Introduce an artificial delay
  setTimeout(() => {
    runImageProcessing(imageRecord);
  }, 5000);

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

export const getImage = (imageId: string): ImageRecord => {
  return imageStore[imageId];
};

export const updateImage = (imageId: string, image: ImageRecord): void => {
  imageStore[imageId] = image;
};

export const runImageProcessing = async (image: ImageRecord) => {
  console.log(`Processing image ${image.id}`);

  const detections = await detectFaces(image.file.data);
  updateImage(image.id, {
    ...image,
    status: ImageStatus.Completed,
    faces: detections.length,
  });
};
