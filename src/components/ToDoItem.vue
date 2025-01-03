<template>
  <div class="p-4 border rounded-lg flex justify-between items-center">
    <div>
      <h3 class="font-bold">{{ todo.title }}</h3>
      <p class="text-sm text-gray-500">User ID: {{ todo.userId }}</p>
      <p :class="['text-sm font-medium', todo.completed ? 'text-green-500' : 'text-red-500']">
        {{ todo.completed ? 'Completed' : 'Uncompleted' }}
      </p>
    </div>
    <button @click="emitToggleFavorite" class="focus:outline-none">
      <StarIcon :isFavorite="isFavorite" />
    </button>
  </div>
</template>

<script setup>
import StarIcon from './StarIcon.vue';

const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['toggle-favorite']);

const emitToggleFavorite = () => {
  emit('toggle-favorite', props.todo.id);
};
</script>
