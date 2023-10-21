<template>
  <div class="relative">
    <UContainer
      as="div"
      class="bg-slate-100 p-4 sm:p-6 lg:p-8 rounded sm:rounded-md lg:rounded-xl"
    >
      <h2 class="text-2xl mb-2">Login</h2>
      <p class="mb-4">
        If you have visited before please provide your username below to login
        or use one of the demo usernames: user1, user2.
      </p>
      <FormsLogin />
    </UContainer>
    <div class="inline-flex items-center justify-center w-full">
      <hr class="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
      <span
        class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900"
        >or</span
      >
    </div>
    <UContainer
      as="div"
      class="bg-slate-100 p-4 sm:p-6 lg:p-8 rounded sm:rounded-md lg:rounded-xl"
    >
      <h2 class="text-2xl mb-2">Register</h2>
      <p class="mb-4">
        If you have never used the services before, please register below.
        Usernames should be 3-20 characters long and can only contain letters,
        numbers, and underscores.
      </p>
      <FormsRegister />
    </UContainer>
  </div>
</template>
