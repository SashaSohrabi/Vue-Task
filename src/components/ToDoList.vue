<template>
  <div>
    <h2 class="text-xl font-bold mb-4">Todos</h2>

    <div class="mb-4 flex gap-4 justify-between flex-col md:flex-row">
      <TodoFilterBar
        :statusOptions="statusOptions"
        v-model:selectedStatus="selectedStatus"
        :userIdOptions="userIdOptions"
        v-model:selectedUserId="selectedUserId"
        v-model:searchQuery="searchQuery"
      />

      <CustomButton @click="openPopup" color="blue" label="Create todo" class="max-w-28" />
    </div>

    <div v-if="filteredTodos.length" class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <TodoItem
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        :isFavorite="favorites.includes(todo.id)"
        @toggle-favorite="toggleFavorite"
      />
    </div>
    <p v-else class="text-gray-500">No todos found.</p>

    <CreateTodoPopup v-if="isPopupOpen" @close="closePopup" />
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue';
import TodoItem from './TodoItem.vue';
import CustomSelect from './CustomSelect.vue';
import CustomInput from './CustomInput.vue';
import CustomButton from './CustomButton.vue';
import CreateTodoPopup from './CreateTodoPopup.vue';
import TodoFilterBar from './TodoFilterBar.vue';

const props = defineProps({
  todos: {
    type: Array,
    required: true,
  },
});

const favorites = ref([]);
const isPopupOpen = ref(false);

watchEffect(() => {
  favorites.value = JSON.parse(localStorage.getItem('favorites') || '[]');
});

const toggleFavorite = (id) => {
  if (favorites.value.includes(id)) {
    favorites.value = favorites.value.filter((favoriteId) => favoriteId !== id);
  } else {
    favorites.value.push(id);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites.value));
};

const isFavorite = (id) => {
  return favorites.value.includes(id);
};

const selectedStatus = ref('All');
const selectedUserId = ref('All Users');
const searchQuery = ref('');

const statusOptions = ['All', 'Completed', 'Uncompleted', 'Favorites'];
const userIdOptions = ['All Users', ...new Set(props.todos.map((todo) => todo.userId))];

const filteredTodos = computed(() => {
  return props.todos
    .filter((todo) => {
      // Filter by status
      if (selectedStatus.value === 'Completed') return todo.completed;
      if (selectedStatus.value === 'Uncompleted') return !todo.completed;
      if (selectedStatus.value === 'Favorites') return isFavorite(todo.id);
      return true; // 'All' case
    })
    .filter((todo) => {
      // Filter by user ID
      if (selectedUserId.value === 'All Users') return true;
      return todo.userId === Number(selectedUserId.value);
    })
    .filter((todo) => {
      // Filter by search query (case-insensitive)
      return todo.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    });
});

const openPopup = () => {
  isPopupOpen.value = true;
};

const closePopup = () => {
  isPopupOpen.value = false;
};
</script>
