<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <User v-if="user" :user="user" />
    <div v-else class="text-center text-gray-500">Loading user details...</div>

    <!-- Todos Section -->
    <TodoList v-if="todos.length" :todos="todos" />
    <p v-else class="text-gray-500 mt-8">No todos available.</p>

    <LogoutIcon />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import User from '@/components/User.vue';
import TodoList from '@/components/TodoList.vue';
import { API_URLS, TOAST_MESSAGES } from '@/utils/constants';
import { useAppToast } from '@/composables/useAppToast';
import LogoutIcon from '@/components/LogoutIcon.vue';

const { toastError } = useAppToast();

const route = useRoute();
const userId = route.params.userId;
const user = ref(null);
const todos = ref([]);

onMounted(async () => {
  try {
    const [userResult, todosResult] = await Promise.allSettled([
      fetch(API_URLS.USER_DETAILS(userId)),
      fetch(API_URLS.TODOS),
    ]);

    if (userResult.status === 'fulfilled' && userResult.value.ok) {
      user.value = await userResult.value.json();
    } else {
      toastError(TOAST_MESSAGES.FETCH_ERROR('user details'));
    }

    if (todosResult.status === 'fulfilled' && todosResult.value.ok) {
      todos.value = await todosResult.value.json();
    } else {
      toastError(TOAST_MESSAGES.FETCH_ERROR('todos'));
    }
  } catch (error) {
    console.error('Unexpected error:', error);
  }
});
</script>
