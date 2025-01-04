<template>
  <div class="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mb-4">
    <h1 class="text-2xl font-bold text-gray-800 mb-4">User Details</h1>
    <ul class="space-y-2">
      <li><strong>Name:</strong> {{ user.name }}</li>
      <li><strong>Username:</strong> {{ user.username }}</li>
      <li><strong>Email:</strong> {{ user.email }}</li>
      <li><strong>Phone:</strong> {{ user.phone }}</li>
      <li>
        <strong>Website: </strong>
        <a :href="'http://' + user.website" class="text-blue-500 underline" target="_blank">{{
          user.website
        }}</a>
      </li>
      <li><strong>Address:</strong> {{ user.address.street }}, {{ user.address.city }}</li>
      <li><strong>Company:</strong> {{ user.company.name }}</li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  user: {
    type: Object,
    required: true,
  },
});
</script>
