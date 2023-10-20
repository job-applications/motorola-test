<script setup lang="ts">
import { ref } from "vue";
import type { FormError, FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";

const auth = useAuth();
const user = useAuthUser();

const form = ref();
const state = ref({
  username: undefined,
});

const submitting = ref(false);

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.username) errors.push({ path: "username", message: "Required" });
  return errors;
};

async function submit(event: FormSubmitEvent<any>) {
  // Do something with data
  submitting.value = true;
  await auth.login(event.data.username).catch((error) => {
    if (error.data) {
      form.value.setErrors([
        {
          path: "username",
          message: error.data.message,
        },
      ]);
    }
  });
  submitting.value = false;
  if (user.value) {
    await navigateTo("/dashboard");
  }
}
</script>

<template>
  <UForm ref="form" :validate="validate" :state="state" @submit="submit">
    <UFormGroup label="Username" name="username">
      <UInput v-model="state.username" />
    </UFormGroup>

    <UButton type="submit" :disabled="submitting"> Login </UButton>
  </UForm>
</template>
