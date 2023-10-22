<template>
  <UTable
    :empty-state="{
      icon: 'i-heroicons-circle-stack-20-solid',
      label: 'No items.',
    }"
    class="w-full"
    :columns="[
      { key: 'status', label: '' },
      { key: 'id', label: 'ID' },
      { key: 'note', label: 'Note' },
      { key: 'faces', label: 'Faces' },
    ]"
    :rows="imageRecords"
  >
    <template #faces-data="{ row }">
      <span v-if="row.status === 'completed'" title="Queued">{{
        row.faces
      }}</span>
      <span v-else>...</span>
    </template>

    <template #status-data="{ row }">
      <span v-if="row.status === 'enqueued'" title="Queued">⏸️</span>
      <span v-else-if="row.status === 'processing'" title="Processing">⏳</span>
      <span v-else>✅</span>
    </template>
  </UTable>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import { ImageRecordWithoutBuffer } from "~/server/types";
import imageStore from "~/stores/imageStore";

export default defineComponent({
  name: "ImageFeed",
  setup() {
    const imageRecords = ref<ImageRecordWithoutBuffer[]>([]);

    let interval: ReturnType<typeof setInterval> | undefined;

    const fetchImages = async () => {
      try {
        const response = await fetch("/api/images");
        if (response.ok) {
          imageRecords.value = await response.json();
        } else {
          console.error("Failed to fetch image records:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching image records:", error);
      }
    };

    watch(
      () => imageStore.shouldRefresh,
      (newVal) => {
        if (newVal) {
          console.info("Refreshing image feed...");
          fetchImages();
          imageStore.shouldRefresh = false; // Reset the flag after refreshing
        }
      },
    );

    onMounted(() => {
      fetchImages(); // Initial fetch
      interval = setInterval(fetchImages, 15 * 1000); // Fetch every 15 seconds
    });

    onUnmounted(() => {
      if (interval) clearInterval(interval);
    });

    return {
      imageRecords,
    };
  },
});
</script>
