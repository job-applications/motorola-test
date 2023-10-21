<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <div class="relative">
    <UContainer
      as="div"
      class="bg-slate-100 p-4 sm:p-6 lg:p-8 rounded sm:rounded-md lg:rounded-xl"
    >
      <h2 class="text-2xl mb-2">Uploads</h2>
      <p class="mb-4">...</p>
      <FormsUpload />
    </UContainer>
  </div>
</template>
