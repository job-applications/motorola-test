<script setup lang="ts">
import { ref } from "vue";
import type { FormError, FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
import { IMAGE_UPLOAD_MIME_TYPES } from "~/constants";

const form = ref();
const state = ref({
  note: undefined,
  file: undefined,
});

async function submit(event: FormSubmitEvent<any>) {
  // Check mime type
  if (!IMAGE_UPLOAD_MIME_TYPES.includes(event.data.file.type)) {
    form.value.setErrors([
      {
        path: "file",
        message: "Unsupported file type!",
      },
    ]);
    return;
  }
  // Do something with data
  console.log(event.data.file);
}
</script>

<template>
  <UForm
    ref="form"
    :state="state"
    @submit.prevent="submit"
    class="space-y-4 w-60"
  >
    <UFormGroup label="File" name="file">
      <UInput
        type="file"
        v-model="state.file"
        accept="image/gif, image/jpeg, image/png"
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
</template>
