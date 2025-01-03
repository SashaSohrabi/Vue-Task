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
    <LoaderSpinner :loading="props.loading" />
    <span>{{ label }}</span>
  </button>
</template>

<script setup>
import { computed } from 'vue';
import LoaderSpinner from './LoaderSpinner.vue';

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
