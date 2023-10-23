<template>
  <div class="relative">
    <div class="flex">
      <h2 class="text-2xl">Images</h2>
      <div class="ml-auto">
        <UButton label="Upload" @click="isOpen = true" />
      </div>
    </div>
    <UContainer
      as="div"
      class="bg-slate-100 p-4 sm:p-6 lg:p-8 rounded sm:rounded-md lg:rounded-xl my-4"
    >
      <ImageFeed />
    </UContainer>

    <UModal v-model="isOpen">
      <div class="p-8">
        <FormsUpload @onComplete="handleComplete" />
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

const isOpen = ref(false);
const handleComplete = () => {
  isOpen.value = false;
};
</script>
