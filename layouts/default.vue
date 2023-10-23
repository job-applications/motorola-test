<template>
  <header class="bg-slate-600 p-4 mb-8">
    <UContainer>
      <div class="flex gap-4 items-center text-slate-50">
        <h1 class="text-lg font-bold uppercase">Motorola</h1>
        <div class="ml-auto flex gap-2 items-center" v-if="user">
          <UAvatar :alt="user.id" size="sm" />{{ user.id }}
        </div>
      </div>
    </UContainer>
  </header>
  <UContainer><slot /></UContainer>
</template>

<script setup lang="ts">
const user = useAuthUser();
</script>
