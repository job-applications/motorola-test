// If you're saving to a database, you might have services to help with that.
// import { saveImage } from "../services/images";

import { enforceNoteValidator } from "../validators/note";
import { enforceFileValidator } from "../validators/file";
import ensureAuth from "../utils/ensureAuth";
import { detectFaces, setupFaceApi } from "../services/face";
import { addImage } from "../services/image";

export default defineEventHandler(async (event) => {
  const user = ensureAuth(event.context);
  await setupFaceApi();
  const formData = await readMultipartFormData(event);
  if (!formData) {
    throw createError({
      statusCode: 400,
      name: "InvalidInputError",
      message: "Invalid or missing form data",
      statusMessage: "Bad Request",
    });
  }

  const rawNote = formData.find((field) => field.name === "note");
  const rawFile = formData.find((field) => field.name === "file");

  const file = enforceFileValidator(rawFile);
  const note = enforceNoteValidator(rawNote?.data.toString() ?? "");

  const image = addImage(user, file, note);

  // const detections = await detectFaces(file.data);
  // console.log(`Number of faces detected: ${detections.length}`);

  // // Here, process or store the image as required. For instance:
  // // const imagePath = await saveImage(imageFile);

  // // Optionally, you can also save the associated note, link it to the image, etc.

  return {
    statusCode: 200,
    message: "Image uploaded successfully",
    data: image,
    // imagePath, // If you want to return the saved image path or URL
  };
});
