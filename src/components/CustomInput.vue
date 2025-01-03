<template>
  <div>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
      :class="[
        'w-full px-4 py-2 rounded-lg border focus:outline-none',
        error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500',
        className,
      ]"
    />
    <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  error: {
    type: String,
    default: '',
  },
  className: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const onInput = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>
