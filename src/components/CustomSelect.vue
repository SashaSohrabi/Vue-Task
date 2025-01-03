<template>
  <div>
    <select
      v-model="selected"
      :class="['w-full px-4 py-2 rounded-lg border focus:outline-none', className]"
    >
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: [String, Number],
    required: true,
  },
  className: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const selected = ref(props.modelValue);

watch(selected, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>
