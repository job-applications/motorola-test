import fetch from "node-fetch";
import * as canvas from "canvas";
import * as faceapi from "face-api.js";

let hasInitialized = false;
const { Canvas, Image, ImageData } = canvas;

faceapi.env.monkeyPatch({ fetch, Canvas, Image, ImageData } as any);

async function setupFaceApi(): Promise<void> {
  if (hasInitialized) {
    return;
  }

  const MODEL_URL = "/home/workbench/motorola/models";
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_URL);
}

async function detectFaces(buffer: Buffer): Promise<faceapi.FaceDetection[]> {
  await setupFaceApi();

  const img = new Image();
  img.src = buffer;

  const detections = await faceapi.detectAllFaces(img as any);
  return detections;
}

async function getFacesThumbnail(
  buffer: Buffer,
  detections: faceapi.FaceDetection[],
): Promise<Buffer> {
  const img = new Image();
  img.src = buffer;

  const canvasInstance = canvas.createCanvas(img.width, img.height);
  const ctx = canvasInstance.getContext("2d");
  ctx.drawImage(img, 0, 0);

  detections.forEach((detection) => {
    const { top, left, width, height } = detection.box;
    ctx.strokeRect(left, top, width, height);
  });

  return canvasInstance.toBuffer();
}

export { setupFaceApi, detectFaces, getFacesThumbnail };
