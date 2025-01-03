<template>
  <div class="flex gap-4">
    <CustomSelect
      :options="statusOptions"
      :modelValue="selectedStatus"
      @update:modelValue="(value) => $emit('update:selectedStatus', value)"
      placeholder="Filter by Status"
    />
    <CustomSelect
      :options="userIdOptions"
      :modelValue="selectedUserId"
      @update:modelValue="(value) => $emit('update:selectedUserId', value)"
      placeholder="Filter by User ID"
    />
    <CustomInput
      :modelValue="searchQuery"
      @update:modelValue="(value) => $emit('update:searchQuery', value)"
      placeholder="Search by Title"
    />
  </div>
</template>

<script setup>
import CustomSelect from './CustomSelect.vue';
import CustomInput from './CustomInput.vue';

defineProps({
  statusOptions: {
    type: Array,
    required: true,
  },
  userIdOptions: {
    type: Array,
    required: true,
  },
  selectedStatus: {
    type: String,
    required: true,
  },
  selectedUserId: {
    type: [String, Number],
    required: true,
  },
  searchQuery: {
    type: String,
    required: true,
  },
});
</script>
