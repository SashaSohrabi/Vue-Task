<template>
  <svg
    v-if="loading"
    class="w-5 h-5 mr-2 animate-spin"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      class="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="4"
    ></circle>
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
  </svg>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  loading: {
    type: Boolean,
    required: true,
  },
});
</script>
