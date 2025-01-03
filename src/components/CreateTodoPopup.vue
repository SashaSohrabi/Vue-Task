<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    @click.self="$emit('close')"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-80">
      <h3 class="text-lg font-semibold mb-4">Create Todo</h3>
      <form @submit.prevent="handleTodoSubmit">
        <div class="mb-4">
          <label for="id" class="block text-sm font-medium mb-1">ID</label>
          <CustomInput v-model="todo.id" type="number" placeholder="Enter ID" required />
        </div>
        <div class="mb-4">
          <label for="title" class="block text-sm font-medium mb-1">Title</label>
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

const todo = ref({ id: '', title: '' });
const loading = ref(false);

const emit = defineEmits(['close']);

const handleTodoSubmit = async () => {
  loading.value = true;

  try {
    const response = await fetch(API_URLS.TODOS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...todo.value }),
    });
    await response.json();
    toastSuccess(TOAST_MESSAGES.TODO_CREATED_SUCCESS);
    emit('close');
  } catch (error) {
    toastError(TOAST_MESSAGES.TODO_CREATION_ERROR);
  } finally {
    loading.value = false;
  }
};
</script>
