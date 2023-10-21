<script setup lang="ts">
import { ref } from "vue";
import type { FormError, FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";

const state = ref({
  username: undefined,
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.username) errors.push({ path: "username", message: "Required" });
  return errors;
};

async function submit(event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data);
}
</script>

<template>
  <UForm :state="state" @submit="submit" class="space-y-4 w-60">
    <UFormGroup label="Username" name="username">
      <UInput v-model="state.username" />
    </UFormGroup>

    <UButton type="submit" icon="i-heroicons-user-plus" variant="outline">
      Register
    </UButton>
  </UForm>
</template>
