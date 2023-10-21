<script setup lang="ts">
import { ref } from "vue";
import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
import { IMAGE_UPLOAD_MIME_TYPES } from "~/constants";
import { z } from "zod";
import { noteValidator } from "~/validators/note";

interface InputFileEvent extends Event {
  target: HTMLInputElement;
}

const fileInput = ref<FileList | null>(null);
const uploadState = reactive({
  progress: 0, // for showing upload progress in percentage
  isUploading: false, // to show if the upload is in progress
  isSuccess: false, // to show if the upload was successful
  isError: false, // to show if there was an error in uploading
});

const schema = z.object({
  file: z.string(),
  note: noteValidator,
});

type SchemaStateType = Partial<z.infer<typeof schema>> & {
  file: string | undefined;
};

const form = ref();
const state = ref<SchemaStateType>({
  note: undefined,
  file: undefined,
});

function handleFileChange(event: InputFileEvent) {
  fileInput.value = event.target.files;
}

function getFileInputFile() {
  return fileInput.value?.[0];
}

async function handleUpload() {
  const file = getFileInputFile();
  if (!file) return;
  if (!state.value.note) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("note", state.value.note);

  uploadState.isUploading = true;

  const xhr = new XMLHttpRequest();

  // Event listener for upload progress
  xhr.upload.addEventListener("progress", (event) => {
    if (event.lengthComputable) {
      uploadState.progress = Math.round((event.loaded * 100) / event.total);
    }
  });

  // Event listener for when the upload is completed
  xhr.addEventListener("load", () => {
    if (xhr.status === 200) {
      uploadState.isSuccess = true;
    } else {
      uploadState.isError = true;
    }
    uploadState.isUploading = false;
  });

  // Event listener for any error during the upload
  xhr.addEventListener("error", () => {
    uploadState.isError = true;
    uploadState.isUploading = false;
  });

  // Initialize the POST request
  xhr.open("POST", "/api/images", true);

  // Send the FormData with the file
  xhr.send(formData);
}

async function submit(event: FormSubmitEvent<any>) {
  const file = getFileInputFile();
  if (!file) {
    debugger;
    console.log("No file selected");
    return;
  }

  // Check mime type
  if (!IMAGE_UPLOAD_MIME_TYPES.includes(file.type)) {
    console.log(file.type, (state as any).file);
    form.value.setErrors([
      {
        path: "file",
        message: "Unsupported file type!",
      },
    ]);
    return;
  }

  await handleUpload();
}
</script>

<template>
  <UForm
    ref="form"
    :schema="schema"
    :state="state"
    @submit.prevent="submit"
    class="space-y-4 w-60"
  >
    <UFormGroup label="File" name="file">
      <UInput
        type="file"
        v-model="state.file"
        accept="image/gif, image/jpeg, image/png"
        @change="handleFileChange"
      />
    </UFormGroup>

    <UFormGroup label="Note" name="note">
      <UTextarea
        name="textarea"
        v-model="state.note"
        placeholder="File description..."
      />
    </UFormGroup>

    <UButton type="submit" icon="i-heroicons-document-arrow-up">
      Upload
    </UButton>
  </UForm>

  <!-- Upload Progress -->
  <div v-if="uploadState.isUploading">
    Uploading: {{ uploadState.progress }}%
  </div>

  <!-- Upload Success Message -->
  <div v-if="uploadState.isSuccess">Upload Successful!</div>

  <!-- Upload Error Message -->
  <div v-if="uploadState.isError">Upload Failed!</div>
</template>
