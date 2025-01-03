<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    @click.self="$emit('close')"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-80">
      <h3 class="text-lg font-semibold mb-4">Create Todo</h3>
      <form @submit.prevent="handleTodoSubmit">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">User ID</label>
          <CustomInput v-model="todo.userId" type="number" placeholder="Enter User ID" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Title</label>
          <CustomInput v-model="todo.title" type="text" placeholder="Enter Title" required />
        </div>
        <div class="flex justify-end gap-2">
          <CustomButton type="button" @click="$emit('close')" label="Cancel" color="blue" />
          <CustomButton type="submit" label="Submit" :loading="loading" />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CustomInput from './CustomInput.vue';
import CustomButton from './CustomButton.vue';
import { useAppToast } from '@/composables/useAppToast';
import { TOAST_MESSAGES, API_URLS } from '@/utils/constants';

const { toastSuccess, toastError } = useAppToast();

const todo = ref({ userId: '', title: '' });
const loading = ref(false);

const emit = defineEmits(['close', 'new-todo']);

const handleTodoSubmit = async () => {
  loading.value = true;

  try {
    const response = await fetch(API_URLS.TODOS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...todo.value,
        userId: +todo.value.userId,
      }),
    });
    const createdTodo = await response.json();
    toastSuccess(TOAST_MESSAGES.TODO_CREATED_SUCCESS);

    emit('new-todo', createdTodo);
    emit('close');
  } catch (error) {
    toastError(TOAST_MESSAGES.TODO_CREATION_ERROR);
  } finally {
    loading.value = false;
  }
};
</script>
