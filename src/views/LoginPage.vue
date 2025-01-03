<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-800">
    <div class="bg-gray-200 rounded-lg shadow-lg w-96 p-6">
      <h1 class="text-center text-gray-500 text-lg font-medium mb-4">description</h1>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Username Input -->
        <CustomInput
          v-model="username"
          placeholder="Username"
          :error="usernameError"
          @input="validateUsername"
        />

        <!-- Phone Number Input -->
        <CustomInput
          v-model="phoneNumber"
          placeholder="Phone Number"
          :error="phoneError"
          @input="validatePhoneNumber"
        />

        <CustomButton
          :label="'Login'"
          :loading="loading"
          type="submit"
          className="w-full"
          color="green"
        />
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CustomInput from '@/components/CustomInput.vue';
import CustomButton from '@/components/CustomButton.vue';
import { useRouter } from 'vue-router';
import { TOAST_MESSAGES, ERROR_MESSAGES } from '@/utils/constants';
import { useAppToast } from '@/composables/useAppToast';

const router = useRouter();

const username = ref('');
const phoneNumber = ref('');

const usernameError = ref('');
const phoneError = ref('');

const users = ref([]);
const loading = ref(false);

const { toastError, toastSuccess } = useAppToast();

const validateUsername = () => {
  username.value = username.value.replace(/\s+/g, '');

  if (!username.value.trim()) {
    usernameError.value = ERROR_MESSAGES.USERNAME_REQUIRED;
    return;
  }

  const regex = /^[a-zA-Z]*$/;
  if (!regex.test(username.value)) {
    usernameError.value = ERROR_MESSAGES.USERNAME_INVALID;
  } else {
    usernameError.value = '';
  }
};

const validatePhoneNumber = () => {
  phoneNumber.value = phoneNumber.value.replace(/\s+/g, '');

  if (!phoneNumber.value.trim()) {
    phoneError.value = ERROR_MESSAGES.PHONE_NUMBER_REQUIRED;
    return;
  }

  const regex = /^[0-9()+\-.*#]*$/; // Allowed characters
  if (!regex.test(phoneNumber.value)) {
    phoneError.value = ERROR_MESSAGES.PHONE_NUMBER_INVALID;
  } else {
    phoneError.value = '';
  }
};

const handleSubmit = async () => {
  validateUsername();
  validatePhoneNumber();

  if (usernameError.value || phoneError.value) {
    toastError(TOAST_MESSAGES.VALIDATION_ERROR);
    return;
  }

  loading.value = true;

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const fetchedUsers = await response.json();

    const matchingUser = fetchedUsers.find(
      (user) =>
        user.username.toLowerCase() === username.value.toLowerCase() &&
        user.phone === phoneNumber.value,
    );

    if (matchingUser) {
      localStorage.setItem('authToken', 'yourAuthTokenHere');
      toastSuccess(TOAST_MESSAGES.LOGIN_SUCCESSFUL(matchingUser.name));
      router.push({ name: 'UserDetails', params: { userId: matchingUser.id } });
    } else {
      toastError(TOAST_MESSAGES.LOGIN_ERROR);
    }
  } catch (error) {
    toastError(TOAST_MESSAGES.FETCH_ERROR);
  } finally {
    loading.value = false;
  }
};
</script>
