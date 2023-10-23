// If you're saving to a database, you might have services to help with that.
// import { saveImage } from "../services/images";

import { enforceNoteValidator } from "../validators/note";
import { enforceFileValidator } from "../validators/file";
import ensureAuth from "../utils/ensureAuth";
import { addImage } from "../services/image";

export default defineEventHandler(async (event) => {
  const user = ensureAuth(event.context);
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

  const file = await enforceFileValidator(rawFile);
  const note = enforceNoteValidator(rawNote?.data.toString() ?? "");
  const image = addImage(user, file, note);

  return {
    statusCode: 200,
    message: "Image uploaded successfully",
    data: image,
    // imagePath, // If you want to return the saved image path or URL
  };
});
