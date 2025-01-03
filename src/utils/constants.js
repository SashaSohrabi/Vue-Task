export const ERROR_MESSAGES = {
  USERNAME_REQUIRED: 'Username is required.',
  USERNAME_INVALID: 'Username can only contain letters.',
  PHONE_NUMBER_REQUIRED: 'Phone number is required.',
  PHONE_NUMBER_INVALID: 'Phone number can only contain numbers and these symbols: ( ) + - . * #',
};

export const TOAST_MESSAGES = {
  VALIDATION_ERROR: {
    title: 'Validation Error',
    description: 'Please correct the input fields.',
  },
  LOGIN_SUCCESSFUL: (name) => ({
    title: 'Login Successful',
    description: `Welcome, ${name}!`,
  }),
  LOGIN_ERROR: {
    title: 'Login Error',
    description: 'Username or phone number does not match.',
  },
  FETCH_ERROR: {
    title: 'Error',
    description: 'Failed to fetch users. Please try again later.',
  },
};
