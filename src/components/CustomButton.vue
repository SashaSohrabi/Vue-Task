<template>
  <button
    :type="type"
    :class="[
      'flex items-center justify-center py-2 px-4 rounded-lg focus:outline-none transition',
      props.loading ? 'bg-gray-400 cursor-not-allowed' : colorClasses,
      className,
    ]"
    :disabled="props.loading || disabled"
    @click="handleClick"
  >
    <svg
      v-if="props.loading"
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
    <span>{{ label }}</span>
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: 'Submit',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'button',
  },
  color: {
    type: String,
    default: 'green',
  },
  className: {
    type: String,
    default: '',
  },
});

const { loading, label, disabled, type, color, className } = props;

const emit = defineEmits(['click']);

const colorClasses = computed(() =>
  color === 'green'
    ? 'bg-green-500 text-white hover:bg-green-600'
    : 'bg-blue-500 text-white hover:bg-blue-600',
);

const handleClick = (event) => {
  if (!loading) {
    emit('click', event);
  }
};
</script>
