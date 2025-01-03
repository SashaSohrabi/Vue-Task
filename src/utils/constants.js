// URLs for API endpoints
export const API_URLS = {
  TODOS: 'https://jsonplaceholder.typicode.com/todos',
  USERS: 'https://jsonplaceholder.typicode.com/users',
  USER_DETAILS: (userId) => `https://jsonplaceholder.typicode.com/users/${userId}`,
};

// Error messages for form validation
export const ERROR_MESSAGES = {
  USERNAME_REQUIRED: 'Username is required.',
  USERNAME_INVALID: 'Username can only contain letters.',
  PHONE_NUMBER_REQUIRED: 'Phone number is required.',
  PHONE_NUMBER_INVALID: 'Phone number can only contain numbers and these symbols: ( ) + - . * #',
};

// Toast messages for different scenarios
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
  FETCH_ERROR: (resource) => ({
    title: 'Error',
    description: `Failed to fetch ${resource}. Please try again later.`,
  }),
  TODO_CREATED_SUCCESS: {
    title: 'Todo Created',
    description: 'Your todo was created successfully.',
  },
  TODO_CREATION_ERROR: {
    title: 'Todo Creation Failed',
    description: 'Unable to create the todo. Please try again later.',
  },
};
