<template>
  <div class="fixed top-4 right-4 cursor-pointer" @click="handleLogout">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="w-8 h-8 text-gray-700 hover:text-red-500 transition"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M17 16l4-4m0 0l-4-4m4 4H7m6-4v8"
      />
    </svg>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const handleLogout = () => {
  localStorage.removeItem('authToken');
  router.push({ name: 'Login' });
};
</script>
