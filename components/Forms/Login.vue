<script setup lang="ts">
import { z } from "zod";
import { ref } from "vue";
import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
import { usernameValidator } from "~/validators/username";

const auth = useAuth();
const user = useAuthUser();

const form = ref();
const state = ref({
  username: undefined,
});

const submitting = ref(false);

const schema = z.object({
  username: usernameValidator,
});

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
    await navigateTo("/");
  }
}
</script>

<template>
  <UForm
    ref="form"
    :schema="schema"
    :state="state"
    @submit="submit"
    class="space-y-4 w-60"
  >
    <UFormGroup label="Username" name="username">
      <UInput v-model="state.username" />
    </UFormGroup>

    <UButton type="submit" :disabled="submitting" icon="i-heroicons-user">
      Login
    </UButton>
  </UForm>
</template>
